import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton, FloatingLabel, Form, Modal } from "react-bootstrap";
import { CategoryAPI, getSubCategoryByCategoryAPI, RequestAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Carnival({ carnival }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [selectedCategoryname, setSelectedCategoryname] = useState("");
  const [selectedSubCategoryname, setSelectedSubCategoryname] = useState("");
  const [selectedCarnival, setSelectedCarnival] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  // Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = (carnival) => {
    setSelectedCarnival(carnival);
    setShow(true);
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

  // Handle request submission
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
      locationName:selectedCarnival?.locationname,
      districtName:selectedCarnival?.districtname,
requests:"Pending",
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
        toast.success('Carnival has successfully registered');
       
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
     
      toast.error("An error occurred while submitting the request.");
    }
  };
  //
  
  
  return (
    <>
      <Container>
        <Row>
          {carnival.map((carnival, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="bg-transparent text-danger">
                <Card.Img
                  variant="top"
                  src={`${server_url}/uploads/${carnival?.carnivalImage}`}
                  style={{ width: "100%", height: "300%px" }}
                  alt={carnival.title}
                />
                <Card.Body>
                  <Card.Title>{carnival.carnivalname}</Card.Title>
                  <Card.Text> <strong>Description:</strong> {carnival.description}</Card.Text>
                  <Card.Text>
                    <strong>Start Date:</strong> {new Date(carnival.startdate).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>End Date:</strong> {new Date(carnival.enddate).toLocaleDateString()}
                  </Card.Text>
                  
                  <Card.Text>
                    <strong>Location:</strong> {carnival.locationname}
                  </Card.Text>
                
                  <Button variant="warning" onClick={() => handleShow(carnival)}>
                    Send Request
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

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
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
  
    </>
  );
}

export default Carnival;
