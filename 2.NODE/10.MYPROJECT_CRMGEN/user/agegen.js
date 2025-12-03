class AgeGenerator{
    makeRandomAge(){
        //10 ~ 90세
        return Math.floor(Math.random()*80) + 10;
    }
}

export default AgeGenerator;