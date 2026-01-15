//const BASE_URL = 'http://127.0.0.1:3000';

const naverBlogApi = async (query) => {
  try {
    //이때 cors 에러 해결해야함. 즉 다른 독립적인 Frontend 서버에서 오는것도 허용
    //port가 달라서
    const res = await fetch(`/search/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1, text: query }),
    });

    const data = await res.json();
    return data.items;
  } catch (err) {
    console.error(err);
  }
};

export default naverBlogApi;