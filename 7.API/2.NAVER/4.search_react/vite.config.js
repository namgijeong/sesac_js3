import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//npm run dev는 react의 임시 서버
//vite서버에 proxy를 설정
//그러면 지가 express에 전달해줌 => 서버에 app.use설정대신 cors를 해결하는 또 다른 방법
//proxy에 설정한 주소를 요청하면 target으로
//사용자 => 브라우저 react => vite proxy -> express -> naver api
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/search/blog':{
        target:'http://localhost:3000',
        changeOrigin:true,
      }
    }
  }
})
