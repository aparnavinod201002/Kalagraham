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
import { DeleteVideoGallaryAPI, VideoGallaryGetAPI, VideoGalleryRegAPI } from '../Services/allAPI';
import { server_url } from '../Services/server_url';

function VideoGallary() {
  
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [videoGallary, setVideoGallary] = useState({
    title: '',
    description: '',
    coverimage: '',
    url:''
  });
  const [fileStatus, setFileStatus] = useState(false);
  const [preview, setPreview] = useState('');
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    if (videoGallary.image) {
      if (
        videoGallary.image.type === 'image/png' ||
        videoGallary.image.type === 'image/jpeg' ||
        videoGallary.image.type === 'image/jpg'
      ) {
        setPreview(URL.createObjectURL(videoGallary.image));
        setFileStatus(false);
      } else {
        console.log('Please provide valid image extensions');
        setFileStatus(true);
        setVideoGallary({ title: '', description: '', coverimage: '',url:'' });
      }
    }
  }, [videoGallary.coverimage]);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const { title, description, coverimage,url } = videoGallary;
  
    if (!title || !description || !coverimage ||!url) {
      toast.info('Please fill in all fields');
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('coverimage', coverimage);
      formData.append('url', url);
      formData.append('userId', userId);
  

      
      const reqHeader={
        // reqHeader "Content-Type":"multipart/form-data"
      "content-Type":"multipart/form-data"
      
      }
      //api call
   
      try {
        const result = await VideoGalleryRegAPI(formData,reqHeader); // Pass only FormData; no need for custom headers.
        if (result.status === 200) {
          getVideoGallary ()
          handleClose();
          toast.success('Video Gallery successfully registered');
          navigate('/VideoGallary');
          setVideoGallary({ title: '', description: '', image: '',url:'' });
        }
      } catch (err) {
        console.error('Error registering video url:', err);
        toast.error('Failed to register video gallery');
      }
    }
  };
  
  
//get carnival

const [videoGallaryGet,setVideoGallaryGet]=useState([])
const getVideoGallary=async()=>{
  const result=await VideoGallaryGetAPI(userId)
  if(result.status==200){
    setVideoGallaryGet(result.data)
  }else{
    console.log(result);
    
  }

}
useEffect(()=>{
  getVideoGallary ()
},[])

const handleDelete = async (videogallaryId) => {
  try {
    const result = await DeleteVideoGallaryAPI(videogallaryId); // Assume DeleteCarnivalAPI is defined
    if (result.status === 200) {
      getVideoGallary ()
    }
        
     else {
      console.error('Error deleting booking:', result);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

  return (
    <>
      <Header1 />
      <Container>
        {/* Title Section */}
        <h3 className="text-warning text-center my-5" style={{ fontSize: '50px',textShadow:"2px 4px 6px grey" }}>
          Video Gallery
        </h3>

       
        <Row>
        {videoGallaryGet?.length>0?videoGallaryGet.map((videoGallaryGet) => (
            <Col md={4} sm={6} xs={12} className="mb-4" >
           
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={`${server_url}/uploads/${videoGallaryGet?.coverimage}`}
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <Card.Body>
                  <Card.Text className="text-center">
                    <h2><strong className='text-warning'> {videoGallaryGet.title} </strong></h2>
                    <h4>
  <a 
    href=" "
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-warning"
    style={{ textDecoration: 'none' }}
  >
    <strong>Description: {videoGallaryGet.description}</strong>
  </a>
</h4>
                    <h4><strong className='text-warning'>Video URL: {videoGallaryGet.url}</strong> </h4>
                   
                  </Card.Text>
                  <button className='btn'  onClick={() => handleDelete(videoGallaryGet._id)} ><i className='fa-solid fa-trash text-danger'></i></button>
                </Card.Body>
              </Card>
             
            </Col>
           )):<p>Not Found</p>
        }
          
          <Col
            md={4}
            sm={6}
            xs={12}
            className="d-flex align-items-center justify-content-center"
          >
            <Button
              className="btn btn-warning shadow"
              style={{ padding: '15px 30px' }}
              onClick={handleShow}
            >
              Add More Video
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Add Image Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Image Title */}
            <FloatingLabel
              controlId="floatingInput1"
              label="Image Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Title"
               
                onChange={(e) =>
                  setVideoGallary({ ...videoGallary, title: e.target.value })
                }
              />
            </FloatingLabel>

            {/* Image Description */}
            <FloatingLabel
              controlId="floatingInput2"
              label="Image Description"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Description"
              
                onChange={(e) =>
                    setVideoGallary({ ...videoGallary, description: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput2"
              label="Image URL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="url"
               
                onChange={(e) =>
                    setVideoGallary({ ...videoGallary, url: e.target.value })
                }
              />
            </FloatingLabel>

            {/* Image Upload */}
            <FloatingLabel controlId="floatingInput3" label="Upload Image" className="mb-3">
              <Form.Control
                type="file"
                placeholder="Upload Image"
                onChange={(e) =>
                    setVideoGallary({ ...videoGallary, coverimage: e.target.files[0] })
                }
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

export default VideoGallary
