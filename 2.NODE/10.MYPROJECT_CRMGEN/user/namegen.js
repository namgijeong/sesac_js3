class NameGenerator {
    constructor() {
        this.maleNames = [
            "도윤", "이준", "하준", "시우", "도현",
            "태오", "선우", "서준", "이안", "도하",
            "연우", "윤우", "은우", "주원", "지호",
            "수호", "우주", "유준", "이현", "윤재",
            "우진", "도준", "이한", "하진", "지한",
            "준우", "이든", "로운", "유안", "예준",
            "민준", "지후", "현우", "서우", "준서",
            "하온", "태윤", "태이", "시온", "태하",
            "유찬", "지안", "시안", "건우", "민서",
            "승우", "하림", "민호", "재윤"
        ];

        this.femaleNames = [
            "서아", "하은", "지아", "수아", "예린",
            "하율", "이서", "예나", "지우", "아린",
            "서윤", "하윤", "지안", "하린", "지유",
            "아윤", "시아", "채이", "윤서", "이나",
            "서하", "유주", "도아", "이솔", "유나",
            "채아", "재이", "유하", "윤슬", "채원",
            "하율", "예솜", "이현", "채윤", "세아",
            "서연", "소이", "나은", "리아", "예서",
            "서우", "윤아", "연우", "로아", "은채",
            "채은", "다윤", "해린", "아현", "미나"
        ];

        this.familyNames = [
            "김", "이", "박", "최", "정",
            "강", "조", "윤", "장", "임",
            "오", "한", "신", "서", "권",
            "황", "안", "송", "전", "홍",
            "유", "고", "문", "양", "손",
            "배", "백", "허", "남", "심"
        ];
    }

    pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    makeRandomName(gender){
        let fullName = '';
        switch(gender){
            case "Male":
                fullName = this.pickRandom(this.familyNames) + this.pickRandom(this.maleNames);
                break;
            case "Female":
                fullName = this.pickRandom(this.familyNames) + this.pickRandom(this.femaleNames);
                break;
            default:       
        }

        return fullName;
    }

    // makeRandomMaleName(){
    //     return this.pickRandom(this.familyNames) + this.pickRandom(this.maleNames);
    // }

    // makeRandomFemaleName(){
    //     return this.pickRandom(this.familyNames) + this.pickRandom(this.femaleNames);
    // }

}

export default NameGenerator;

let nameTest = new NameGenerator();
console.log(nameTest.makeRandomName("Male"));
console.log(nameTest.makeRandomName("Female"));


