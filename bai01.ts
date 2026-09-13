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

const person = new Person("Nguyễn Văn An", 20);
person.displayInfo();