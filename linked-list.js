class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    #size = 0;
    #head = null;
    #tail = null;

    constructor(...values) {
        if (values.length) {
            this.#head = new Node();
        } else {
            return;
        }

        for (
            let i = 0, thisNode = this.#head;
            i < values.length;
            i++, thisNode = thisNode.nextNode
        ) {
            thisNode.value = values[i];
            thisNode.nextNode =
                i + 1 !== values.length ? new Node(values[i + 1]) : null;
            this.#tail = thisNode;
        }

        this.#size = values.length;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.#head === null) {
            this.#head = this.#tail = newNode;
            this.#size++;
            return;
        }

        this.#tail.nextNode = newNode;
        this.#tail = newNode;
        this.#size++;
    }

    prepend(value) {
        const newNode = new Node(value, this.#head);
        this.#head = newNode;
        this.#tail = this.#tail ? this.#tail : this.#head;
        this.#size++;
    }

    pop() {
        if (this.#head === this.#tail) {
            this.#head = this.#tail = null;
            this.#size = 0;
            return;
        }

        for (
            let thisNode = this.#head;
            thisNode !== null;
            thisNode = thisNode.nextNode
        ) {
            if (thisNode.nextNode === this.#tail) {
                thisNode.nextNode = null;
                this.#tail = thisNode;
                this.#size--;
                return;
            }
        }
    }

    contains(value) {
        for (
            let thisNode = this.#head;
            thisNode !== null;
            thisNode = thisNode.nextNode
        ) {
            if (thisNode.value === value) return true;
        }

        return false;
    }

    toString() {
        let str = "";

        for (
            let thisNode = this.#head;
            thisNode !== null;
            thisNode = thisNode.nextNode
        ) {
            str += thisNode.nextNode
                ? `( ${thisNode.value} ) -> `
                : `( ${thisNode.value} ) -> null`;
        }

        return str;
    }

    find(value) {
        for (
            let i = 0, thisNode = this.#head;
            thisNode !== null;
            i++, thisNode = thisNode.nextNode
        ) {
            if (thisNode.value === value) return i;
        }

        return null;
    }

    at(index) {
        for (
            let i = 0, thisNode = this.#head;
            thisNode !== null;
            i++, thisNode = thisNode.nextNode
        ) {
            if (i === index) return JSON.parse(JSON.stringify(thisNode));
        }
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this.#size) {
            this.append(value);
            return;
        }

        for (
            let i = 0, thisNode = this.#head;
            thisNode !== null;
            i++, thisNode = thisNode.nextNode
        ) {
            if (i + 1 === index) {
                const newNode = new Node(value, thisNode.nextNode);
                thisNode.nextNode = newNode;
                this.#size++;
                return;
            }
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.#head = this.#head?.nextNode || null;
            this.#tail = this.#head ? this.#tail : this.#head;
            if (this.#size) this.#size--;
            return;
        }

        for (
            let i = 0, thisNode = this.#head;
            thisNode !== null;
            i++, thisNode = thisNode.nextNode
        ) {
            if (i + 1 === index) {
                thisNode.nextNode = thisNode.nextNode?.nextNode || null;
                this.#tail = thisNode.nextNode ? this.#tail : thisNode;
                this.#size--;
                return;
            }
        }
    }

    get size() {
        return this.#size;
    }

    get head() {
        return JSON.parse(JSON.stringify(this.#head));
    }

    get tail() {
        return JSON.parse(JSON.stringify(this.#tail));
    }
}
