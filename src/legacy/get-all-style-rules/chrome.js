var regex4rule = /\s*([\w-]+)\s*:[^;}]+;/g;
var allRules = Array.from(document.styleSheets).reduce((arr, sheet) => arr.concat(Array.from(sheet.rules || sheet.cssRules)), []);

var getRuleNames = (text) => {
    const arr = [];
    let res;

    do {
        res = regex4rule.exec(text);
        if (res) {
            const [ full, name ] = res;
            arr.push(name);
        }
    } while (res && regex4rule.lastIndex);
    return arr;
};

var getCssRules = (el) => {
    const set = new Set();

    el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector
        || el.msMatchesSelector || el.oMatchesSelector;

    for (const rule of allRules) {
        const selectorText = rule.selectorText;

        if (el.matches(selectorText)) {
            const cssText = rule.cssText;
            const names = getRuleNames(cssText);

            for (const name of names) {
                set.add(name);
            }
        }
    }

    return set;
};

var isHidden = (node) => window.getComputedStyle(node).display === 'none';

var recursive = (node, cb) => {
    if (isHidden(node)) return;

    if (node.children.length) {
        for (const child of node.children) {
            recursive(child, cb);
        }
    }

    cb(node);
};

var totalCount = 0;
recursive(document.body, () => {
    totalCount++;
});
console.log('NASA(totalCount)', totalCount);

var nodeCount = 0;
var preTime = Date.now();
var startTime = Date.now();
var finalObject = {};
var finalSet = new Set();
var getFinalArray = (finalObject) => {
    const finalArray = [];
    Object.keys(finalObject).forEach((key) => finalArray.push({ key, count: finalObject[key] }));
    finalArray.sort((a, b) => b.count - a.count);

    return finalArray;
};
recursive(document.body, (node) => {
    const names = getCssRules(node);

    for (const name of names) {
        finalObject[name] = (finalObject[name] || 0) + 1;
        finalSet.add(name);
    }

    nodeCount++;

    const now = Date.now();
    if ((now - preTime > 2000) || nodeCount === totalCount) {
        console.log('NASA(now)', `${nodeCount}/${totalCount}(${Math.round(nodeCount / totalCount * 100)}%)`, `${Math.round((now - startTime) / 1000)}s`, finalSet.size);
        preTime = now;
    }
});

console.log('NASA(finalSet)', [ ...finalSet ].sort());
console.log('NASA(finalObject)', getFinalArray(finalObject).join());
