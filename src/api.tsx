import { createContext, useEffect, useState } from "react";
import { User } from "./User";

export const ApiContext = createContext({
    error: '',
    login: async (_email: string, _password: string) => { },
    logout: () => { },
    token: '',
    currentUser: null as (User | null),
    getToken: () => '' as string,
    getUserById: async (_id: number) => { },
});

interface Props {
    children: React.ReactNode;
}

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

    async function getUserById(id: number) {
        try {
            const response = await fetch(`http://localhost:3000/users/find${id}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;  // Or handle the error as needed
        }
    };

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