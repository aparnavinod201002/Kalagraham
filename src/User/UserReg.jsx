import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterAPI } from '../Services/allAPI';

function UserReg() {
  const [userData, setUserData] = useState({
    username: '',
    phoneno: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); 

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name} is required`;
    } else {
      if (name === 'phoneno' && !/^\d{10}$/.test(value)) {
        error = 'Phone number must be 10 digits';
      }
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email format';
      }
      if (name === 'password' && value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateField(name, value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, phoneno, email, password, role } = userData;

    if (Object.values(userData).some((field) => field === '') || Object.values(errors).some((error) => error)) {
      toast.info('Please fix all errors before submitting');
      return;
    }

    try {
      const result = await RegisterAPI(userData);
      if (result.status === 200) {
        toast.success('User has successfully registered');
        navigate('/login');
        setUserData({ username: '', phoneno: '', email: '', password: '', role: 'user' });
      } else {
        toast.warning(result.response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <div
        style={{
          backgroundImage: `url("")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container w-75 bg-primary">
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bolder' }} className="text-warning">
            <i className="fa-solid fa-arrow-left"></i> Back To Home
          </Link>
          <div className="card shadow p-3 bg-transparent">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img
                  src="https://i.pinimg.com/originals/1e/46/82/1e46824815d0e608bbc22fc3d6975b09.jpg"
                  alt=""
                  width="80%"
                />
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <h1 className="fw-bolder text-warning mt-2">
                    <i className="fa-solid fa-dance me-2"></i>KALAGRAHAM
                  </h1>
                  <h5 className="fw-bolder text-warning">Sign up to your account</h5>
                  <Form className="mt-4 text-dark" onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Control
                        size="lg"
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={userData.username}
                        placeholder="Enter UserName"
                      />
                      {errors.username && <small className="text-danger">{errors.username}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneno">
                      <Form.Control
                        size="lg"
                        type="text"
                        name="phoneno"
                        onChange={handleInputChange}
                        value={userData.phoneno}
                        placeholder="Phone Number"
                      />
                      {errors.phoneno && <small className="text-danger">{errors.phoneno}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        size="lg"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={userData.email}
                        placeholder="Enter Your Email"
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        size="lg"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={userData.password}
                        placeholder="Enter Your Password"
                      />
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </Form.Group>
                    <div className="mt-3">
                      <button className="btn btn-warning" type="submit">
                        Register
                      </button>
                    </div>
                    
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
}

export default UserReg;
