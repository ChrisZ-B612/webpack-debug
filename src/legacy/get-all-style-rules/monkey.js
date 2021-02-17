// ==UserScript==
// @name         Debug(crossOrigin = "anonymous")
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://*.kujiale.com/tool/h5/diy*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const regex4css = /[^"]+\.css[^"]*/;
    // 处理<link>标签
    const isLinkNode = (node) => node.tagName.toLowerCase() === 'link';
    const handleLinkNode = (node, method = 'default') => {
        if (regex4css.test(node.href)) {
            node.crossOrigin = 'anonymous';
            console.log(`NASA(Link.${method})`, node);
        }
    };
    const recursive = (node, msg) => {
        if (!node.tagName) return;

        if (isLinkNode(node)) {
            handleLinkNode(node, msg);
        }

        if (node.children.length) {
            for (const child of node.children) {
                recursive(child, msg);
            }
        }
    };

    const config = { attributes: false, childList: true, subtree: true };
    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => recursive(node, 'mutation'));
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
    // observer.observe(document.head, config);

    // Node - appendChild, insertBefore, replaceChild
    for (const method of [ 'appendChild', 'insertBefore', 'replaceChild' ]) {
        const originMethod = Node.prototype[method];
        Node.prototype[method] = function (...args) {
            recursive(args[0], method);
            return originMethod.apply(this, args);
        }
    }

    // Element - append, prepend
    for (const method of [ 'append', 'prepend' ]) {
        const originMethod = Element.prototype[method];
        Element.prototype[method] = function (...args) {
            recursive(args[0], method);
            return originMethod.apply(this, args);
        }
    }
})();
