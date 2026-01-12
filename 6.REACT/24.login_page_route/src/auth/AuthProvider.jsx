import { useState, useEffect, createContext, useContext, useMemo } from "react";

//usecontext를 모듈화했다고 생각하면 된다

//세션 스토리지에 넣어 브라우저가 닫히면 삭제
const STORAGE_KEY = 'auth_user';
const storage = sessionStorage;

//상태를 저장하기 위한 빈 공간 생성
const AuthContext = createContext(null);

//children은 App
export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const raw = storage.getItem(STORAGE_KEY);
        
        if (!raw) return;

        try{
            const parsed = JSON.parse(raw);
            setUser(parsed);
        } catch{
            //저장된 값이 나의 생각과 일치하지 않으면
            storage.removeItem(STORAGE_KEY);
        }
    },[]);

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
            isAuthed:!!user, //문자열을 true, false 값으로 만든다
            login,
            logout
        }
    })
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if (!ctx){
        throw new Effor('접근불가 <AuthContext>를 감싸지 않은 컴포넌트에서 나를 호출했음');
    }
    return ctx;
}