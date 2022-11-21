import {Link} from "react-router-dom";

export function LoginLinks() {
    return (
        <div>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
            <div>
                <Link to={"/register"}>Register new user</Link>
            </div>
            <div>
                <Link to={"/edit"}>edit users</Link>
            </div>
        </div>
    );
}