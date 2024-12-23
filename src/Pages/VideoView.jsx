import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header';
import { VideoGallaryGetAPI } from '../Services/allAPI';
import { server_url } from '../Services/server_url';
import { useParams } from 'react-router-dom';

function VideoView() {
  const { userId } = useParams();
  const [videoGallaryGet, setVideoGallaryGet] = useState([]);

  // Fetch Video Gallery Data
  const getVideoGallary = async () => {
    try {
      const result = await VideoGallaryGetAPI(userId);
      if (result.status === 200) {
        setVideoGallaryGet(result.data);
      } else {
        console.error('Error fetching video gallery:', result);
      }
    } catch (error) {
      console.error('Error fetching video gallery:', error);
    }
  };

  useEffect(() => {
    getVideoGallary();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {/* Title Section */}
        <h3
          className="text-warning text-center my-5"
          style={{ fontSize: '50px', textShadow: '2px 4px 6px grey' }}
        >
          Video Gallery
        </h3>

        <Row>
          {videoGallaryGet?.length > 0 ? (
            videoGallaryGet.map((video) => (
              <Col xs={12} className="mb-4" key={video.id}>
                <Card className="shadow-sm h-100">
                  <Row noGutters>
                    <Col md={6}>
                      <Card.Img
                        variant="top"
                        src={`${server_url}/uploads/${video?.coverimage}`}
                        style={{
                          height: '600px',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Card.Body>
                        <Card.Text>
                          <h2 className="text-center">
                            <strong style={{ color: 'brown' }}>
                              {video.title}
                            </strong>
                          </h2>
                          <p className="text-warning text-center">
                            <strong>Description: {video.description}</strong>
                          </p>
                          <p className="text-warning text-center">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-warning"
                              style={{ textDecoration: 'none' }}
                            >
                              Watch Video
                            </a>
                          </p>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No Videos Found</p>
          )}
        </Row>
      </Container>

      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}

export default VideoView;
