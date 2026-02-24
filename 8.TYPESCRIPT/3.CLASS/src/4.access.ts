class Person{
    public readonly name:string; //외부에서 접근가능 , readonly는 처음에 값만 세팅할수있고,그후에 변경 불가
    private age:number; //클래스 내부에서만 접근가능
    protected address:string; // 클래스와 자식 클래스에서 접근 가능

    constructor(name:string, age:number, address:string){
        this.name = name;
        this.age = age;
        this.address = address;
    }

    getAge(){
        return this.age;
    }
}

const john = new Person("John",30, "서울시 강남구 123");
//console.log(`John:${john.name}, ${john.address}`);
console.log(`John:${john.name}, ${john.getAge()}`);

//john.name = "bob";