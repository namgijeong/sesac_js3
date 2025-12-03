class TypeGenerator {
    constructor() {
        this.types = [
            "스타벅스",
            "투썸플레이스",
            "메가커피",
            "빽다방",
            "이디야커피",
            "탐앤탐스",
            "할리스",
            "커피빈",
            "파스쿠찌",
            "카페베네"
        ];
    }
    
    pickRandomInArray(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    getRandomType(){
        this.type = this.pickRandomInArray(this.types);
        return this.type;
    }
}

export default TypeGenerator;