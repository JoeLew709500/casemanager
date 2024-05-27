import { useState, useEffect } from "react";
import { Container, Button, Form, Row } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import api from "../../drf";
import axios from 'axios';
import { ACCESS_TOKEN } from "../../constants";

const cloudinary = import.meta.env.VITE_CLOUDINARY_CLOUD_URL
const API_URL = import.meta.env.VITE_API_URL

const PhotosList = () => {
    const [photos, setPhotos] = useState([
        {
            image: "",
            action_id: "",
        },
    ]);

    const actionId = window.location.pathname.split("/").pop();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const getPhotos = async () => {
        try {
            const res = await api.get("/actions/photo/");
            console.log("Response:", res.data);
            setPhotos(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPhotos();
    }, []);

    const createPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('action_id', actionId);
    
        try {
            const response = await axios.post(`${API_URL}/actions/photo/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            });
    
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deletePhoto = async (id) => {
        try {
            const response = await api.delete(`/actions/photo/delete/${id}/`);
            console.log(response.data);
            getPhotos();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <NavBar />
        <Container>
            <Form onSubmit={createPhoto}>
                <input type="file" onChange={handleFileChange} />
                <Button type="submit">Upload Photo</Button>
            </Form>
            <Container>
                    {photos.map((image) => (
                        <Row className="mt-3">
                            <div className="col-md-4">
                                <div className="card mt-2">

                                    <img src={cloudinary + image.photo} className="card-img-top" alt="..." />
                                    <Button onClick={() => deletePhoto(image.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>

                        </Row>
                    ))}
        </Container>
        </Container>
        </>
    );


}

export default PhotosList;