class Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    displayInfo(): void {
        console.log(`Tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
    }
}

class Teacher extends Person {
    constructor(
        name: string,
        age: number,
        public subject: string
    ) {
        super(name, age);
    }

    introduce(): void {
        console.log(
            `Tôi là giáo viên ${this.name}, ` +
            `tôi dạy môn ${this.subject}.`
        );
    }
}

const teacher = new Teacher(
    "Nguyễn Minh Hải",
    35,
    "Lập trình di động"
);

teacher.displayInfo();
teacher.introduce();