const http = require("http");

const myapp = {
  //이번엔 배열이 아니고 key,value를 탐색하기 좋은 자료구조인 object
  routes: {},

  //라우트 등록하는 함수 (경로, 핸들러-콜백함수)
  register(route, handler) {
    this.routes[route] = handler;
  },

  //요청처리
  handleRequest(req, res) {
    //실제 http 모듈이 우리에게 전달해줄 내용
    const route = req.url;
    //라우터 호출
    const handler = this.routes[route];

    if (handler) {
      handler(req, res);
    } else {
      res.statusCode = 404;
      res.end("NOT FOUND");
    }
  },
};

function rootHandler(req, res) {
  console.log("사용자가 루트(/)에 방문");
  res.end("welcome to my homepage");
}
function userHandler(req, res) {
  console.log("사용자가 /user에 방문");
  res.write("user 데이터를 프로세싱중입니다");
  res.end("안녕하세요. 사용자님.");
}
function adminHandler(req, res) {
  console.log("사용자가 /admin에 방문");
  res.write("admin 인증을 필요로 합니다");
  res.end("안녕히가세요");
}
myapp.register("/", rootHandler);
myapp.register("/user", userHandler);
myapp.register("/admin", adminHandler);

const server = http.createServer((req, res) => {
  myapp.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("서버레디");
});
