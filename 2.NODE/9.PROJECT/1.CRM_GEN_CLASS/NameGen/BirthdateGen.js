const CommonGen = require('./CommonGen');

class BirthdateGen extends CommonGen {
    constructor(from, to){
        super();
        this.yearStart = from;
        this.yearEnd = to;
    }

    generate() {
        //1980 ~ 2019
        const year = Math.floor(Math.random() * (this.yearEnd - this.yearStart)) + this.yearStart;
        //0 ~ 11 => 1 ~ 12
        const month = Math.floor(Math.random() * 12) + 1;
        //day는 month에 따라서
        const day = Math.floor(Math.random() * 30) + 1;

        return `${year}-${month}-${day}`;
    }
}

module.exports = BirthdateGen;