import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants.js";
import api from "../drf.js";
import { useEffect,useState } from "react";

const Username = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const decoded = jwtDecode(token);
    const username_id = decoded.user_id;

    let [username, setUsername] = useState("")

    const getUser = async () => {
            const res = await api.get(`/authusers/${username_id}/`);
            console.log('Response:',res.data.username);
            username = res.data.username;

    useEffect(() => {
        getUser();
    }, []);

    return username;
}
}

export default Username;