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
  // Get carnival
  const { userId } = useParams();
  const [imageGallaryGet, setImageGallaryGet] = useState([]);

  const getImageGallary = async () => {
    const result = await ImageGallaryGetAPI(userId);
    if (result.status === 200) {
      setImageGallaryGet(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getImageGallary();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {/* Title Section */}
        <h3
          className="text-primary text-center my-5"
          style={{ fontSize: '50px', textShadow: '2px 4px 6px grey' }}
        >
          Images Gallery
        </h3>

        <Row>
          {imageGallaryGet?.length > 0 ? (
            imageGallaryGet.map((imagegallaryGet) => (
              <Col xs={12} className="mb-4" key={imagegallaryGet.id}>
                <Card className="shadow-sm h-100">
                  <Row noGutters>
                    <Col md={6}>
                      <Card.Img
                        variant="top"
                        src={`${server_url}/uploads/${imagegallaryGet?.image}`}
                        style={{
                          height: '600px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Card.Body>
                        <Card.Text>
                          <h2 className="text-center text-primary">
                            <strong >
                               {imagegallaryGet.title}
                            </strong>
                          </h2>
                          <p className="text-secondary text-center">
                            <strong>Description: {imagegallaryGet.description}</strong>
                          </p>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <p>Not Found</p>
          )}
        </Row>
      </Container>

      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}

export default ImageView;
