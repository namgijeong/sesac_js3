import {useAuth} from '../auth/AuthProvider.jsx';

export default function ProfilePage(){
    const {user} = useAuth();
    //const user = 'admin';

    const userId = user?.id ?? '(unknown)';
    return(
        <div>
            <h3>Profile</h3>
            <p>여기는 Profile입니다.</p>
            <p>사용자ID:<span>{userId}</span></p>
        </div>
    )
}
