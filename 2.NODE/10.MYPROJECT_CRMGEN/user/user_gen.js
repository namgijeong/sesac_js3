import GenderGenerator from "./usergender_gen.js";
import NameGenerator from "./username_gen.js";
import AgeGenerator from "./userage_gen.js";
import BirthdateGenerator from "./userbirthdate_gen.js";

import AddressGenerator from "../common/addressgen.js";
import UuidGenerator from "../common/uuidgen.js";

class UserGenerator{
    constructor(){
        this.gender = new GenderGenerator().makeRandomGender();
        this.name = new NameGenerator().makeRandomName(this.gender);

        this.age = new AgeGenerator().makeRandomAge();
        this.birthdate = new BirthdateGenerator().makeRandomBirthdate(this.age);

        this.address = new AddressGenerator().makeRandomAddress();
        this.uuid = new UuidGenerator().getRandomUuid();
    }

    getRandomUser(){
        this.user = {
            Id: this.uuid,
            Name : this.name,
            Gender: this.gender,
            Age: this.age,
            Birthdate : this.birthdate,
            Address: this.address,
        }

        return this.user;
    }
}

export default UserGenerator;

