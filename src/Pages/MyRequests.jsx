import React, { useEffect, useState } from 'react';
import Header1 from '../Components/Header1';
import { Card, Col, Row } from 'react-bootstrap';
import { DeleteRequestAPI, RequestGetAPI } from '../Services/allAPI';
import './MyRequests.css';

function MyRequests() {
  // Get user ID and request data
  const userId = sessionStorage.getItem("userId");
  const [request, setRequest] = useState([]);
  
  const getRequest = async () => {
    const result = await RequestGetAPI(userId);
    if (result.status === 200) {
      setRequest(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  // Handle deletion of a request
  const handleDelete = async (requestId) => {
    try {
      const result = await DeleteRequestAPI(requestId);
      if (result.status === 200) {
        getRequest();  // Refresh the requests list
      } else {
        console.error('Error deleting request:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-light">
      <Header1 />

      <h2 className="text-primary m-5" style={{ textAlign: "center", fontSize: "40px", textShadow: "2px 4px 6px black" }}><b>Requests</b></h2>

      <Row>
        {
          request?.length > 0 ? (
            request.map((requests) => (
              <Col md={4} sm={6} xs={12} key={requests._id} className="mb-4">
                <div className="d-flex flex-column align-items-center">
                  <Card
                    style={{
                      backgroundImage: "url('https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/q/d/q/small-spos8912-poster-bharatnatyam-classical-dance-digital-art-original-imaghs5mufbgkaj8.jpeg?q=90&crop=false')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100%',
                    }}
                    className="m-5"
                  >
                    <Card.Body>
                      <Card.Title className='text-primary' style={{ fontSize: "30px", textAlign: 'center' }}> 
                        <b>{requests.carnivalName}</b>
                      </Card.Title>

                      <div className="carnival-details-container">
                        <p className="details text-light m-3">
                          <b>
                            The event will begin on <span>{new Date(requests.startDate).toLocaleDateString()}</span> and end on <span>{new Date(requests.endDate).toLocaleDateString()}</span>.
                            It will take place in <span>{requests.location}, {requests.districtName}</span>.
                            The event falls under the <span>{requests.categoryName}</span> category, specifically focusing on the <span>{requests.subCategoryName}</span> sub-category.
                          </b>
                        </p>
                        <div className="status-pending text-light">
                          Request Status: <span className="text-light"><b>{requests.requests}</b></span>
                        </div>
                        <div className="status-pending text-light">
                          Allotted Date: <span className="text-light"><b>{new Date(requests.date).toLocaleDateString()}</b></span>
                        </div>

                        <button className="btn mt-3" onClick={() => handleDelete(requests._id)}>
                          <i className="fa-solid fa-trash text-danger" ></i>
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center text-white">Not Found</p>
          )
        }
      </Row>
    </div>
  );
}

export default MyRequests;
