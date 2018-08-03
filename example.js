'use strict';
/**
 * @global
 * @class
 * @name User
 * @editor CSE
 */
class User {

    constructor(name) {
        this.name = name;
    }

    /**
     * Приветствие
     * @memberof User
     * @param {Array} olo - описалово
     * */
    sayHi(olo) {
        console.log(this.name);
        console.log(olo);
    }

    /**
     * Нихера не делает.
     * @memberof User
     * @param {Array} trololo - описалово
     * */
    sayNooo(olo) {
        console.log(this.name);
        console.log(olo);
    }

}

/**
 * @global
 * @class
 * @name Guest
 * @editor CSE
 */
class Guest {

    constructor(name) {
        this.name = name;
    }

    /**
     * Приветствие
     * @memberof Guest
     * @param {Array} asdasdasdasd - описалово
     * */
    hello(olo) {
        console.log(this.name);
        console.log(olo);
    }

    /**
     * Нихера не делает.
     * @memberof Guest
     * @param {Array} trololo
     * */
    foo(olo) {
        console.log(this.name);
        console.log(olo);
    }

}