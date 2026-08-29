import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import * as Keychain from "react-native-keychain";
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

const KEYCHAIN_SERVICE = "vendi.auth";

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoredAuth() {
            try {
                const credentials = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
                if (credentials) {
                    const { user: storedUser, token: storedToken } = JSON.parse(credentials.password);
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

        await Keychain.setGenericPassword(
            userData.id,
            JSON.stringify({ user: userData, token: userToken }),
            { service: KEYCHAIN_SERVICE }
        );
    }

    async function signOut() {
        setUser(null);
        setToken(null);

        setAuthToken(null);

        await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
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
