import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from "../api";
import '../css/EditUser.scoped.css';

export default function EditUser() {
    const { currentUser, getToken } = useContext(ApiContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [updateError, setUpdateError] = useState('');

    // Fetch current user data to pre-fill the form
    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email);
            setUsername(currentUser.name);
        }
    }, [currentUser]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setUpdateError("Invalid email format.");
            return;
        }

        const updateData = {
            email,
            username
        };

        const token = getToken();
        const response = await fetch(`http://localhost:3000/users/update${currentUser!.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setUpdateError(errorObj.message);
            return;
        } else {
            setUpdateError("Profile updated successfully!");
        }
    };

    return <div className="row h-100 w-100" id="updatePage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='updateCard'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group required">
                        <label htmlFor="email">E-mail Address</label>
                        <input type="email" className="form-control text-lowercase" id="email" name="email" value={email} required onChange={e => setEmail(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={username} required onChange={e => setUsername(e.currentTarget.value)} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary w-100" type="submit">Update Profile</button>
                    </div>
                </form>
                {updateError && <p className="text-danger">{updateError}</p>}
                <p className="pt-3 text-center">
                    <a href="/">Go back</a>
                </p>
            </div>
        </div>
    </div>
}
