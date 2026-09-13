class Animal {
    protected makeSound(): void {
        console.log("Animal phát ra âm thanh.");
    }

    public playSound(): void {
        this.makeSound();
    }
}

class Dog extends Animal {
    protected override makeSound(): void {
        console.log("Dog: Gâu gâu");
    }
}

class Cat extends Animal {
    protected override makeSound(): void {
        console.log("Cat: Meo meo");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.playSound();
cat.playSound();