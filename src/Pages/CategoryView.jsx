import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import {  CategoryAPI, CategoryRegAPI, DeleteCategoryAPI } from '../Services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
function CategoryView() {
  
      const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
useEffect(()=>{
  CategoryGet()
},[])
const [category,setCategory]=useState({name:""})
const navigate =useNavigate()
const handleRegister=async(e)=>{
e.preventDefault()

const {name} = category
console.log(category);

if(!name){
toast.info("Please Fill Missing Fields")
}
else{
try{
    const result= await CategoryRegAPI(category)
    if(result.status == 200){
      handleClose()
        toast.success(`Category has successfully registered`)
         CategoryGet()
        navigate('/CategoryView')
        setCategory({name:""})
    }else{
        toast.warning("Category Already Exists...")
        handleClose()
    }
}catch(err){
    console.log(err);
    
}

}
}

const [getCategory,setGetCategory]=useState([])
const CategoryGet = async()=>{
  
 
    const reqHeader = {
      "Content-Type":"multipart/form-data"
      
    }
    try{
      const result= await CategoryAPI(reqHeader)
      if(result.status==200){
        setGetCategory(result.data)
        console.log(getCategory);
       
      }else{
        console.log(result);
        
      }

      }catch(err){
        console.log(err);
       
      }
    }
    const handleDelete = async (categoryId) => {
      try {
        const result = await DeleteCategoryAPI(categoryId); // Assume DeleteCarnivalAPI is defined
        if (result.status === 200) {
          CategoryGet()
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
      <h2>Category Registration</h2>

      <Link style={{textDecoration:'none',fontSize:'25px'}}to={'/Dashboard'}  className='text-info'>Back To Home
<i className='fa-solid fa-arrow-rotate-left fa-beat-fade'></i></Link>      </div>
<button className='btn btn-info m-5 text-align-center '  onClick={handleShow}>Add More Category +</button>
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
        getCategory?.length>0?getCategory.map((category,index)=>( 
       

          
          <tr>
          <td>{index+1}</td>
          
          <td>{category.name}</td>
          <td><button className='btn'  onClick={() => handleDelete(category._id)} ><i className='fa-solid fa-trash text-danger'></i></button></td>
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
      label="Category Name"
      className="mb-3"
    >
      <Form.Control type="text" placeholder="Category Name"  onChange={e=>setCategory({name:e.target.value})}  />
    </FloatingLabel>
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleRegister}>Save </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
  </>
  )
}

export default CategoryView
