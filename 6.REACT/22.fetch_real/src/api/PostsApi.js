const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function requestJson(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}


export async function fetchPosts(){
    const data = await requestJson(`${BASE_URL}/posts`);
    return data;
}

