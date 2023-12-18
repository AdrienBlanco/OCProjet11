const apiUrl = "http://localhost:3001/api/v1/";

// Requête pour l'authentification
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 400) {
            alert("Bad request: Incorrect email or password");
        } if (response.status === 500) {
            alert("Internal server error: Please try again");
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error(err);
    };
}

// Requête pour récupérer les données de l'utilisateur connecté
export const fetchUserProfile = async (token) => {
    try {
        const response = await fetch(`${apiUrl}user/profile`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

// Requête pour modifier le userName dans le profile du user
export const updateUserName = async (token, newUserName) => {
    try {
        const response = await fetch(`${apiUrl}user/profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName: newUserName }),
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Updating failed", err);
        alert("Internal server error, please try again")
    }
};