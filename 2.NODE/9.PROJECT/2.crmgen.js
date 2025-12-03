//인기 있는 이름들을 넣는다
const names = ['홍길동','김길동','박길동','이길동'];

function generateName(){
    //0~3
    const index = Math.floor(Math.random() * names.length);

    return names[index];
}

function generateGender(){
    const prob = Math.random();
    if (prob < 0.5){
        return "남성";
    }
    else{
        return "여성";
    }
}

function generateGender2(){
    return Math.random() < 0.5 ? "남성" : "여성";
    
}

function generateBirtdate(){
    //1980 ~ 2019
    const year = Math.floor(Math.random() * 50) + 1980;
    //0 ~ 11 => 1 ~ 12
    const month = Math.floor(Math.random() * 12) + 1;
    //day는 month에 따라서
    const day = Math.floor(Math.random() * 30) + 1;

    return `${year}-${month}-${day}`;
}

console.log(generateName());
console.log(generateGender2());
console.log(generateBirtdate());