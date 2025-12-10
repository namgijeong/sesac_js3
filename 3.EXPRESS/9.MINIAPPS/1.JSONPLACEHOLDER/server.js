const express = require('express');
const app = express();
const PORT = 3000;

let posts = [
    { id: 1, title: '나의 첫번째 글', body: '이것은 나의 첫번째 글입니다.' },
    { id: 2, title: '나의 두번째 글', body: '이것은 나의 두번째 글입니다.' },
]

//미들웨어로 index.html 자동 부름
app.use(express.static('public'));

//request content-type이 application/json
app.use(express.json());

app.get('/api/posts', (req, res) => {
    if (posts.length == 0) {
        res.json({ status: 'error', message: '현재 게시글이 존재하지 않습니다.' });
        return;
    }
    //알아서 나의 헤더에 application/json을 담아서 보내준다.
    res.json({ status: 'ok', message: posts });
});

app.get('/api/post/:id', (req, res) => {
    const postId = Number(req.params.id);
    //const postsFiltered = posts.filter(post => post.id === postId);

    //알아서 나의 헤더에 application/json을 담아서 보내준다.
    //res.json(postsFiltered);

    //find를 쓰는게 더 좋다
    //send로도 객체를 보낼수있다한다 res.send({"status":"원하는 항목은 없습니다."});
    const post = posts.find(p => p.id == postId);
    if (!post) {
        res.json({ status: 'error', message: '해당 게시글 아이디가 존재하지 않습니다.' });
        return;
    }
    res.json({ status: 'ok', message: post });

});

app.post('/api/post', (req, res) => {
    const title = req.body.title;
    const content = req.body.body;

    let currentId;

    //빈배열이면 아이디를 강제로 1로
    if (posts.length == 0) {
        currentId = 1;
    } else {
        //현재 아이디를 찾고 증가
        currentId = posts[posts.length - 1].id;
        currentId += 1;
    }

    posts.push({ id: currentId, title: title, body: content });

    console.log(posts);
    res.json({ status: 'ok', message: '정상적으로 등록되었습니다.' });
});

app.put('/api/post/:id', (req, res) => {
    const postId = Number(req.params.id);
    const title = req.body.title;
    const content = req.body.body;

    const newPost = {
        id: postId,
        title: title,
        body: content,
    };

    let postIdValid = false;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === postId) {
            postIdValid = true;
            posts[i] = newPost;
            break;
        }
    }

    console.log(posts);

    if (postIdValid == false) {
        res.json({ status: 'error', message: '해당 게시글 아이디가 존재하지 않습니다.' });
        return;
    }

    //posts = posts.map(post => post.id === postId ? newPost : post);
    res.json({ status: 'ok', message: '정상적으로 수정되었습니다.' });
});

app.delete('/api/post/:id', (req, res) => {
    const postId = Number(req.params.id);

    const postIndex = posts.findIndex(post => {
        return post.id === postId
    });

    if (postIndex == -1) {
        res.json({ status: 'error', message: '해당 게시글 아이디가 존재하지 않습니다.' });
        return;
    }
    
    //원본배열 변경됨
    posts.splice(postIndex,1);
    console.log(posts);
    res.json({ status: 'ok', message: '정상적으로 삭제되었습니다.' });

});


app.listen(PORT, () => {
    console.log('서버레디');
})