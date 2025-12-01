class Stack{
    constructor(){
        this.stack = {};
        //스택의 현재 크기
        this.count = 0;
    }

    push(element){
        this.stack[this.count] = element;
        this.count++;
    }

    pop(){
        if (this.count == 0){
            return "더 가져갈게 없음";
        }

        this.count--;
        const result = this.stack[this.count];
        //달라는거 줬고, 카운트는 낮췄으나 실제로는 지우지 않음
        //메모리 leak 발생

        //실제 메모리 지우기
        //delete this.stack[this.count];
        return result;
    }

    size(){
        return this.count;
    }
}

const myStack = new Stack();
myStack.push('초록색');
myStack.push('노란색');
myStack.push('주황색');
myStack.push('빨강색');

console.log(myStack.count);
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());