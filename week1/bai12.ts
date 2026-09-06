interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class Bird implements Flyable {
    fly(): void {
        console.log("Chim đang bay.");
    }
}

class Fish implements Swimmable {
    swim(): void {
        console.log("Cá đang bơi.");
    }
}

const bird = new Bird();
const fish = new Fish();

bird.fly();
fish.swim();