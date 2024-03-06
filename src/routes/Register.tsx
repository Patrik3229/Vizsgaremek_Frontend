import '../css/register.scoped.css'

export default function register() {
    return <div className="row h-100 w-100" id="registerPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='registerCard'>
                <form action="/register" method="post">
                    <div className="form-group required">
                        <label htmlFor="username">E-mail Address</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password Again</label>
                        <input type="password" className="form-control" id="password" name="password" required />
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
                <p className="pt-3 text-center">
                    <a href="/">Go back</a>
                </p>
            </div>
        </div>
    </div>

}