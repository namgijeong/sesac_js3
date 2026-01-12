//인증이 안되서, 접근 불가를 알리기 위한 페이지
import AuthRequiredPage from '../pages/AuthRequiredPage.jsx';
import { useAuth } from './AuthProvider';

//profilepage에서 조건부렌더링으로 할수있는것을 모듈화 하였다고 생각하면 된다
export default function ProtectedRoute({children}){
    const {isAuthed} = useAuth();

    if (!isAuthed){
        return (
            <AuthRequiredPage/>
        )
    }

    return children;
}