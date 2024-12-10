import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import './MyProfile.css'; // Add custom CSS
import { UserAPI } from '../Services/allAPI';
import Header2 from './Header2';

function MyProfile() {
  const [user, setUser] = useState({})
  const userId = sessionStorage.getItem("userId");
  
const getUser=async()=>{
    const result=await UserAPI(userId)
    if(result.status==200){
        setUser(result.data)
        console.log(user);
        
    }else{
      console.log(result);
      
    }
  
  }
  useEffect(()=>{
    getUser()
  },[userId])

  return (
    <>
    <Header2/>
    <Container className="profile-container  " style={{height:"650px"}}>
      <Row className="justify-content-center">
       

        <Col md={6}>
        
            <Card.Header className="text-primary">
              <h4>My Profile</h4>
            </Card.Header>
            {user?.length>0?user.map((users)=>(<Card className="shadow-sm">
            <Card.Body>
              <Form>
                
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="text"
                    value={users.username}
                    // onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="rounded-pill"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={users.email}
                    // onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    value={users.phoneno}
                    // onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="rounded-pill"
                  />
                </Form.Group>

              
              </Form>
            </Card.Body>
          </Card>)):<p>No User Found...</p>}
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MyProfile;
