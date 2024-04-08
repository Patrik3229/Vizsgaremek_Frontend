import { useNavigate } from 'react-router-dom';
import '../css/CreateRecipe.scoped.css'
import { FormEvent, useState } from 'react';

export default function CreateRecipe() {

    const [postError, setPostError] = useState('');
    const navigate = useNavigate();
    

    async function post(e: FormEvent) {
        e.preventDefault();


        navigate('/');


    }

    return <>
    <div id='page'>
    <div className="row h-100 w-100" id="loginPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='loginCard'>
                <form onSubmit={post}>
                    <div className="form-group required">
                        <label htmlFor="username">Recipe Name</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="username">Description</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required />
                    </div>
                    
                    <div className="mt- mb-1">
                        <div>
                            <input type="checkbox" className="custom-control-input" id="remember-me" name="remember-me"
                            />
                            <label htmlFor="remember-me">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary w-100" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <p className="pt-3" id='footer'>
                    <div>
                        <span>Not a member? </span>
                        <a href="/signup">Register now</a>
                    </div>
                    <div>
                        <a href="/">Go back</a>
                    </div>
                </p>
                {postError && <p className="text-danger text-center">{postError}</p>}
            </div>
        </div>
    </div>
    </div>
    </>
}