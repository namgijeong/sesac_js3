const itemsPerLoad = 20;
const maxItemsOnScreen = 100; // 화면안에 몇개를 유지할거냐???
let start = 0;
let end = start + itemsPerLoad;

const result = document.getElementById('result');

let isLoadingDown = false;
let isLoadingUp = false;

async function getItemsFromTo(start, end) {
    //console.log('DOM ready');
    //4. async/await로 변경
    const baseUrl = '/api/items';

    const response = await fetch(`${baseUrl}?start=${start}&end=${end}`);
    const data = await response.json();

    console.log(data);
    return data;
}

function scrollUp(data) {
    //역순 번호부터 맨앞에 삽입한다
    //이때 지우는것은 맨뒤를 지운다

    //원본배열을 직접 변경
    data = data.reverse();
    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item;
        result.insertBefore(itemElement, result.firstElementChild);

        let itemsToRemove = result.children.length - maxItemsOnScreen;
        if (itemsToRemove > 0) {
            console.log('지워야 할 아이템수:', itemsToRemove);
            while (itemsToRemove-- > 0) {
                result.removeChild(result.lastElementChild);
            }
        }

    });
}

function scrollDown(data) {
    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item;
        result.appendChild(itemElement);

        let itemsToRemove = result.children.length - maxItemsOnScreen;
        if (itemsToRemove > 0) {
            console.log('지워야 할 아이템수:', itemsToRemove);
            while (itemsToRemove-- > 0) {
                //firstElementChild => firstChild와 달리 텍스트/공백/주석 제외
                result.removeChild(result.firstElementChild);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await getItemsFromTo(start, end);
    scrollDown(data);
});

window.addEventListener('scroll', async () => {
    //console.log('스크롤발생', window.innerHeight, window.scrollY);

    //window.innerHeight => 브라우저 창(뷰포트)의 높이
    //window.scrollY => 스크롤된 vertical(세로) 거리
    //document.body.offsetHeight => 페이지 전체 실제 높이

    const beforeHeight = document.body.offsetHeight;

    //스크롤이 현재화면 가장 아래에 도달했으면
    if (!isLoadingDown && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝 이동');
        isLoadingDown = true;

        start = end;
        end = end + itemsPerLoad;

        const data = await getItemsFromTo(start, end);
        scrollDown(data);

        isLoadingDown = false;

    }
    //스크롤이 현재화면 가장 위에 도달했으면
    else if (!isLoadingUp && window.scrollY == 0) {
        console.log('화면 맨 위 이동');

        //계속 아래로 스크롤내려서 마지막 인덱스인 경우 => 현재 가장 위에 있는 지워지지않은 아이템 인덱스
        let currentStartOnScreen = end - maxItemsOnScreen;

        if (currentStartOnScreen > 0) {
            isLoadingUp = true;

            end = currentStartOnScreen;
            start = end - itemsPerLoad;

            const data = await getItemsFromTo(start, end);
            scrollUp(data);

            //하지만 이때 스크롤위치가 현재 새롭게 생겨난 아이템들의 밑을 가리키는게 아니라
            //아이템들의 맨 위를 가리키게 된다
            //scrollIntoView()는 특정 DOM 요소가 화면(뷰포트) 안으로 들어오도록 자동으로 스크롤시키는 함수
            //block start => 요소의 위쪽을 화면 맨 위에 맞춤

            result.children[itemsPerLoad].scrollIntoView({
                behavior: "auto",
                block : "start",
            })

            isLoadingUp = false;
        }

        //만약 지워야할 인덱스를 넘지 않았다면 
        else{
            isLoadingUp = true;

            //이미 젤 위인데 또 스크롤하면 
            if (start == 0){
                return;
            }
            end = start;
            start = end - itemsPerLoad;

            const data = await getItemsFromTo(start, end);
            scrollUp(data);

            //하지만 이때 스크롤위치가 현재 새롭게 생겨난 아이템들의 밑을 가리키는게 아니라
            //아이템들의 맨 위를 가리키게 된다
            //scrollIntoView()는 특정 DOM 요소가 화면(뷰포트) 안으로 들어오도록 자동으로 스크롤시키는 함수
            //block start => 요소의 위쪽을 화면 맨 위에 맞춤
            result.children[itemsPerLoad].scrollIntoView({
                behavior: "auto",
                block : "start",
            })

            isLoadingUp = false;
            
        }

    }
});

//이미 위로 스크롤하여 위 아이템들을 만들어