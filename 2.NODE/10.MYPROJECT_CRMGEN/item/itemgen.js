import ItemTypeGenereator from "./item_typegen.js";

import ItemNameGenerator from "./item_namegen.js";
import ItemPriceGenerator from "./item_pricegen.js";

import UuidGenerator from "../common/uuidgen.js";

class ItemGenerator{
    constructor(){
        this.type = new ItemTypeGenereator().getRandomType();

        this.name = new ItemNameGenerator().makeRandomItemName(this.type);
        this.price = new ItemPriceGenerator().makeRandomItemPrice(this.type);

        this.uuid = new UuidGenerator().getRandomUuid();
    }

    getRandomItem(){
        this.item = {
            Id : this.uuid,
            Name: this.name,
            Type: this.type,
            UnitPrice : this.price,
        }

        return this.item;
    }

}

export default ItemGenerator;