//DS  Data Structure 자료구조

class Node{
    constructor(value){
        //데이터 저장소
        this.value = value; 
        //다음의 위치
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    addToHead(value){
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    printList(){
        let current = this.head;
        let list = "";
        while (current != null){
            list += current.value +'->';
            current = current.next;
        }

        console.log(list);
    }
}

const linkedList =  new LinkedList();
linkedList.addToHead(3);
linkedList.addToHead(7);
linkedList.addToHead(5);
linkedList.printList();