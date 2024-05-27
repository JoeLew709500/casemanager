import NavBar from "../components/NavBar";
import { Container } from "react-bootstrap";

const NotFound = () => {
    return <>
    <NavBar/>
    <Container>
    <div class="text-center">
        <h1>Oops 404 Error</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
    </div> 
    </Container>
    </>;
    
}

export default NotFound;