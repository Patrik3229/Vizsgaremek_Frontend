import { createContext, useEffect, useState } from "react";
import { User } from "./User";

export const ApiContext = createContext({
    error: '',
    login: async (email: string, password: string) => { },
    logout: () => { },
    /*
    register: async (email: string, password: string) => {},
    listAllUsers: async () => ([] as User[]),
    deleteUser: async(id: int) => {},
    */
    currentUser: null as (User | null)
});

interface Props {
    children: React.ReactNode;
}

export function ApiProvider({ children }: Props) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null as User | null)
    const [error, setError] = useState('')

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        async function loadUserData() {
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
            setUser(userData);
        }

        if (token) {
            loadUserData();
        } else {
            setUser(null);
        }
    }, [token])
    console.log("asd");

    const apiObj = {
        currentUser: user,
        error,

        login: async (email: string, password: string) => {
            console.log("Attempting to log in", email);
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

                console.log("Received response", response);

                if (!response.ok) {
                    const errorObj = await response.json();
                    console.log("Login error", errorObj);
                    throw new Error(errorObj.message);
                }
                const tokenObj = await response.json();
                console.log("Login successful", tokenObj);
                setToken(tokenObj.token);
                localStorage.setItem('token', tokenObj.token);
            } catch (error) {
                console.error("Login failed", error);
            }


        },
        logout: () => {
            setToken('');
            localStorage.removeItem('token');
        }
    };

    return <ApiContext.Provider value={apiObj}>
        {children}
    </ApiContext.Provider>
}

