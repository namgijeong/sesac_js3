import { useState, useEffect, createContext, useContext, useMemo } from "react";

//usecontext 모듈화

//세션 스토리지에 넣어 브라우저가 닫히면 삭제
const STORAGE_KEY = 'auth_user';
const storage = sessionStorage;

//상태 저장하기 위한 context
const AuthContext = createContext(null);

//children은 App
//컴포넌트인데 provider를 리턴하는것뿐
export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const raw = storage.getItem(STORAGE_KEY);

        if (!raw) return;

        try{
            const parsed = JSON.parse(raw);
            setUser(parsed);
        } catch(err){
            storage.removeItem(STORAGE_KEY);
        }
    }, []);

    const login = (nextUser) => {
        setUser(nextUser);
        storage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    }
    
    const logout = () => {
        setUser(null);
        storage.removeItem(STORAGE_KEY);
    }

    const value = useMemo(() => {
        return{
            user,
            isAuthed: !!user,
            login,
            logout,
        }
    })

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//커스텀훅 => use로 시작하고, 내부에서 다른 hook을 호출, JSX를 리턴하지 않는 함수
export function useAuth(){
    const ctx = useContext(AuthContext);
    if (!ctx){
        throw new Error('접근불가 <AuthContext>를 감싸지 않은 컴포넌트에서 나를 호출했음');
    }

    return ctx;
}