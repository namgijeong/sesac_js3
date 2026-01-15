const SearchResults = ({results}) => {
  return (
    <>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank">
                {/* xss를 방지하기 위해서 내용에 tag가 있다면 프로세싱 안하는게 기본. 그 위험을 무릅쓰고 난 프로세싱 하겠다. */}
              <h5 dangerouslySetInnerHTML={{__html:item.title}}></h5>
            </a>
            <p dangerouslySetInnerHTML={{__html:item.description}}></p>
            <small>{item.postdate}</small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
