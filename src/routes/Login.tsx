import '../css/Login.scoped.css'

export default function Login() {
    return <div className="row h-100 w-100" id="loginPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='loginCard'>
                <form id="submitForm" action="/login" method="post">
                    <div className="form-group required">
                        <label htmlFor="username">E-mail Address</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required />
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
            </div>
        </div>
    </div>

}