class BirthdateGenerator{
    makeRandomBirthdate(age){
        //10살에서 90살까지니까 => 2016 ~ 1936년
        //let year = Math.floor(Math.random()*80) +1936;

        let year = 2025 - age;

        let month = Math.floor(Math.random()*12) + 1;
        month =  month >= 10 ? month : month.toString().padStart(2,'0');

        let date = 1;
        
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                date = Math.floor(Math.random()*31) + 1;
                break;
            case 2:    
            case 4:    
            case 6:    
            case 9:    
            case 11:
                date = Math.floor(Math.random()*30) + 1;
                break;  
            default:        
        }

        date =  date >= 10 ? date : date.toString().padStart(2,'0');
        
        return `${year}-${month}-${date}`;
    }
}

export default BirthdateGenerator;

// const test = new BirthdateGenerator();
// console.log(test.makeRandomBirthdate(10));