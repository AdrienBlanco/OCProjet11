import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setGetUser, setEditUserName } from "../../redux/reducers/userSlice";
import { fetchUserProfile, updateUserName } from "../../redux/api";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";

export default function EditName() {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const [OpenEdit, setOpenEdit] = useState(false);
    const [newUserName, setNewUserName] = useState(user.userName);

    // Mise à jour du state global avec les données de l'utilisateur connecté
    useEffect(() => {
        const userData = async () => {
            const data = await fetchUserProfile(token);
            dispatch(setGetUser({ userProfile: data }));
        };
        userData();
    }, [dispatch, token, user]);

    // Mise à jour du UserName dans le state global
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userNameField = document.querySelector('input#userName');

        if (!userNameField.value) {
            alert("Please fill in a new user name before saving");
            return;
        }
        const success = await updateUserName(token, newUserName);
        if (success) {
            dispatch(setEditUserName(newUserName));
            setOpenEdit(!OpenEdit);
        }
    };

    return (
        <div>
            {OpenEdit ? (
                <div className="sign-in-content">
                    <h1>Edit user info</h1>
                    <form onSubmit={handleSubmit}>
                        <InputWrapper
                            id="userName"
                            label="User Name:"
                            type="text"
                            placeholder={user.userName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                        <InputWrapper
                            id="firstName"
                            label="First Name:"
                            type="text"
                            value={user.firstName}
                            disabled={true}
                        />
                        <InputWrapper
                            id="lastName"
                            label="Last Name:"
                            type="text"
                            value={user.lastName}
                            disabled={true}
                        />
                        <Button
                            className="edit-button"
                            type="submit"
                            txt="Save"
                        />
                        <Button
                            className="edit-button"
                            type="button"
                            onClick={() => setOpenEdit(!OpenEdit)}
                            txt="Cancel"
                        />
                    </form>
                </div>
            ) : (
                <div className="header">
                    <h1>Welcome back<br />{user.firstName + " " + user.userName + "!"}</h1>
                    <Button
                        className="edit-button"
                        type="button"
                        onClick={() => setOpenEdit(!OpenEdit)}
                        txt="Edit Name"
                    />
                </div>
            )}
        </div>
    )
};