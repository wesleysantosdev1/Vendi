import React, { createContext, useState, useContext } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    signIn: (user: User, token: string) => void;
    signOut: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    function signIn(userData: User, userToken: string) {
        setUser(userData);
        setToken(userToken);
    }

    function signOut() {
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}