class BirthdateGenerator{
    makeRandomBirthdate(age){
        //10살에서 90살까지니까 => 2015 ~ 1935년
        //let year = Math.floor(Math.random()*80) +1935;

        let year = Math.floor(Math.random()*(age-10)) +1935;
        let month = Math.floor(Math.random()*12) + 1;
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

        return `${year}-${month}-${date}`;
    }
}

export default BirthdateGenerator;