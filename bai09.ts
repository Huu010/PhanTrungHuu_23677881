interface Animal {
    name: string;
    sound(): void;
}
const dog: Animal = {
    name: "Lucky",

    sound(): void {
        console.log("Gâu gâu");
    }
};
dog.sound();