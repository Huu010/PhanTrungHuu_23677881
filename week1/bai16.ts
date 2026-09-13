class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}

const numberBox = new Box<number>(100);
const stringBox = new Box<string>("Hello");
const booleanBox = new Box<boolean>(true);

console.log(numberBox.getValue());
console.log(stringBox.getValue());
console.log(booleanBox.getValue());