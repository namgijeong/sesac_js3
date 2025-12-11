const itemsPerLoad = 20;
const maxItemsOnScreen = 200; // 화면안에 몇개를 유지할거냐???
let start = 0;
let end = start + itemsPerLoad;

async function getItemsFromTo(start, end) {
    const result = document.getElementById('result');

    //console.log('DOM ready');
    //4. async/await로 변경
    const baseUrl = '/api/items';

    const response = await fetch(`${baseUrl}?start=${start}&end=${end}`);
    const data = await response.json();

    //한줄짜리는 return을 안써도 return을 해줌
    //.then(response => response.json())

    console.log(data);

    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item;
        result.appendChild(itemElement);

        let itemsToRemove = result.children.length - maxItemsOnScreen;
        if(itemsToRemove > 0){
            console.log('지워야 할 아이템수:', itemsToRemove);
            while (itemsToRemove-- > 0){
                result.removeChild(result.firstElementChild);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    getItemsFromTo(start, end);
});

window.addEventListener('scroll', async () => {
    console.log('스크롤발생', window.innerHeight, window.scrollY);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝 이동');

        start = end;
        end = end + itemsPerLoad;

        getItemsFromTo(start, end);

    }
});