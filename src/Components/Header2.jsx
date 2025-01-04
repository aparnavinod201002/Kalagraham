import React, { useState } from 'react';
import { Container, Navbar, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaImage, FaVideo, FaBars } from 'react-icons/fa';

function Header2() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    // Clear session or token (example: localStorage or sessionStorage)
    sessionStorage.clear();
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        className="bg-light shadow-sm"
        style={{ padding: '10px 20px' }}
      >
        <Container className="d-flex justify-content-between">
          {/* Brand Section */}
          <Navbar.Brand className="d-flex align-items-center">
            {/* Sidebar Toggle */}
            <button
              style={{
                background: 'transparent',
                border: 'none',
               
                fontSize: '20px',
                cursor: 'pointer',
              }} className='text-primary'
              onClick={handleShow}
            >
              <FaBars />
            </button>
            {/* Brand Name */}
            <Link
              to="/"
              style={{
                textDecoration: 'none',
               
                marginLeft: '10px',
                fontWeight: 'bold',
                fontSize: '20px',
              }} className='text-primary'
            >
              Kalagraham
            </Link>
          </Navbar.Brand>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="danger"
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: '14px',
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{
          backgroundColor: 'white',
          color: 'white',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            className="fw-bold text-primary"
            style={{  fontSize: '24px' }} 
          >
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            {/* Menu Items */}

            <button
              className="btn btn-primary mb-3 d-flex align-items-center"
              style={{
                textAlign: 'left',
                borderRadius: '8px',
                transition: 'background 0.3s ease',
              }}
            >
              <FaVideo className="me-3 text-primary" />
              <Link
                to="/Index"
                onClick={handleClose}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
               Home
              </Link>
            </button>

            <button
              className="btn btn-primary mb-3 d-flex align-items-center"
              style={{
                textAlign: 'left',
                borderRadius: '8px',
                transition: 'background 0.3s ease',
              }}
            >
              <FaImage className="me-3 text-info" />
              <Link
                to="/BookingViewUser"
                onClick={handleClose}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                My Booking
              </Link>
            </button>

            <button
              className="btn btn-primary mb-3 d-flex align-items-center "
              style={{
                textAlign: 'left',
                borderRadius: '8px',
                transition: 'background 0.3s ease',
              }}
            >
              <FaVideo className="me-3 text-info" />
              <Link
                to="/MyProfile"
                onClick={handleClose}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                MyProfile
              </Link>
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header2;
