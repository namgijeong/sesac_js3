import { Todo } from "./todo";

export class TodoManager{
    private todos:Todo[] = [];

    addTodo(title:string):Todo{
        const newTodo = new Todo(title);
        this.todos.push(newTodo);
        return newTodo;
    }

    listTodo(){
        return this.todos;
    }

    toggleTodo(id:number):boolean{
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return false;
        todo.toggle();
        return true;
    }

    removeTodo(id:number) : boolean {
        //find는 해당 객체를 반환. findIndex는 index번호를 반납하고 없으면 -1을 반환
        const index = this.todos.findIndex(t=>t.id === id);
        if (index === -1) return false;
        this.todos.splice(index,1);
        return true;
    }
}