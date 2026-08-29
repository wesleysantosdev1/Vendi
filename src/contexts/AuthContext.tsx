import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken, setUnauthorizedHandler } from "../services/api";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    signIn: (user: User, token: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const STORAGE_KEY = "@vendi:auth";

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoredAuth() {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const { user: storedUser, token: storedToken } = JSON.parse(stored);
                    setUser(storedUser);
                    setToken(storedToken);
                    setAuthToken(storedToken);
                }
            } catch (error) {
                console.log("Erro ao carregar sessão salva:", error);
            } finally {
                setLoading(false);
            }
        }

        loadStoredAuth();
    }, []);

    async function signIn(userData: User, userToken: string) {
        setUser(userData);
        setToken(userToken);

        setAuthToken(userToken);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData, token: userToken }));
    }

    async function signOut() {
        setUser(null);
        setToken(null);

        setAuthToken(null);

        await AsyncStorage.removeItem(STORAGE_KEY);
    }

    const signOutRef = useRef(signOut);
    signOutRef.current = signOut;

    useEffect(() => {
        setUnauthorizedHandler(() => signOutRef.current());
        return () => setUnauthorizedHandler(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
