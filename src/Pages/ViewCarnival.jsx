import React, { useEffect, useState } from 'react';
import Carnival from '../Components/Carnival';
import { Button, Card, Col, Dropdown, DropdownButton, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import Header1 from '../Components/Header1';
import Footer from '../Components/Footer';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { CarnivalGetAPI, CategoryAPI, DistrictAPI, getDistLocAPI, getLocationsByDistrictAPI, getSubCategoryByCategoryAPI, RequestAPI, TestimonyAPI } from '../Services/allAPI';
import { server_url } from '../Services/server_url';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import { useNavigate } from 'react-router-dom';

function ViewCarnival() {
  const [username, setUsername] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [carnival, setCarnival] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [feedback, setFeedback] = useState('');
const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [selectedCategoryname, setSelectedCategoryname] = useState("");
  const [selectedSubCategoryname, setSelectedSubCategoryname] = useState("");
  const [selectedCarnival, setSelectedCarnival] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const userId = sessionStorage.getItem("userId");
  
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (carnival) => {
    setSelectedCarnival(carnival);
    setShow(true);
  };
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

  const isCarnivalLive = (startDate, endDate) => {
    const currentDate = new Date();
    return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
  };
  // Separate live and upcoming carnivals
  const liveCarnivals = carnival.filter((carnival) => isCarnivalLive(carnival.startdate, carnival.enddate));

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
    setSelectedLocation('Select Location'); // Reset location when district changes
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
        console.error('Error fetching locations:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // Fetch categories
  const getCategory = async () => {
    try {
      const result = await CategoryAPI();
      if (result.status === 200) {
        setCategory(result.data);
      } else {
        console.error("Error fetching categories:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch subcategories by category
  const getSubCategory = async (Categoryname) => {
    try {
      const result = await getSubCategoryByCategoryAPI(Categoryname);
      if (result.status === 200) {
        setSubCategory(result.data);
      } else {
        console.error("Error fetching subcategories:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    getCategory();
  }, []);

  // Fetch subcategories when the selected category changes
  useEffect(() => {
    if (selectedCategoryname) {
      getSubCategory(selectedCategoryname);
    }
  }, [selectedCategoryname]);

  // Handle category selection
  const handleCategorySelect = (Categoryname) => {
    setSelectedCategoryname(Categoryname);
    setSubCategory([]);
    setSelectedSubCategoryname("");
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (SubCategoryname) => {
    setSelectedSubCategoryname(SubCategoryname);
  };


const handleRequestSubmit = async () => {
    if (!userId) {
      toast.error("User not logged in. Please log in to send a request.");
      return;
    }

    if (!selectedCategoryname || !selectedSubCategoryname || !aboutMe) {
      toast.info("Please fill in all required fields.");
      return;
    }

    const requestData = {
      userId,
      carnivalName: selectedCarnival?.carnivalname,
      startDate: selectedCarnival?.startdate,
      endDate: selectedCarnival?.enddate,
      locationName: selectedCarnival?.locationname,
      districtName: selectedCarnival?.districtname,
      requests: "Pending",
      categoryName: selectedCategoryname,
      subCategoryName: selectedSubCategoryname,
      aboutMe,
      description: selectedCarnival?.description,
      username
    };

    console.log(requestData);
    try {
      const result = await RequestAPI(requestData);

      if (result.status === 200) {
        handleClose();
        toast.success('Request has successfully registered');
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
    }
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
      <Header1 />

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
          Hello <span className='text-primary'>{username}</span>, <br />Explore Live Carnivals Around You
        </h1>

        {liveCarnivals.length > 0 && (
          <Col md={12} className="mb-4">
            <Row>
              {liveCarnivals.map((carnival, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="bg-transparent text-danger" style={{ boxShadow: "2px 4px 6px grey" }}>
                    <Card.Img
                      variant="top"
                      src={`${server_url}/uploads/${carnival?.carnivalImage}`}
                      style={{ width: "100%", height: "500px" }}
                      alt={carnival.title}
                    />
                    <Card.Body>
                      <Card.Title className="text-primary">{carnival.carnivalname}</Card.Title>
                      <Card.Text className="text-secondary">
                        <strong>Description:</strong> {carnival.description}
                      </Card.Text>
                      <Card.Text className="text-secondary">
                        <strong className="text-secondary">Start Date:</strong> {new Date(carnival.startdate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text className="text-secondary">
                        <strong>End Date:</strong> {new Date(carnival.enddate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text className="text-secondary">
                        <strong>Location:</strong> {carnival.locationname}
                      </Card.Text>

                      <Button variant="primary" onClick={() => handleShow(carnival)}>
                        Send Request
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        )}

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
            <FaSearch className="me-2" /> Search Carnivals
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
          <Carnival carnival={carnival} />
        </div>


        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCarnival?.carnivalname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <img
                  height="200px"
                  width="100%"
                  src={`${server_url}/uploads/${selectedCarnival?.carnivalImage}`}
                  alt=""
                />
              </div>
              <div className="col-6">
                <Form>
                  <DropdownButton
                    id="category-dropdown"
                    title={selectedCategoryname || "Select Category"}
                    variant="outline-secondary"
                    onSelect={handleCategorySelect}
                    className="mb-3 w-100"
                  >
                    {category.length > 0
                      ? category.map((category) => (
                          <Dropdown.Item key={category.id} eventKey={category.name}>
                            {category.name}
                          </Dropdown.Item>
                        ))
                      : <Dropdown.Item disabled>No Categories Available</Dropdown.Item>}
                  </DropdownButton>

                  <DropdownButton
                    id="subcategory-dropdown"
                    title={selectedSubCategoryname || "Select Sub Category"}
                    variant="outline-secondary"
                    onSelect={handleSubCategorySelect}
                    className="mb-3 w-100"
                  >
                    {subcategory.length > 0
                      ? subcategory.map((subcategory) => (
                          <Dropdown.Item key={subcategory.id} eventKey={subcategory.name}>
                            {subcategory.name}
                          </Dropdown.Item>
                        ))
                      : <Dropdown.Item disabled>No Subcategories Available</Dropdown.Item>}
                  </DropdownButton>

                  <FloatingLabel controlId="aboutMe" label="About Me" className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="About Me .."
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </FloatingLabel>
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRequestSubmit}>
              Send Request
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Feedback Section */}
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
    </>
  );
}

export default ViewCarnival;
