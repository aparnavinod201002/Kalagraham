import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { CategoryAPI, DeleteSubCategoryAPI, SubCategoryAPI, SubCategoryRegAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SubcategoryView() {
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [subCategory, setSubCategory] = useState({ categoryname: '', name: '' });
  const [getCategory, setGetCategory] = useState([]);
  const navigate = useNavigate();


  // Fetch district list on component mount
  useEffect(()=>{
    SubCategoryGet()
    CategoryGet()
  },[])

  const handleRegister = async (e) => {
    e.preventDefault();
    const { categoryname, name } = subCategory;

    if (!categoryname || !name) {
      toast.info('Please Fill Missing Fields');
      return;
    }

    try {
      const result = await SubCategoryRegAPI(subCategory);
      if (result.status === 200) {
        handleClose();
        toast.success('Sub Category has successfully registered');
        SubCategoryGet()
        navigate('/SubcategoryView');
        setSubCategory({ name: '', categoryname: '' }); // Reset location state
        setSelectedDistrict('Select Category'); // Reset dropdown
      } else {
        toast.warning('Sub Category Already Exists');
        handleClose();
      }
    } catch (err) {
      console.error('Error registering Sub Category:', err);
    }
  };
console.log(subCategory);

  const CategoryGet = async () => {
    const reqHeader = { 'Content-Type': 'multipart/form-data' };

    try {
      const result = await CategoryAPI(reqHeader);
      if (result.status === 200) {
        setGetCategory(result.data);
      } else {
        console.error('Error fetching Category:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSubCategory({ ...subCategory, categoryname: categoryName });
  };

  
const [getSubCategory,setGetSubCategory]=useState([])
const SubCategoryGet = async()=>{
  
 
    const reqHeader = {
      "Content-Type":"multipart/form-data"
      
    }
    try{
      const result= await SubCategoryAPI(reqHeader)
      if(result.status==200){
        setGetSubCategory(result.data)
       
      }else{
        console.log(result);
        
      }

      }catch(err){
        console.log(err);
        
      }
    }
    console.log(getSubCategory);
    const handleDelete = async (subcategoryId) => {
      try {
        const result = await DeleteSubCategoryAPI(subcategoryId); // Assume DeleteCarnivalAPI is defined
        if (result.status === 200) {
          SubCategoryGet()
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
        <h2>SubCategory Registration</h2>
  
        <Link style={{textDecoration:'none',fontSize:'25px'}}to={'/Dashboard'} className='text-info'>Back To Home
  <i className='fa-solid fa-arrow-rotate-left fa-beat-fade'></i></Link>      </div>
  <button className='btn btn-info m-5 text-align-center ' onClick={handleShow}>Add More SubCategory +</button>
  <table className='table mb-5 container shadow w-100'>
    <thead>
        <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>SubCategory Name</th>
            <th>Delete</th>
          
        </tr>
    </thead>
    <tbody>
    {
        getSubCategory?.length>0?getSubCategory.map((subCategory,index)=>( 
          <tr >
          <td>{index+1}</td>
          <td>{subCategory.categoryname}</td>
          <td>{subCategory.name}</td>
          <td><button className='btn' onClick={() => handleDelete(subCategory._id)} ><i className='fa-solid fa-trash text-danger'></i></button></td>
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
        <DropdownButton
        id="district-dropdown"
        title={selectedCategory}
        variant="secondary"
       placeholder="---select Category---" class='form-control' className='mb-2'
      >
        {getCategory?.length > 0 ? (
              getCategory.map((category) => (
                <Dropdown.Item
                  key={category.id} 
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No Categories Available</Dropdown.Item>
            )}
          </DropdownButton>
        <FloatingLabel
        controlId="floatingInput"
        label="Category Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="SubCategory Name"  onChange={(e) => setSubCategory({ ...subCategory, name: e.target.value })} />
      </FloatingLabel>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary"  onClick={handleRegister} >Save </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  )
  }

export default SubcategoryView
