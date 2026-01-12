import { useAuth } from "../auth/AuthProvider";

export default function ProfilePage(){
    const {user} = useAuth();
    //const user = 'admin';

    //?. (Optional Chaining)
    //user가 null 또는 undefined면 → 에러 안 내고 undefined 반환
    //?? (Nullish Coalescing)
    //a가 null 또는 undefined일 때만 → b 사용
    const userId = user?.id ?? '(unknown)';
    return(
        <div>
            <h3>Profile</h3>
            <p>여기는 Profile입니다.</p>
            <p>사용자ID:<span>{userId}</span></p>
        </div>
    )
}