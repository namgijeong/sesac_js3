const NameGen = require('./NameGen/NameGen');
const GenderGen = require('./NameGen/GenderGen');
const BirthdateGen = require('./NameGen/BirthdateGen');

const nameGen = new NameGen();
const newName = nameGen.generate();

const genderGen = new GenderGen("ENG");
const newGender = genderGen.generate();

const birthdateGen = new BirthdateGen(2000,2050);
const newBirthdate = birthdateGen.generate();

console.log(`${newName}, ${newGender}, ${newBirthdate}`);