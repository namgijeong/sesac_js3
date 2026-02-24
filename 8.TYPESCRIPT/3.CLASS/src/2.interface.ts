//interface는 객체의 프로토타입을 정의
interface Person {
  name: string;
  age: number;
  isEmployed: boolean;
  address?: string; //선택적 속성 정의
}

//우리가 사전에 정의한 타입을 강제하도록 함
class User implements Person {
  name: string;
  age: number;
  isEmployed: boolean;
  address: string = '';

  constructor(name: string, age: number, isEmployed: boolean) {
    this.name = name;
    this.age = age;
    this.isEmployed = isEmployed;
  }

  getInfo(): string {
    if (this.address != '') {
      return `Name: ${this.name}, Age: ${this.age}, Employed: ${this.isEmployed}, Address:${this.address}`;
    } else {
      return `Name: ${this.name}, Age: ${this.age}, Employed: ${this.isEmployed}`;
    }
  }
}

const person: User = new User('Alice', 30, true);
console.log(person.getInfo());
person.address = '서울시 강남구';
console.log(person.getInfo());
