const CommonGen = require('./CommonGen');

class NameGen extends CommonGen {
    constructor(){
        super();
        this.names = ['홍길동','김길동','박길동','이길동'];
    }
    
    generate() {
        const index = Math.floor(Math.random() * this.names.length);

        return this.names[index];
    }
}

module.exports = NameGen;