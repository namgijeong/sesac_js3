const mapSize = 20;
const map = document.getElementById('map');
const startBtn = document.getElementById('startBtn');
const gameOverDiv = document.getElementById('gameOver');
const scoreSpan = document.getElementById('score');

let grid = [];
let playerPos = { x: 10, y: 19 };
let obstacles = [];
let score = 0;
let gameInterval = null;

// 맵 생성
function createMap() {
    map.innerHTML = '';
    grid = [];
    for (let y = 0; y < mapSize; y++) {
        let row = [];
        for (let x = 0; x < mapSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            map.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}

// 플레이어 그리기
let playerDiv = null;
function drawPlayer() {
    if (!playerDiv) {
        playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        grid[playerPos.y][playerPos.x].appendChild(playerDiv);
    } else {
        // 이전 위치에서 제거
        if (playerDiv.parentElement) playerDiv.parentElement.removeChild(playerDiv);
        grid[playerPos.y][playerPos.x].appendChild(playerDiv);
    }
}

// 장애물 생성
function generateObstacleRow(y) {
    let rowObs = [];
    if (y % 2 === 0) {
        let len = Math.floor(Math.random() * 5) + 1; // 1~5
        let startX = Math.floor(Math.random() * (mapSize - len));
        let speed = Math.floor(Math.random() * 3); // 0~2칸
        for (let i = 0; i < len; i++) {
            // obstacle div 생성
            const obsDiv = document.createElement('div');
            obsDiv.classList.add('obstacle');
            grid[y][startX + i].appendChild(obsDiv);
            rowObs.push({ x: startX + i, y: y, div: obsDiv, speed: speed });
        }
    }
    return rowObs;
}

// 장애물 이동
function moveObstacles() {
    obstacles.forEach(obs => {
        if (obs.speed > 0) {
            // 이전 div 제거
            if (obs.div.parentElement) obs.div.parentElement.removeChild(obs.div);
            obs.x = (obs.x + obs.speed) % mapSize;
            grid[obs.y][obs.x].appendChild(obs.div);
        }
    });
    checkCollision();
}

// 충돌 체크
function checkCollision() {
    for (let obs of obstacles) {
        if (obs.x === playerPos.x && obs.y === playerPos.y) {
            endGame();
            return true;
        }
    }
    return false;
}

// 맵 위로 한 줄 이동
function moveMapUp() {
    obstacles.forEach(obs => {
        obs.y += 1;
        if (obs.y >= mapSize) {
            if (obs.div.parentElement) obs.div.parentElement.removeChild(obs.div);
        }
    });
    obstacles = obstacles.filter(obs => obs.y < mapSize);
    obstacles.push(...generateObstacleRow(0));

    score += 10;
    scoreSpan.textContent = score;

    checkCollision();
}

// 키 입력
function handleKey(e) {
    if (!gameInterval) return;

    if (e.key === 'ArrowLeft' && playerPos.x > 0) playerPos.x--;
    if (e.key === 'ArrowRight' && playerPos.x < mapSize - 1) playerPos.x++;
    if (e.key === 'ArrowUp') moveMapUp();
    if (e.key === 'ArrowDown' && playerPos.y < mapSize - 1) playerPos.y++;

    drawPlayer();
    checkCollision();
}

// 게임 종료
function endGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    gameOverDiv.style.display = 'block';
    startBtn.style.display = 'block';
}

// 게임 시작
function startGame() {
    createMap();
    playerPos = { x: 10, y: 19 };
    obstacles = [];
    score = 0;
    scoreSpan.textContent = score;
    gameOverDiv.style.display = 'none';
    startBtn.style.display = 'none';
    playerDiv = null;

    for (let y = 0; y < mapSize; y++) {
        obstacles.push(...generateObstacleRow(y));
    }

    drawPlayer();

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(moveObstacles, 500);
}

// 이벤트
document.addEventListener('keydown', handleKey);
startBtn.addEventListener('click', startGame);

// 초기 맵 세팅
createMap();
playerPos = { x: 10, y: 19 };
for (let y = 0; y < mapSize; y++) {
    obstacles.push(...generateObstacleRow(y));
}
drawPlayer();
