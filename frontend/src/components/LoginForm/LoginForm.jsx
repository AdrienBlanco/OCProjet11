import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogIn } from "../../redux/reducers/authSlice";
import { fetchUserLogin } from "../../redux/api";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";


export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkBox, setCheckBox] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("rememberedEmail");
        if (storedEmail) {
            setEmail(storedEmail);
            setCheckBox(true);
        }
    }, []);

    // Sauvegarde du champs email si la checkbox est cochée
    useEffect(() => {
        if (checkBox) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }
    }, [checkBox, email]);

    const handleCheckBox = (e) => {
        setCheckBox(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Thank you to fill in all fields");
            return;
        }

        const loginData = await fetchUserLogin(email, password);

        // Si la connexion est réussie, le token est enregistré dans le state global
        if (loginData.status === 200) {
            const token = loginData.body.token;
            dispatch(setLogIn({ token }))
            navigate("/user")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputWrapper
                id="username"
                label="Username"
                type="text"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputWrapper
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-remember">
                <input type="checkbox" id="remember-me" checked={checkBox} onChange={handleCheckBox} />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button
                className="sign-in-button"
                type="submit"
                txt="Sign In"
            />
        </form>
    )
};