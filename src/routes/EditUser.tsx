import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from "../api";
import '../css/EditUser.scoped.css';
import { useNavigate, useParams } from 'react-router-dom';
import { NeedsRole } from '../Components/auth';

export default function EditUser() {
    const { id } = useParams<{ id: string }>();
    const { currentUser, getToken, getUserById } = useContext(ApiContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [updateError, setUpdateError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(parseInt(id));
                console.log(userData.role);
                setEmail(userData.email);
                setName(userData.name);
                setRole(userData.role);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setUpdateError("Failed to load user data.");
            }
        };

        if (currentUser) {
            if (currentUser.role === 'manager' || currentUser.id.toString() === id) {
                fetchUserData();
            }
        }
    }, [id, currentUser, getUserById]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const token = getToken();

        const numericId = parseInt(id, 10);
        const roleLowerCase = role.toLowerCase();

        console.log(`name being sent: ${name}`);
        console.log(`role being sent: ${role}`);

        const updateData = {
            email,
            username: name,
            role: roleLowerCase,
            id: numericId
        };

        const endpoint = currentUser!.role === 'manager' ? `/update-admin/${id}` : `/update${id}`;

        console.log(updateData);  // Check what data is being sent right before the fetch call.

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setUpdateError("Invalid email format.");
            return;
        }

        console.log("Sending update with data:", updateData);  // Ensure this log prints the updated data.

        const response = await fetch(`http://localhost:3000/users${endpoint}`, {
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
            localStorage.setItem('profileUpdated', 'User profile has been updated successfully.');
            navigate(`/profile/${id}`);
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
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={name} required onChange={e => setName(e.currentTarget.value)} />
                    </div>
                    {currentUser && currentUser.role === 'manager' && currentUser.id.toString() !== id && (
                        <NeedsRole role='manager'>
                            <div className="form-group required">
                                <label htmlFor="role">Role</label>
                                <select id="role" className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                        </NeedsRole>
                    )}
                    <div className="form-group">
                        <button className="btn btn-primary w-100" type="submit">Update Profile</button>
                    </div>
                </form>
                {updateError && <p className="text-danger">{updateError}</p>}
                <p className="pt-3 text-center">
                    <a href={`/profile/${id}`}>Go back</a>
                </p>
            </div>
        </div>
    </div>
}
