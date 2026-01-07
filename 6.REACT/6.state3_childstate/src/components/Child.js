import { useState } from "react";
function Child({sendMessageToParent}){
    const [text, setText] = useState('');
    return (
        <div>
            <h3>자식</h3>
            <input value={text} onChange={(e)=> setText(e.target.value)}/>
            <button onClick={()=> {sendMessageToParent(text)}}> 부모에게 메시지 보내기 </button>
        </div>
    )
}

export default Child;