class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayInfo(): void {
        console.log(`Tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
    }
}

class Student extends Person {
    grade: number;

    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }

    displayStudentInfo(): void {
        console.log(`Tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
        console.log(`Điểm: ${this.grade}`);
    }
}

const student = new Student("Trần Minh Anh", 20, 8.5);
student.displayStudentInfo();