class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    work(): void {
        console.log(`${this.name} đang làm việc.`);
    }
}

class Manager extends Employee {
    manageTeam(): void {
        console.log(`${this.name} đang quản lý nhóm.`);
    }
}

class Developer extends Employee {
    writeCode(): void {
        console.log(`${this.name} đang viết code.`);
    }
}

const manager = new Manager("Nguyễn Văn A");
const developer = new Developer("Trần Văn B");

manager.work();
manager.manageTeam();

developer.work();
developer.writeCode();