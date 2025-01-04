import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import { CarnivalGetAPI, CarnivalRegAPI, DeleteCarnivalAPI, DistrictAPI, getLocationsByDistrictAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server_url } from '../Services/server_url';
function CarnivalView() {
  const [carnival,setCarnival]=useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedDistrict, setSelectedDistrict] = useState('Select District');
const navigate=useNavigate()
  const handleSelect = (eventKey) => {
    setSelectedDistrict(eventKey);
  };
  const [selectedlocation, setSelectedlocation] = useState('Select location');

  const handleSelects = (eventKey) => {
    setSelectedlocation(eventKey);
  };

// carnival add

const [carnivalData,setCarnivalData]=useState({
  carnivalName:"",districtname:"",locationname:"",startDate:"",endDate:"",description:"",carnivalImage:"",time:"",amount:""
})
const [fileStatus,setFileStatus]=useState(false)
const [preview,setPreview]=useState("")

useEffect(()=>{
  if(carnivalData.carnivalImage.type=='image/png' || carnivalData.carnivalImage.type=='image/jpeg' || carnivalData.carnivalImage.type=='image/jpg')
  {
    console.log("Generate URL");
    setPreview(URL.createObjectURL(carnivalData.carnivalImage))
    setFileStatus(false)
    
  }else{
    console.log("Please provide following extensions");
    setFileStatus(true)
    setCarnivalData({ carnivalName:"",districtname:"",locationname:"",startDate:"",endDate:"",description:"",carnivalImage:"",time:"",amount:""})
  }
},[carnivalData.carnivalImage])

//get district

const handleDistrictSelect = (districtName) => {
 
  setSelectedDistrict(districtName);
  setCarnivalData({ ...carnivalData, districtname: districtName });
  setGetLocation([]);
  setSelectedlocation('Select location');
};

const [getDistrict,setGetDistrict]=useState([])
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

//get location

//get district
const [getLocation,setGetLocation]=useState([])
const handleLocationSelect = (locationname) => {
  setSelectedlocation(locationname);
  setCarnivalData({ ...carnivalData, locationname: locationname });
};


const LocationGet = async () => {
  
  try {
    const result = await getLocationsByDistrictAPI(selectedDistrict);
    if (result.status === 200) {
      setGetLocation(result.data);
      
    } else {
      console.error('Error fetching locations:', result);
    }
  } catch (err) {
    console.error('Error:', err);
  }

};
useEffect(()=>{
  DistrictGet()
 },[])

 useEffect(() => {
  LocationGet(); 
 
}, [selectedDistrict]);

//add carnival


const handleRegister = async (e) => {
  e.preventDefault();
  const {carnivalname,districtname,locationname,startDate,endDate,description,carnivalImage,time,amount} = carnivalData;

  if (!carnivalname,!districtname,!locationname,!startDate,!endDate,!description,!carnivalImage,!time,!amount) {
    toast.info('Please Fill Missing Fields');
  }
    else{
      const reqBody = new FormData()
   
     reqBody.append("carnivalname",carnivalname)
     reqBody.append("districtname",districtname)
     reqBody.append("locationname",locationname)
     reqBody.append("startdate",startDate)
     reqBody.append("enddate",endDate)
     reqBody.append("description",description)
     reqBody.append("carnivalImage",carnivalImage)
     reqBody.append("time",time)
     reqBody.append("amount",amount)
   
   const reqHeader={
     // reqHeader "Content-Type":"multipart/form-data"
   "content-Type":"multipart/form-data"
   
   }
   //api call

  try {
    const result = await CarnivalRegAPI(reqBody,reqHeader);
    if (result.status === 200) {
      handleClose();
      toast.success('Carnival has successfully registered');
      getCarnival()

      navigate('/CarnivalView');
      setCarnivalData({ carnivalname:"",districtname:"",locationname:"",startDate:"",endDate:"",description:"",carnivalImage:"",time:"",amount:""}); // Reset location state
      setSelectedDistrict('Select District'); 
      setSelectedlocation('Select Location'); // Reset dropdown
    } else {
      toast.warning('Carnival Already Exists');
      handleClose();
     
    }
  } catch (err) {
    console.error('Error registering location:', err);
  }

}

};
//get carnival

const getCarnival=async()=>{
  const result=await CarnivalGetAPI()
  if(result.status==200){
    setCarnival(result.data)
  }else{
    console.log(result);
    
  }

}
useEffect(()=>{
  getCarnival()
},[])
const handleDelete = async (carnivalId) => {
  try {
    const result = await DeleteCarnivalAPI(carnivalId); // Assume DeleteCarnivalAPI is defined
    if (result.status === 200) {
      getCarnival()
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
      <Header/>
         <div className='container mt-5 mb-5 d-flex justify-content-between'>
          <h2 className='text-primary'>Carnival Registration</h2>
    
          <Link style={{textDecoration:'none' ,fontSize:'25px'}}to={'/Dashboard'}  className='text-primary'>Back To Home
    <i className='fa-solid fa-arrow-rotate-left fa-beat-fade'></i></Link>      </div>
    <button className='btn btn-primary m-5 text-align-center ' onClick={handleShow}>Add More Carnival +</button>
    <table className='table mb-5 container shadow w-100'>
      <thead>
          <tr>
              <th>#</th>
              <th>Carnival Name</th>
              <th>District Name</th>
              <th>Location Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Image</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Delete</th>
            
          </tr>
      </thead>
      <tbody>
        {
          carnival?.length>0?carnival.map((carnival,index)=>( 
           
            <tr >
            <td>{index+1}</td>
            <td>{carnival.carnivalname}</td>
            <td>{carnival.districtname}</td>
            <td>{carnival.locationname}</td>
            <td>{new Date(carnival.startdate).toLocaleDateString()}</td>
            <td>{new Date(carnival.startdate).toLocaleDateString()}</td>
            <td>{carnival.description}</td>
            <td><img src={`${server_url}/uploads/${carnival?.carnivalImage}`} style={{width:"50px",height:"50px"}} alt="" /></td>
            <td>{carnival.time}</td>
            <td>{carnival.amount}</td>
            <td><button className='btn'  onClick={() => handleDelete(carnival._id)} ><i className='fa-solid fa-trash text-danger'></i></button></td>
            </tr>
           
       
         )):<p className='text-danger fw-bolder'>Nothing to Display</p>
        } 
      
      </tbody>
    </table>
    
    
    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
       <Modal.Body>
<div className='row'>
  <div className='col-6'>
    <label>
    <input type='file' style={{display:"none"}} onChange={e=>setCarnivalData({...carnivalData,carnivalImage:e.target.files[0]})}  />
    <img height={"200px"} width={"100%"} src={preview?preview:'https://media.istockphoto.com/id/1643476223/photo/bharatanatyam-pose.jpg?s=612x612&w=0&k=20&c=qPB-16sPQlYuQunVh0DfVoP3qx0Iysa-ypkAG5-GrUw=' }alt=""/>
    </label>
    {fileStatus&&<div className='=mt-3 text-danger'>Please upload following file extensions (jpeg/png/jpg)</div>}
   </div>
  <div className='col-6'
>
  <Form>
  <FloatingLabel
        controlId="floatingInput1"
        label="Carnival Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Carnival Name"  onChange={e=>setCarnivalData({...carnivalData,carnivalname:e.target.value})} />
      </FloatingLabel>
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
          <DropdownButton
            id="district-dropdown"
            title={selectedlocation}
            variant="secondary"
            className="mb-2"
          >
            {getLocation?.length > 0 ? (
              getLocation.map((location) => (
                <Dropdown.Item
                  key={location.id} // Ensure a unique key for each item
                  onClick={() => handleLocationSelect(location.name)}
                >
                  {location.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No Districts Available</Dropdown.Item>
            )}
          </DropdownButton>

       
      <FloatingLabel
        controlId="floatingInput3"
        label="Start Date"
        className="mb-3"
      >
        <Form.Control type="date" placeholder="Start Date"  onChange={e=>setCarnivalData({...carnivalData,startDate:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput4"
        label="End Date"
        className="mb-3"
      >
        <Form.Control type="date" placeholder="End Date" onChange={e=>setCarnivalData({...carnivalData,endDate:e.target.value})} />
      </FloatingLabel>
     
      <FloatingLabel
        controlId="floatingInput5"
        label="Description"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Description" onChange={e=>setCarnivalData({...carnivalData,description:e.target.value})}/>
      </FloatingLabel>
     
    
      <FloatingLabel
        controlId="floatingInput5"
        label="Time"
        className="mb-3"
      >
        <Form.Control type="time" placeholder="Time"  onChange={e=>setCarnivalData({...carnivalData,time:e.target.value})}/>
      </FloatingLabel>
     
      <FloatingLabel
        controlId="floatingInput5"
        label="Amount"
        className="mb-3"
      >
        <Form.Control type="number" placeholder="Amount" onChange={e=>setCarnivalData({...carnivalData,amount:e.target.value})}/>
      </FloatingLabel>
     
    
  </Form>
  </div>
</div>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegister}  >Add</Button>
        </Modal.Footer>
      </Modal>
    <ToastContainer autoClose={2000} position="top-center" theme="colored" />
  
      </>
      )
    }

export default CarnivalView
