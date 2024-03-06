import '../css/Login.scoped.css'

export default function Login() {
    return <div className="row h-100 w-100" id="loginPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='loginCard'>
                <form
                    id="submitForm"
                    action="/login"
                    method="post"
                    data-parsley-validate=""
                    data-parsley-errors-messages-disabled="true"
                    noValidate
                >
                    <input
                        type="hidden"
                        name="_csrf"
                        defaultValue="7635eb83-1f95-4b32-8788-abec2724a9a4"
                    />
                    <div className="form-group required">
                        <label htmlFor="username">E-mail Address</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required/>
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required/>
                    </div>
                    <div className="form-group mt-4 mb-4">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="remember-me"
                                name="remember-me"
                                data-parsley-multiple="remember-me"
                            />
                            <label className="custom-control-label" htmlFor="remember-me">
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