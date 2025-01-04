import React, { useEffect,useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterAPI } from '../Services/allAPI';

function ArtistReg() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    phoneno: '',
    email: '',
    password: '',
    role: 'artist',
  });

  const [errors, setErrors] = useState({});

  // Function to validate fields dynamically
  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value) error = 'Username is required.';
        break;
      case 'phoneno':
        if (!value) error = 'Phone number is required.';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits.';
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = 'Invalid email format.';
        break;
      case 'password':
        if (!value) error = 'Password is required.';
        else if (value.length < 6) error = 'Password must be at least 6 characters.';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validate(name, value); // Validate the field on change
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, phoneno, email, password, role } = userData;

    // Validate all fields before submission
    if (!username || !phoneno || !email || !password || !role) {
      toast.info('Please fill all required fields.');
      return;
    }
    if (Object.values(errors).some((err) => err)) {
      toast.error('Please fix validation errors before submitting.');
      return;
    }

    try {
      const result = await RegisterAPI(userData);
      if (result.status === 200) {
        toast.success('Artist has successfully registered');
        navigate('/login');
        setUserData({ username: '', phoneno: '', email: '', password: '', role: 'artist' });
      } else {
        toast.warning(result.response);
      }
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while registering.');
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

                  <Form className="mt-4 text-dark">
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Control
                        size="lg"
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={userData.username}
                        placeholder="Enter Username"
                      />
                      {errors.username && <span className="text-danger">{errors.username}</span>}
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
                      {errors.phoneno && <span className="text-danger">{errors.phoneno}</span>}
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
                      {errors.email && <span className="text-danger">{errors.email}</span>}
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
                      {errors.password && <span className="text-danger">{errors.password}</span>}
                    </Form.Group>

                    <div className="mt-3">
                      <button className="btn btn-warning" onClick={handleRegister}>
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

export default ArtistReg;
