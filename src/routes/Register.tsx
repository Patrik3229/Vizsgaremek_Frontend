import { FormEvent, useState } from 'react';
import '../css/Register.scoped.css'

export default function Register() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [registerError, setRegisterError] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (password !== passwordAgain) {
            setRegisterError("Passwords do not match.");
            return;
        } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setRegisterError("Invalid email format.");
            return;
        }
        else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            {/*Minimum eight characters, at least one uppercase letter, one lowercase letter and one number*/}
            setRegisterError("Your password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number.");
            return;
        }

        const registerData = {
            email,
            username,
            password,
            passwordAgain
        }

        const response = await fetch(`http://localhost:3000/users/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            const errorObj = await response.json();
            setRegisterError(errorObj.message);
            return;
        }
    };

    return <div className="row h-100 w-100" id="registerPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='registerCard'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group required">
                        <label htmlFor="email">E-mail Address</label>
                        <input type="text" className="form-control text-lowercase" id="email" name="email" required onChange={e => setEmail(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" required onChange={e => setUsername(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required onChange={e => setPassword(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="confirmPassword">Password Again</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required onChange={e => setPasswordAgain(e.currentTarget.value)} />
                    </div>
                    <div className="mt-4 mb-1">
                        <div>
                            <input type="checkbox" id="remember-me" name="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary w-100" type="submit">
                            Register
                        </button>
                    </div>
                </form>
                {registerError && <p className="text-danger">{registerError}</p>}
                <p className="pt-3 text-center">
                    <a href="/">Go back</a>
                </p>
            </div>
        </div>
    </div>
}