
import Child from './Child';

//부모-자식간에 데이터를 주고 받는 가장 기본이 되는 패턴
//상태관리를 부모가 하는 정석

function Parent(){
    const handleMessage = (data) => {
        console.log('자식에게 받은 값:',data);
    }

    return(
        <div>
            <h2>부모</h2>
            <Child sendMessageToParent={handleMessage}/>
        </div>
    )
}

export default Parent;