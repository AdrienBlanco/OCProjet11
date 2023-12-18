import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLogIn } from "../../redux/reducers/authSlice"
import InputWrapper from "../InputWrapper/InputWrapper"
import Button from "../Button/Button"


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

        if (email.trim() === "" || password.trim() === "") {
            alert("Thank you to fill in all fields");
            return;
        } try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const loginData = await response.json()
            const token = loginData.body.token

            dispatch(setLogIn({ token }))
            navigate("/user")

        } catch (err) {
            alert("User not found, incorrect email or password");
            console.log(err);
        };
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
}