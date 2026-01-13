const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');
const chatbox = document.getElementById('chatbox');

function add(role, text){
    console.log(`Role:${role}, Text: ${text}`);

    const bubble = document.createElement('div');
    bubble.className = 'mb-2';
    bubble.className = `mb-2 d-flex ${role === 'user' ? 'justify-content-end': 'justify-content-start'}`;

    const badge = role === 'user' ? `<span class="badge text-bg-primary me-2">나</span>`: `<span class="badge text-bg-warning me-2">봇</span>`;

    bubble.innerHTML = `${badge}<span>${text}</span>`;
    chatbox.appendChild(bubble);

    chatbox.scrollTop = chatbox.scrollHeight;
}

async function chat(message){
    const res = await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({message}),
    });

    const data= await res.json();
    console.log(data);

    return data.reply;
}

async function send(){
     const text = input.value.trim();
    if (!text) return;

    //내가 입력한 메시지 출력
    add('user',text);
    //입력글자 지우기
    input.value = '';

    try{
        const reply = await chat(text);
        console.log('프론트',reply);

        //응답 메시지 출력
        add('bot',reply);
    } catch(err){
        //화면에 오류메시지 출력
        add('bot',err);
    }
}

sendBtn.addEventListener('click',  () => {
   send();
});

input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter'){
        send();
    }
})
