import RegisterUserForm from "../../components/RegisterUserForm";
import NavBar from "../../components/NavBar";

const Register = () => {
    return <>
    <NavBar/>
    <RegisterUserForm route="/authusers/create/" method="register" />;
    </>
    }

export default Register;