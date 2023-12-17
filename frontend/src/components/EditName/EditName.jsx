import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setGetUser, setEditUserName } from "../../redux/reducers/userSlice"

export default function EditName() {

    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const [OpenEdit, setOpenEdit] = useState(false);
    const [newUserName, setNewUserName] = useState(user.userName)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await response.json()
                dispatch(setGetUser({ userProfile: data }))
            } catch (err) {
                console.log(err)
            }
        }
        fetchUserData()
    }, [dispatch, token, user])

    const handleChange = (e) => {
        const newValue = e.target.value
        setNewUserName(newValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName: newUserName }),
            })
            if (response.ok) {
                dispatch(setEditUserName(newUserName))
                setOpenEdit(!OpenEdit)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {OpenEdit ? (
                <div className="sign-in-content">
                    <h1 className="color-grey">Edit user info</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="userName">User Name:</label>
                            <input type="text" id="userName" name="userName" placeholder={user.userName} onChange={handleChange} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={user.firstName} disabled />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={user.lastName} disabled />
                        </div>
                        <button className="edit-button" type="submit">Save</button>
                        <button className="edit-button" type="button" onClick={() => setOpenEdit(!OpenEdit)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div className="header">
                    <h1>Welcome back<br />{user.firstName + " " + user.userName + "!"}</h1>
                    <button className="edit-button" onClick={() => setOpenEdit(!OpenEdit)}>Edit Name</button>
                </div>
            )}
        </div>
    )
}