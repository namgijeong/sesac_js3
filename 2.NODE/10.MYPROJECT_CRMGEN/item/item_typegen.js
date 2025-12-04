class ItemTypeGenereator {
    constructor() {
        this.types = [
            "Coffee",
            "Juice",
            "Tea",
            "SoftDrinks",
            "Cakes",
            "Cookies",
            "Pastries",
            "Bread",
            "Sandwiches",
        ];
    }

    pickRamdom(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    getRandomItem(){
        this.type = this.pickRamdom(this.types);
    }


}

export default ItemTypeGenereator;