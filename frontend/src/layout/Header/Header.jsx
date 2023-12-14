import { Link } from 'react-router-dom'
import ArgentBankLogo from "../../img/argentBankLogo.png"

export default function Header() {
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
                <Link className="main-nav-item" to="/sign-in"><i className="fa fa-user-circle"></i>Sign In</Link>
            </nav>
        </header>
    );
}