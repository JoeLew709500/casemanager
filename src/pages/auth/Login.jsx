import UserForm from "../../components/UserForm";
import NavBar from "../../components/NavBar";

const Login = () => {
    return <>
    <NavBar/>    
    <UserForm route="/authusers/token/" method="login" />;
    </>
}

export default Login;