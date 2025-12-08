class StoreNameGenerator{
    constructor(){

    }

    makeRandomStoreNumber(){
        return Math.floor(Math.random()*10) + 1;
    }

    getRandomStoreName(type,fullAddress){
        let fullAddressSplits = fullAddress.split(' ');

        //구를 분리한다.
        let gu = fullAddressSplits[1];
        //중구 같은경우 구를 빼면 이상하다
        if (gu.length >= 3){
            gu = gu.slice(0, gu.length - 1);
        }

        let randomNumber = this.makeRandomStoreNumber();

        let fullStoreName = '';
        fullStoreName = `${type} ${gu} ${randomNumber}호점`;
        
        return fullStoreName;
    }
}

export default StoreNameGenerator;