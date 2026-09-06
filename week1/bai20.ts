interface Vehicle {
    start(): void;
    stop(): void;
}

class Car implements Vehicle {
    start(): void {
        console.log("Xe ô tô khởi động.");
    }

    stop(): void {
        console.log("Xe ô tô dừng.");
    }
}

class Bike implements Vehicle {
    start(): void {
        console.log("Xe máy khởi động.");
    }

    stop(): void {
        console.log("Xe máy dừng.");
    }
}

const car = new Car();
const bike = new Bike();

car.start();
car.stop();

bike.start();
bike.stop();