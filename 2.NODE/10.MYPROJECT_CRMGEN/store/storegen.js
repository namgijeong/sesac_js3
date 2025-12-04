import StoreTypeGenerator from "./store_typegen.js";
import StoreNameGenerator from "./store_namegen.js";

import AddressGenerator from "../common/addressgen.js";
import UuidGenerator from "../common/uuidgen.js";

class StoreGenerator{
    constructor(){
        this.type = new StoreTypeGenerator().getRandomType();
        this.address = new AddressGenerator().makeRandomAddress();

        this.storeName = new StoreNameGenerator().getRandomStoreName(this.type,this.address);
        this.uuid = new UuidGenerator().getRandomUuid();
    }

    getRandomStore(){
        this.store = {
            Id: this.uuid,
            Name: this.storeName,
            Type: this.type,
            Address: this.address,
        }

        return this.store;
    }
}

export default StoreGenerator;