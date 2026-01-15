import { useState } from 'react';

import naverBlogApi from './api/naverBlogApi';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
  //검색어 저장
  const [query, setQuery] = useState('');
  //검색 결과 저장
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = await naverBlogApi(query);
    setResults(data);
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  return (
    <>
      <div>
        <h1>마이 블로그 검색</h1>

        {/* 입력창 */}
        <SearchBar onSubmit={handleSearch} onChange={handleChange}/>

        {/* 결과창 */}
        <SearchResults  results={results}/>
      </div>
    </>
  );
}

export default App;
