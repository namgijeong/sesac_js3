const TodoCount = ({completedCount, totalCount}) => {
return(
    <>
    <div>
        <span>전체: {totalCount}/ 완료: {completedCount}</span>
    </div>
    </>
)
}

export default TodoCount;