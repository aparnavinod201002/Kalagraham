
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
    import Header from '../Components/Header';
    import { useNavigate } from 'react-router-dom';
    import { VideoGallaryGetAPI, VideoGalleryRegAPI } from '../Services/allAPI';
    import { server_url } from '../Services/server_url';
    
    function VideoView() {
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
              handleClose();
              toast.success('Image Gallery successfully registered');
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
    
      return (
        <>
          <Header />
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
                        <h2><strong style={{color:"brown"}}>Title: {videoGallaryGet.title} </strong></h2>
                       <h4><strong className='text-warning'>Description: {videoGallaryGet.description}</strong> </h4> 
                        <h4><strong className='text-warning'>Video URL: {videoGallaryGet.url}</strong> </h4>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                 
                </Col>
               )):<p>Not Found</p>
            }
              
             
            </Row>
          </Container>
    
         
          <ToastContainer autoClose={2000} position="top-center" theme="colored" />
        </>
      );
    }
    
    export default VideoView
    