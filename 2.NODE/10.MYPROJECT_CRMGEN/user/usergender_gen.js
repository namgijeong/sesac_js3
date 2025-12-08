class GenderGenerator{
    makeRandomGender(){
        let standard = Math.random();
        if (standard < 0.5){
            return "Male";
        }
        else{
            return "Female";
        } 
    }
}

export default GenderGenerator;