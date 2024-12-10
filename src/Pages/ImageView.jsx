
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
   
    import { server_url } from '../Services/server_url';
import { useParams } from 'react-router-dom';
import { ImageGallaryGetAPI } from '../Services/allAPI';
    
    function ImageView() {
      
      
      
    //get carnival
    const { userId } = useParams();
    const [imageGallaryGet,setImageGallaryGet]=useState([])
    const getImageGallary=async()=>{
      const result=await ImageGallaryGetAPI(userId)
      if(result.status==200){
        setImageGallaryGet(result.data)
      }else{
        console.log(result);
        
      }
    
    }
    useEffect(()=>{
      getImageGallary ()
    },[])
    
      return (
        <>
          <Header />
          <Container>
            {/* Title Section */}
            <h3 className="text-warning text-center my-5" style={{ fontSize: '50px',textShadow:"2px 4px 6px grey" }}>
              Images Gallery
            </h3>
    
           
            <Row>
              
                <Col md={4} sm={6} xs={12} className="mb-4" >
                {imageGallaryGet?.length>0?imageGallaryGet.map((imagegallaryGet) => (
                  <Card className="shadow-sm h-100">
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
                        <h2><strong style={{color:"brown"}}>Title: {imagegallaryGet.title} </strong></h2>
                        <strong className='text-warning'>Description: {imagegallaryGet.description}</strong> 
                      </Card.Text>
                    </Card.Body>
                  </Card>
                    )):<p>Not Found</p>
                  }
                </Col>
            
              
             
            </Row>
          </Container>
    
          <ToastContainer autoClose={2000} position="top-center" theme="colored" />
        </>
      );
    }
    
    export default ImageView;
    