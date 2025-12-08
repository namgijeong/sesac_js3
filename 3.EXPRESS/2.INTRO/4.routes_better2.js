const express = require('express');
const app = express();
//보통 상수는 대문자로 함
const PORT = 3000;

app.get('/',(req,res) => {
    res.send('나의 루트');
});

//curl -X GET "127.0.0.1:3000/products?category=it&name=apple"
//상품 조회는 GET 파라미터, 쿼리 파라미터를 통해서 요청이 들어옴
//예) 127.0.0.1:3000/products?category=it&name=apple
app.get('/products',(req,res) => {
    //쿼리파라미터는 req.query에 담겨서 옴
    console.log(`나의 카테고리 : ${req.query.category}, 나의 상품: ${req.query.name}`);
    res.send('나의 상품');
});

//CMD 명령어
// curl -X POST 127.0.0.1:3000/users
// curl -X GET 127.0.0.1:3000/users/1

//고객님의 회원번호, 즉 id를 어떻게 보내올까??
app.get('/users/:id',(req,res) => {
    //익스프레스 개발자가, 이렇게 가변인자로 정의한것은
    //req.params 라는 자료구조에 담아서 보내줌
    console.log(req.params.id);
    res.send(`나의 고객님 id: ${req.params.id}입니다.`);
});


app.post('/users',(req,res) => {
    let newId = 12345;
    res.send(`나의 신규 고객님 생성: 신규 ID는 ${newId} 입니다.`);
});

app.put('/users/:id',(req,res) => {
    res.send('나의 고객님 정보 수정');
});

app.delete('/users/:id',(req,res) => {
    res.send('나의 고객님 삭제');
});

app.listen(PORT, () => {
    console.log(`server is ready at http://127.0.0.1:${PORT}`);
});