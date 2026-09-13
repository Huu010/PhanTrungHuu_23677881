abstract class Appliance {
    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log("Quạt được bật.");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Máy lạnh được bật.");
    }
}

const fan = new Fan();
const airConditioner = new AirConditioner();

fan.turnOn();
airConditioner.turnOn();