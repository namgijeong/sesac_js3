const TodoVisible = ({onChange}) => {
    return(
        <>
        <div style={{display:'flex', gap:'10px'}}>
            <input type="checkbox" onChange={(e)=> onChange(e.target.checked)}/>
            <span>완료 항목 숨기기</span>
        </div>
        </>
    )
}

export default TodoVisible;