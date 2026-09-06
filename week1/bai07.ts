class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

const user = new User("Nguyễn Văn A");

console.log(user.getName());

user.setName("Trần Văn B");

console.log(user.getName());