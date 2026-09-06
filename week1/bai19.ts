class Animal {
    makeSound(): void {
        console.log("Động vật phát ra âm thanh.");
    }
}

class Dog extends Animal {
    override makeSound(): void {
        console.log("Gâu gâu");
    }
}

class Cat extends Animal {
    override makeSound(): void {
        console.log("Meo meo");
    }
}

const animals: Animal[] = [
    new Dog(),
    new Cat()
];

animals.forEach(animal => {
    animal.makeSound();
});