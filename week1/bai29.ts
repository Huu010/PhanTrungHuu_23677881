interface Movable {
    move(): void;
}

class Car implements Movable {
    move(): void {
        console.log("Ô tô đang di chuyển.");
    }
}

class Robot implements Movable {
    move(): void {
        console.log("Robot đang di chuyển.");
    }
}

const car = new Car();
const robot = new Robot();

car.move();
robot.move();