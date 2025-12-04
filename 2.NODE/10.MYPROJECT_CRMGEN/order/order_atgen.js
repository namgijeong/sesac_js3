class OrderAtGenerator {
    constructor() {

    }

    makeRandomAt() {
        let year = Math.floor(Math.random() * 25) + 2000;
        let month = Math.floor(Math.random() * 12) + 1;

        let date = 1;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                date = Math.floor(Math.random() * 31) + 1;
                break;
            case 2:
            case 4:
            case 6:
            case 9:
            case 11:
                date = Math.floor(Math.random() * 30) + 1;
                break;
            default:
        }
        date = date >= 10 ? date : date.toString().padStart(2, '0');

        let hours = Math.floor(Math.random() * 24);
        hours = hours >= 10 ? hours : hours.toString().padStart(2,'0');
    
        let minutes = Math.floor(Math.random() * 60);
        minutes = minutes >= 10 ? minutes : minutes.toString().padStart(2,'0');
        
        let seconds = Math.floor(Math.random() * 60);
        seconds = seconds >= 10 ? seconds : seconds.toString().padStart(2,'0');

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }

}

export default OrderAtGenerator;