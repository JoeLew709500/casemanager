import NavBar from "../components/NavBar";
import { Container } from "react-bootstrap";
import "../styles/home.css"
import flytipImage from "../assets/flytip.jpg"
import Footer from "../components/Footer";

const Home = () => {
    return <>
    <NavBar/>
    <Container>
    <div class="mt-3">
        <img src={flytipImage} id="flytip" class="img-fluid"/>
        <div id="intro-para">
            <h1>Welcome to the Artic Case Manager</h1>
            <p>Your Public Protection Case Management System</p>
            <p>This site is to help you manage your UK Public Protection cases</p>
            <p>You can create incidents for each case</p>
            <p>You can add your actions to each incident ie, a notice you issued to an individual</p>
            <p>You can also add photos to each action to store copies of the evidence found</p>
        </div>
    </div>
    </Container>
    <Footer/>
    </>
}

export default Home;