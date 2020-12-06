// import Vue from 'vue';

// new Vue({
//     el: '#app',
//     data() {
//         return {
//             title: 'Hello Vue~',
//         };
//     },
// });


(function () {
    async function test1 () {
        console.log(`NASA: ${'test1 before'}`);
        await test2();
        console.log(`NASA: ${'test1 after'}`);
    }
    
    async function test2 () {
        console.log(`NASA: ${'test2'}`);
    }

    test1();

    Promise.resolve().then(() => {
        console.log(`NASA: ${'then'}`);
    });
})();