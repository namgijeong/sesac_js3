const SearchBar = ({onSubmit, onChange}) => {
    return(
        <>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="검색어를 입력하세요" onChange={(e) => onChange(e.target.value)} />
          <button type="submit">검색</button>
        </form>
        </>
    )
}

export default SearchBar;