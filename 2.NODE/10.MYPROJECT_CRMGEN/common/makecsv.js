//외부모듈 npm i csv-writer 설치
import { createObjectCsvWriter } from 'csv-writer';
let fileName = '';
let fileHeader;

const headerUser = [
    { id: 'Id', title: 'userId' },
    { id: 'Name', title: 'userName' },
    { id: 'Gender', title: 'userGender' },
    { id: 'Age', title: 'userAge' },
    { id: 'Birthdate', title: 'userBirthdate' },
    { id: 'Address', title: 'userAddress' },
];
const headerStore = [
    { id: 'Id', title: 'storeId' },
    { id: 'Name', title: 'storeName' },
    { id: 'Type',title:'storeType'},
    { id: 'Address', title: 'storeAddress' },
];
const headerItem = [
    { id: 'Id', title: 'itemId' },
    { id: 'Name', title: 'itemName' },
    { id: 'Type',title:'itemType'},
    { id: 'UnitPrice', title: 'itemPrice' },
];
const headerOrder = [
    { id: 'Id', title: 'orderId' },
    { id: 'OrderAt', title: 'orderAt' },
    { id: 'StoreId',title:'storeId'},
    { id: 'UserId', title: 'userId' },
];
const headerOrderItem = [
    { id: 'Id', title: 'orderItemId' },
    { id: 'OrderId', title: 'orderId' },
    { id: 'ItemId',title:'itemId'},
];

function writeCsv(type, data) {
    switch (type) {
        case 'users':
            fileName = 'users.csv';
            fileHeader = headerUser;
            break;
        case 'stores':
            fileName = 'stores.csv';
            fileHeader = headerStore;
            break;
        case 'items':
            fileName = 'items.csv';
            fileHeader = headerItem;
            break;
        case 'orders':
            fileName = 'orders.csv';
            fileHeader = headerOrder;
            break;
        case 'orderItems':
            fileName = 'orderItems.csv';
            fileHeader = headerOrderItem;
            break;
        default:                  
    }

    console.log(fileHeader);
    
    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: fileHeader,
        encoding: 'utf8',
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log(`${type} 저장완료`);
        });
}

export default writeCsv;