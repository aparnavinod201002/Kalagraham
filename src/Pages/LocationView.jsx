import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { DeleteLocationAPI, DistrictAPI, LocationAPI, LocationRegAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LocationView() {
  const [show, setShow] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [location, setLocation] = useState({ districtname: '', name: '' });
  const [getDistrict, setGetDistrict] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch district list on component mount
  useEffect(()=>{
    LocationGet()
    DistrictGet()
  },[])

  const handleRegister = async (e) => {
    e.preventDefault();
    const { districtname, name } = location;

    if (!districtname || !name) {
      toast.info('Please Fill Missing Fields');
      return;
    }

    try {
      const result = await LocationRegAPI(location);
      if (result.status === 200) {
        handleClose();
        toast.success('Location has successfully registered');
        LocationGet()
        navigate('/LocationView');
        setLocation({ name: '', districtname: '' }); // Reset location state
        setSelectedDistrict('Select District'); // Reset dropdown
      } else {
        toast.warning('Location Already Exists');
        handleClose();
      }
    } catch (err) {
      console.error('Error registering location:', err);
    }
  };
console.log(location);

  const DistrictGet = async () => {
    const reqHeader = { 'Content-Type': 'multipart/form-data' };

    try {
      const result = await DistrictAPI(reqHeader);
      if (result.status === 200) {
        setGetDistrict(result.data);
      } else {
        console.error('Error fetching districts:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDistrictSelect = (districtName) => {
    setSelectedDistrict(districtName);
    setLocation({ ...location, districtname: districtName });
  };

  
const [getLocation,setGetLocation]=useState([])
const LocationGet = async()=>{
  
 
    const reqHeader = {
      "Content-Type":"multipart/form-data"
      
    }
    try{
      const result= await LocationAPI(reqHeader)
      if(result.status==200){
        setGetLocation(result.data)
       
      }else{
        console.log(result);
        
      }

      }catch(err){
        console.log(err);
        
      }
    }
    console.log(getLocation);
    const handleDelete = async (locationId) => {
      try {
        const result = await DeleteLocationAPI(locationId); // Assume DeleteCarnivalAPI is defined
        if (result.status === 200) {
          LocationGet()
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
      <Header />
      <div className="container mt-5 mb-5 d-flex justify-content-between">
        <h2>Location Registration</h2>
        <Link
          style={{ textDecoration: 'none', fontSize: '25px' }}
          to={'/Dashboard'}
          className="text-info"
        >
          Back To Home
          <i className="fa-solid fa-arrow-rotate-left fa-beat-fade"></i>
        </Link>
      </div>
      <button className="btn btn-info m-5 text-align-center" onClick={handleShow}>
        Add More Locations +
      </button>
      <table className="table mb-5 container shadow w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>District Name</th>
            <th>Location Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody> 
           {
        getLocation?.length>0?getLocation.map((location,index)=>( 
        

          
          <tr>
            <td>{index+1}</td>
            <td>{location.districtname}</td>
            <td>{location.name}</td>
            <td>
              <button className="btn" onClick={() => handleDelete(location._id)}>
                <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </td>
          </tr>
        )):<p className='text-danger fw-bolder'>Nothing to Display</p>
      }
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton
            id="district-dropdown"
            title={selectedDistrict}
            variant="secondary"
            className="mb-2"
          >
            {getDistrict?.length > 0 ? (
              getDistrict.map((district) => (
                <Dropdown.Item
                  key={district.id} // Ensure a unique key for each item
                  onClick={() => handleDistrictSelect(district.name)}
                >
                  {district.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No Districts Available</Dropdown.Item>
            )}
          </DropdownButton>
          <FloatingLabel controlId="floatingInput" label="Location Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Location Name"
              value={location.name}
              onChange={(e) => setLocation({ ...location, name: e.target.value })}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}

export default LocationView;
