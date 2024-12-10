import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { DeleteDistrictAPI, DistrictAPI, DistrictRegAPI } from '../Services/allAPI';
function District() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    DistrictGet()
  },[])
  const [district,setDistrict]=useState({name:""})
const navigate =useNavigate()
const handleRegister=async(e)=>{
  e.preventDefault()
 
 const {name} = district
 console.log(district);
 
 if(!name){
  toast.info("Please Fill Missing Fields")
 }
 else{
  try{
      const result= await DistrictRegAPI(district)
      if(result.status == 200){
        handleClose()
          toast.success(`District has successfully registered`)
          DistrictGet()
          navigate('/DistrictView')
          setUserData({name:""})
      }else{
          toast.warning("District Already Exists")
          handleClose()
      }
  }catch(err){
      console.log(err);
      
  }
 
 }
}

const [getDistrict,setGetDistrict]=useState([])
  const DistrictGet = async()=>{
    
   
      const reqHeader = {
        "Content-Type":"multipart/form-data"
        
      }
      try{
        const result= await DistrictAPI(reqHeader)
        if(result.status==200){
          setGetDistrict(result.data)
         
        }else{
          console.log(result);
          
        }

        }catch(err){
          console.log(err);
          
        }
      }
      console.log(getDistrict);
      const handleDelete = async (districtId) => {
        try {
          const result = await DeleteDistrictAPI(districtId); // Assume DeleteCarnivalAPI is defined
          if (result.status === 200) {
            DistrictGet()
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
        <h2>District Registration</h2>

        <Link style={{textDecoration:'none' ,fontSize:'25px'}}to={'/Dashboard'}  className='text-info'>Back To Home
<i className='fa-solid fa-arrow-rotate-left fa-beat-fade'></i></Link>      </div>
<button className='btn btn-info m-5 text-align-center ' onClick={handleShow}>Add More Districts +</button>
<table className='table mb-5 container shadow w-100'>
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Delete</th>
          
        </tr>
    </thead>
    <tbody>
      {
        getDistrict?.length>0?getDistrict.map((district,index)=>( 
        

          
          <tr>
          <td>{index+1}</td>
          
          <td>{district.name}</td>
          <td><button className='btn'  onClick={() => handleDelete(district._id)}  ><i className='fa-solid fa-trash text-danger'></i></button></td>
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
        <FloatingLabel
        controlId="floatingInput"
        label="District Name"
        className="mb-3"
      >
        <Form.Control type="text" onChange={e=>setDistrict({name:e.target.value})} placeholder="District Name" />
      </FloatingLabel>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegister} >Save </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
    </>
  )
}

export default District
