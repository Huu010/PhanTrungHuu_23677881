class Car {
    brand: string;
    model: string;
    year: number;

    constructor(
        brand: string,
        model: string,
        year: number
    ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showInfo(): void {
        console.log(`Hãng: ${this.brand}`);
        console.log(`Model: ${this.model}`);
        console.log(`Năm: ${this.year}`);
    }
}

const car = new Car(
    "Toyota",
    "Camry",
    2024
);

car.showInfo();