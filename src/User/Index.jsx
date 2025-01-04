import React, { useEffect, useState } from 'react';
import { server_url } from "../Services/server_url";
import { Card, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { CarnivalGetAPI, DistrictAPI, getDistLocAPI, getLocationsByDistrictAPI, TestimonyAPI } from '../Services/allAPI';
import Header2 from '../Components/Header2';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Index() {
  const [username, setUsername] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [carnival, setCarnival] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);
const [feedback, setFeedback] = useState('');
  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setUsername(sessionStorage.getItem('username'));
    }
    getCarnival();
    getDistricts();
  }, []);

  // Fetch carnival data
  const getCarnival = async () => {
    try {
      const result = await CarnivalGetAPI();
      if (result.status === 200) {
        setCarnival(result.data);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error('Error fetching carnivals:', error);
    }
  };

  // Fetch districts
  const getDistricts = async () => {
    try {
      const result = await DistrictAPI();
      if (result.status === 200) {
        setDistricts(result.data);
      } else {
        console.error('Error fetching districts:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch locations by district
  const getLocations = async (districtName) => {
    try {
      const result = await getLocationsByDistrictAPI(districtName);
      if (result.status === 200) {
        setLocations(result.data);
      } else {
        console.error('Error fetching locations:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDistrictSelect = (districtName) => {
    setSelectedDistrict(districtName);
    setSelectedLocation('Select Location');
    getLocations(districtName);
  };

  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName);
  };

  const getcarnivalbylocation = async (selectedLocation) => {
    try {
      const result = await getDistLocAPI(selectedLocation);
      if (result.status === 200) {
        setCarnival(result.data);
      } else {
        console.error('Error fetching carnivals:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const storeId = async (id) => {
    sessionStorage.setItem("carnivalId", id);
    console.log(`Stored Carnival ID: ${id}`);
  };

  // Function to check if the carnival is live
  const isCarnivalLive = (startDate, endDate) => {
    const currentDate = new Date();
    return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
  };
  
    // Handle feedback submission
    const handleRegister = async (e) => {
      e.preventDefault();
  
      if (!feedback) {
        toast.info("Please provide your feedback!");
      } else {
        const feedbackData = {
          username,
          feedback
        };
  
        try {
          // Assuming you have an API endpoint to handle feedback submission
          const result = await TestimonyAPI(feedbackData);
          if (result.status === 200) {
            toast.success("Feedback successfully submitted!");
            setFeedback(''); // Clear the feedback input after submission
          } else {
            toast.warning("Error submitting feedback. Please try again.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  

  return (
    <>
      <Header2 />

      {/* Main Section */}
      <div
        className="d-flex flex-column align-items-center"
        style={{
          minHeight: 'calc(100vh - 100px)',
          background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
          padding: '30px 15px',
        }}
      >
        <h1 style={{ color: 'black', textShadow: "2px 4px 6px black" }} className='m-2 mb-5 m-5'>
          Hello <span className='text-primary'>{username}</span>, <br></br>Explore Live Carnivals Around You
        </h1>

        {/* Live Carnivals Section */}
        <div className="w-100 mb-5">
        
          <Row>
            {carnival.length > 0 ? carnival.map((carnival) => {
              if (isCarnivalLive(carnival.startdate, carnival.enddate)) {
                return (
                  <Col md={4} key={carnival._id} className="mb-4">
                    <Card style={{ backgroundColor: "white", boxShadow: "2px 4px 6px grey" }}>
                      <a href="ViewmoreCarnival">
                        <Card.Img
                          variant="top"
                          src={`${server_url}/uploads/${carnival.carnivalImage}`}
                          style={{ width: "100%", height: "500px" }}
                          onClick={() => storeId(carnival._id)}
                          alt={carnival.title}
                        />
                      </a>
                      <Card.Body>
                        <Card.Title className='text-primary'>{carnival.carnivalname}</Card.Title>
                        <Card.Text className='text-secondary'><strong>Start Date:</strong> {new Date(carnival.startdate).toLocaleDateString()}</Card.Text>
                        <Card.Text className='text-secondary'><strong>End Date:</strong> {new Date(carnival.enddate).toLocaleDateString()}</Card.Text>
                        <Card.Text className='text-secondary'><strong>Location:</strong> {carnival.locationname}, {carnival.districtname}</Card.Text>
                        <Card.Text className='text-secondary'>{carnival.description}</Card.Text>
                        <Card.Text className='text-success'><strong>Status: </strong>{isCarnivalLive(carnival.startdate, carnival.enddate) ? "Live" : "Upcoming"}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            }) : <p className='text-danger'>No Live Carnivals</p>}
          </Row>
        </div>

        {/* Search Card */}
        <div
          className="card shadow-lg p-4 w-75"
          style={{
            maxWidth: '600px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <h3 className="text-center mb-4" style={{ fontWeight: '600', color: '#343a40' }}>
            <FaSearch className="me-2" /> Search Carnivals by Location
          </h3>

          <div className="mb-3">
            <label className="form-label" htmlFor="district-dropdown">
              <FaMapMarkerAlt className="me-1 text-secondary" />
              Select District
            </label>
            <DropdownButton
              id="district-dropdown"
              title={selectedDistrict}
              variant="outline-secondary"
              onSelect={handleDistrictSelect}
              className="w-100"
            >
              {districts.length > 0 ? (
                districts.map((district) => (
                  <Dropdown.Item key={district.id} eventKey={district.name}>
                    {district.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No Districts Available</Dropdown.Item>
              )}
            </DropdownButton>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="location-dropdown">
              <FaMapMarkerAlt className="me-1 text-secondary" />
              Select Location
            </label>
            <DropdownButton
              id="location-dropdown"
              title={selectedLocation}
              variant="outline-secondary"
              onSelect={handleLocationSelect}
              className="w-100"
            >
              {locations.length > 0 ? (
                locations.map((location) => (
                  <Dropdown.Item key={location.id} eventKey={location.name}>
                    {location.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No Locations Available</Dropdown.Item>
              )}
            </DropdownButton>
          </div>

          <button
            className="btn btn-primary w-100 fw-bold mt-3"
            style={{ fontSize: '16px' }}
            onClick={() => getcarnivalbylocation(selectedLocation)}>
            <FaSearch className="me-2" /> Search
          </button>
        </div>

        {/* Carnival Display */}
        <div className="mt-5 w-100">
          <Row>
            {carnival.length > 0 ? carnival.map((carnival) => (
              <Col md={4} key={carnival._id} className="mb-4">
                <Card style={{ backgroundColor: "white", boxShadow: "2px 4px 6px grey" }}>
                  <a href="ViewmoreCarnival">
                    <Card.Img
                      variant="top"
                      src={`${server_url}/uploads/${carnival.carnivalImage}`}
                      style={{ width: "100%", height: "500px" }}
                      onClick={() => storeId(carnival._id)}
                      alt={carnival.title}
                    />
                  </a>
                  <Card.Body>
                    <Card.Title className='text-primary'>{carnival.carnivalname}</Card.Title>
                    <Card.Text className='text-secondary'><strong>Start Date:</strong> {new Date(carnival.startdate).toLocaleDateString()}</Card.Text>
                    <Card.Text className='text-secondary'><strong>End Date:</strong> {new Date(carnival.enddate).toLocaleDateString()}</Card.Text>
                    <Card.Text className='text-secondary'><strong>Location:</strong> {carnival.locationname}, {carnival.districtname}</Card.Text>
                    <Card.Text className='text-secondary'>{carnival.description}</Card.Text>
                    <Card.Text className='text-success'><strong>Status: </strong>{isCarnivalLive(carnival.startdate, carnival.enddate) ? "Live" : "Upcoming"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )) : <p>No Carnivals Found</p>}
          </Row>
        </div>
        <div className="card m-5 card-light p-4 shadow-lg w-50" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
          <h3 className="text-center mb-4" style={{ fontWeight: '600', color: '#343a40' }}>
            Give Your Feedback
          </h3>
          <textarea
            className="form-control"
            placeholder="Enter details about Kalagraham here..."
            rows="5"
            style={{ resize: 'none', fontSize: '16px', padding: '10px' }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className='btn btn-primary m-3' onClick={handleRegister}>
            Send Feedback
          </button>
        </div>

      </div>

      <Footer />
      <ToastContainer autoClose = {2000}
            position = 'top-center' theme='colored'/>
    </>
  );
}

export default Index;
