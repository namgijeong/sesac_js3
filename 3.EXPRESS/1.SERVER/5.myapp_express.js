const http = require('http');

// ✅ 1. 자바스크립트
// 자바스크립트는 기본 타입은 값을 그대로 복사해 전달하고, 객체 타입은 객체의 참조값을 복사해 전달하기 때문에 함수 안에서 객체 속성을 바꾸면 원본 객체가 수정된다.

// ✅ 2. 자바
// 자바는 모든 매개변수를 값으로 전달(pass-by-value) 하지만 객체의 경우 그 값이 참조값이기 때문에, 메서드 안에서 객체 속성을 변경하면 원본 객체가 변경된다.

// ✅ 3. 둘의 공통점
// 자바와 자바스크립트 모두 객체는 참조값을 복사해 전달하므로 내부 속성 변경은 원본에 영향을 주지만, 매개변수 자체를 새로운 객체로 재할당해도 원본은 변경되지 않는다.

//기본형(숫자, 문자열 등) → 값 전달(pass-by-value) 
//객체(Object, Array, Function) → 참조값의 값 전달(pass-by-reference-like

const myapp = {
    middlewares : [], //글로벌 미들웨어들을 여기에 등록
    routes : {},//개별 라우트 및 핸들러는 여기에 등록

    use(fn){
        this.middlewares.push(fn);
    },

    //라우터 등록함수 - 다중 핸들러 등록
    //... => 나머지 인자 받는 연산자
    register(route, ...handler){
        this.routes[route] = handler;
    },

    //요청을 처리하는 함수
    handleRequest(req,res){
        //요청을 받아서 어디서 요청했는지 확인
        const route = req.url;
        const routeHandlers = this.routes[route];

        //라우터가 없으면? (이제 []을 받을수 있어서, 배열의 길이가 0인것도 오류처리...)
        if (!routeHandlers || routeHandlers.length === 0){
            res.statusCode = 404;
            return res.end(`Not Found : ${route}`);
        }

        //미들웨어가 있으면, 미들웨어부터 처리한다
        const context = {req,res,route};
        const stack = [...this.middlewares, ...routeHandlers];
        let index = 0;

        //라우터 처리한다 요청한 라우트가 없으면 404 반호나
        const next = () => {
            //누군가 미들웨어에서 응답을 해버리면 거기서 종료
            if (res.writableEnded) return; 

            const fn = stack[index++];
            if (fn){
                fn(context, next);
            }
        }

        //첫번째 핸들러 미들웨어부터 실행을 시작함
        next();

    }
}

//미들웨어 등록
function loggerMiddleware(context, next) {
    console.log(`[LOG] ${context.req.method}, ${context.route}`);
    next();
    if (context.startTime){
        const duration = Date.now() - context.startTime;
        console.log(`[LOG2] ${context.req.method} ${context.route} - ${context.res.statusCode} ${duration}ms`);
    }
}

function timeMiddleware(context, next) {
    context.startTime = Date.now();
    next();
}

function headerMiddleware(context, next) {
    context.res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    next();
}

myapp.use(loggerMiddleware);
myapp.use(timeMiddleware);
myapp.use(headerMiddleware);

// 라우터 등록
function rootHandler(context) {
    context.res.end('Hello from /');
}

function userHandler(context) {
    context.res.end('Hello from /user');
}

function adminHandler(context) {
    context.res.end('Hello from /admin');
}

function userMiddleware(context, next){
    context.res.write('추가적인 /user 미들웨어 처리중...');
    next();
}

function adminAuthMiddleware(context, next){
    const authorized = false;
    if (!authorized){
        context.res.statusCode = 403;
        context.res.end('Admin은 인증을 필요로 합니다');
        return; // next()를 호출 안해서 종료되게 하려는 의도
    }

    next(); //authorized가 true이면 여기로 와서 통과
}

// 인증 성공 (토큰이 우리가 기대하는것)
// curl http://localhost:3000/admin -H "Authorization: Bearer admin1234"

// 인증 실패 (토큰이 틀렸음)
// curl http://localhost:3000/admin -H "Authorization: Bearer admin1233"

function adminRealAuthMiddleware(context, next){
    const {req, res} = context;

    //실제 인증 헤더 읽어오기...
    const authHeader = req.headers['authorization'];
    if (!authHeader){
        //인증실패
        res.statusCode = 404;
        res.end('Authorization is required');
        return;
    }

    //원하는 인증 형식: 'bearer 토큰값'
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || token !=='admin1234'){
        //forbidden 인가실패
        res.statusCode = 403;
        res.end('Invalid token or expired token');
        return;
    }
    
    console.log('인증 성공');

    next(); //authorized가 true이면 여기로 와서 통과
}

myapp.register('/', rootHandler);
myapp.register('/user', userMiddleware, userHandler);
myapp.register('/admin', adminRealAuthMiddleware, adminHandler);

//디버그를 위한 나의 자료구조 살펴보기...
function printRouteStacks(app){
    console.log('=== 내 라우트 실행 순서 살펴보기 ====');

    for (const [route, handlers] of Object.entries(app.routes)){
        const stack = [...app.middlewares , ...handlers];

        const names = [
            'req',
            ... stack.map(fn => fn.name),
            'res'
        ];

        console.log(`${route} : ${names.join(' -> ')}`);
    }

    console.log(`=====================`);
}

printRouteStacks(myapp);


//서버 생성
const server = http.createServer((req, res) => {
  myapp.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("서버레디");
});
