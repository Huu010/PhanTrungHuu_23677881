class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}

class Student extends Person {
    constructor(
        name: string,
        age: number,
        public grade: number
    ) {
        super(name, age);
    }

    displayInfo(): void {
        console.log(
            `Học sinh: ${this.name}, ` +
            `Tuổi: ${this.age}, ` +
            `Điểm: ${this.grade}`
        );
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

    displayInfo(): void {
        console.log(
            `Giáo viên: ${this.name}, ` +
            `Tuổi: ${this.age}, ` +
            `Môn: ${this.subject}`
        );
    }
}

class School {
    students: Student[] = [];
    teachers: Teacher[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    displayInfo(): void {
        console.log("===== DANH SÁCH HỌC SINH =====");

        this.students.forEach(student => {
            student.displayInfo();
        });

        console.log("\n===== DANH SÁCH GIÁO VIÊN =====");

        this.teachers.forEach(teacher => {
            teacher.displayInfo();
        });
    }
}

const school = new School();

school.addStudent(
    new Student("Nguyễn Văn An", 20, 8.5)
);

school.addStudent(
    new Student("Trần Thị Bình", 21, 9)
);

school.addTeacher(
    new Teacher(
        "Nguyễn Văn C",
        35,
        "Lập trình TypeScript"
    )
);

school.addTeacher(
    new Teacher(
        "Lê Thị D",
        40,
        "Lập trình di động"
    )
);

school.displayInfo();