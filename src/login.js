import './index.less';

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');

console.log('hello');

document.getElementsByTagName('img')[0].onclick = function () {
    import('./handle').then(fn => fn.default());
}

if (module && module.hot) {
    module.hot.accept()
}