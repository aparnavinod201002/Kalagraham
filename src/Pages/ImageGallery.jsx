import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header1 from '../Components/Header1';
import { useNavigate } from 'react-router-dom';
import { DeleteImageGallaryAPI, ImageGallaryGetAPI, ImageGalleryRegAPI } from '../Services/allAPI';
import { server_url } from '../Services/server_url';

function ImageGallery() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageGallary, setImageGallary] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [fileStatus, setFileStatus] = useState(false);
  const [preview, setPreview] = useState('');
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (imageGallary.image) {
      if (
        imageGallary.image.type === 'image/png' ||
        imageGallary.image.type === 'image/jpeg' ||
        imageGallary.image.type === 'image/jpg'
      ) {
        setPreview(URL.createObjectURL(imageGallary.image));
        setFileStatus(false);
      } else {
        console.log('Please provide valid image extensions');
        setFileStatus(true);
        setImageGallary({ title: '', description: '', image: '' });
      }
    }
  }, [imageGallary.image]);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { title, description, image } = imageGallary;

    if (!title || !description || !image) {
      toast.info('Please fill in all fields');
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('userId', userId);

      const reqHeader = {
        "content-Type": "multipart/form-data"
      };
      // API call
      try {
        const result = await ImageGalleryRegAPI(formData, reqHeader); // Pass only FormData; no need for custom headers.
        if (result.status === 200) {
          getImageGallary(); // Update the gallery after adding new image
          handleClose();
          toast.success('Image Gallery successfully registered');
          navigate('/imageGallery');
          setImageGallary({ title: '', description: '', image: '' });
        }
      } catch (err) {
        console.error('Error registering image:', err);
        toast.error('Failed to register image gallery');
      }
    }
  };

  // Get image gallery data
  const [imageGallaryGet, setImageGallaryGet] = useState([]);
  const getImageGallary = async () => {
    const result = await ImageGallaryGetAPI(userId);
    if (result.status === 200) {
      setImageGallaryGet(result.data); // Update the image gallery state
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getImageGallary(); // Fetch gallery images on component mount
  }, []);

  const handleDelete = async (imagegallaryId) => {
    try {
      const result = await DeleteImageGallaryAPI(imagegallaryId);
      if (result.status === 200) {
        getImageGallary(); // Update gallery data after deletion without page refresh
      } else {
        console.error('Error deleting image gallery:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Header1 />
      <Container style={{color:"white"}}>
        {/* Title Section */}
        <h3 className="text-warning text-center my-5" style={{ fontSize: '50px', textShadow: "2px 4px 6px grey" }}>
          Images Gallery
        </h3>
        <Row>
          <Col md={4} sm={6} xs={12} className="d-flex align-items-center justify-content-center">
            <Button
              className="btn btn-warning shadow mb-4"
              style={{ padding: '15px 30px' }}
              onClick={handleShow}
            >
              Add More Images
            </Button>
          </Col>
        </Row>
        <Row>
          {/* Display images in a 4-card grid */}
          {imageGallaryGet?.length > 0 ? imageGallaryGet.map((imagegallaryGet, index) => (
            <Col md={3} sm={6} xs={12} key={index} className="mb-4">
              <Card className="shadow-sm h-90">
                <Card.Img
                  variant="top"
                  src={`${server_url}/uploads/${imagegallaryGet?.image}`}
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <Card.Body>
                  <Card.Text className="text-center">
                    <h2><strong style={{ color: "white" }}> {imagegallaryGet.title} </strong></h2>
                    <strong className='text-warning'>Description: {imagegallaryGet.description}</strong>
                  </Card.Text>
                  <button className='btn' onClick={() => handleDelete(imagegallaryGet._id)}>
                    <i className='fa-solid fa-trash text-danger'></i>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          )) : <p className='text-danger' style={{ textAlign: "center" }}>Not Found</p>}
        </Row>

       
      </Container>

      {/* Add Image Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Image Title */}
            <FloatingLabel controlId="floatingInput1" label="Image Title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={imageGallary.title}
                onChange={(e) => setImageGallary({ ...imageGallary, title: e.target.value })}
              />
            </FloatingLabel>

            {/* Image Description */}
            <FloatingLabel controlId="floatingInput2" label="Image Description" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={imageGallary.description}
                onChange={(e) => setImageGallary({ ...imageGallary, description: e.target.value })}
              />
            </FloatingLabel>

            {/* Image Upload */}
            <FloatingLabel controlId="floatingInput3" label="Upload Image" className="mb-3">
              <Form.Control
                type="file"
                placeholder="Upload Image"
                onChange={(e) => setImageGallary({ ...imageGallary, image: e.target.files[0] })}
                accept="image/*"
              />
            </FloatingLabel>
            {fileStatus && (
              <div className="mt-3 text-danger">
                Please upload valid file extensions (jpeg/png/jpg)
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}

export default ImageGallery;
