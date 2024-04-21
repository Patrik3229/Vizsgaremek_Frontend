import { createContext, useEffect, useState } from "react";
import { User } from "./User";

/**
 * Létrehoz egy kontextust az API-hoz, az alapértelmezett értékekkel és műveletekkel.
 */
export const ApiContext = createContext({
    error: '',
    login: async (_email: string, _password: string) => { },
    logout: () => { },
    token: '',
    currentUser: null as (User | null),
    getToken: () => '' as string,
    getUserById: async (_id: number): Promise<User | undefined> => {
        console.warn("getUserById default function used, which should be overridden");
        return undefined;
    },
});

/**
 * Típusdefiníció a komponens tulajdonságainak.
 * @interface
 */
interface Props {
    children: React.ReactNode;
}

/**
 * Kezeli a felhasználó bejelentkezési állapotát és a hozzáférési token tárolását.
 * @param children - A komponens tulajdonságai.
 * @returns {JSX.Element} - A gyermek komponenseket.
 */
export function ApiProvider({ children }: Props) {
    const [token, setToken] = useState<string>('');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {

        /**
         * Lekéri a jelenleg bejelentkezett felhasználó adatait és elmenti a userData-ba.
         */
        async function loadLoggedInUserData() {
            const response = await fetch(`http://localhost:3000/users/me`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (response.status === 401) {
                setToken('');
                localStorage.removeItem('token');
                setError('Please login again');
                return;
            }
            if (!response.ok) {
                setError('An error occured, try again later');
                return;
            }
            const userData = await response.json() as User;
            setLoggedInUser(userData);
        }

        if (token) {
            loadLoggedInUserData();
        } else {
            setLoggedInUser(null);
        }

    }, [token]);

    /**
     * Logika, amely lekéri egy felhasználó adatait az id-ja alapján és JSON formátumban visszaadja.
     * @param id A felhasználó id-ja.
     * @returns JSON formátumban az adott felhasználó adatait.
     */
    async function getUserById(id: number): Promise<User | undefined> {
        try {
            const response = await fetch(`http://localhost:3000/users/find${id}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return await response.json() as User;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;  // Or handle the error as needed
        }
    };

    /**
     * A kijelentkezés logikája.
     */
    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        return true;
    };

    const apiObj = {
        currentUser: loggedInUser,
        error,
        token,
        logout,
        getToken: () => token,
        getUserById,

        /**
         * A bejelentkezés logikája. Elküldi a megadott adatokat a backend részére, majd visszaadja a tokent, amit a backendtől kap.
         * @param email A felhasználó e-mail címe.
         * @param password A felhasználó jelszava.
         * @returns Tokent és user id-t.
         */
        login: async (email: string, password: string) => {
            const loginData = {
                email, password,
            }

            try {
                const response = await fetch(`http://localhost:3000/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (!response.ok) {
                    const errorObj = await response.json();
                    throw new Error(errorObj.message);
                }
                const tokenObj = await response.json();
                setToken(tokenObj.token);
                localStorage.setItem('token', tokenObj.token);
                return tokenObj;
            } catch (error) {
                console.error("Login failed HERE", error);
                throw error;
            }
        },
    };

    return <ApiContext.Provider value={apiObj}>
        {children}
    </ApiContext.Provider>
}