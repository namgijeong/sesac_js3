function SearchBox({ searchKeyword, search }) {
  return (
    <>
      <input className="form-control mb-4" value={searchKeyword} type="text" onChange={(e) => search(e.target.value)} />
    </>
  );
}

export default SearchBox;
