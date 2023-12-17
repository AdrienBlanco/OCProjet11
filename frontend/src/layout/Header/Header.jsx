import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ArgentBankLogo from "../../img/argentBankLogo.png"
import { setLogOut } from "../../redux/reducers/authSlice"

export default function Header() {

    const location = useLocation();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const userName = useSelector((state) => state.user.userName)


    const handleLogout = () => {
        dispatch(setLogOut());
    };

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={ArgentBankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                {location.pathname === '/user' && token ? (
                    <div>
                        <Link className="main-nav-item" to="/user"><i className="fa fa-user-circle"></i> {userName}</Link>
                        <Link className="main-nav-item" to="/" onClick={handleLogout}>Sign Out</Link>
                    </div>
                ) : (
                    <Link className="main-nav-item" to="/sign-in"><i className="fa fa-user-circle"></i> Sign In</Link>
                )}
            </nav>
        </header>
    );
}