import React, { useState } from 'react';
import { Button, Container, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    // Clear session or token (example: localStorage or sessionStorage)
    sessionStorage.clear();
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <>
      <Navbar className="bg-info">
        <Container className="d-flex justify-content-between">
          {/* Brand Name and Sidebar Toggle */}
          <Navbar.Brand>
            <button style={{ background: "transparent", border: "none" }} onClick={handleShow}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
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
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column m-0 p-0">
            <button className="btn btn-transition-info">
              <Link to={'/DistrictView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View District</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/LocationView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View Location</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/CategoryView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View Category</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/SubcategoryView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View Subcategory</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/CarnivalView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View Carnival</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/usersView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View User Details</h5>
              </Link>
            </button>
            <button className="btn btn-transition-info">
              <Link to={'/artistsView'} onClick={toggleSidebar} style={{ textDecoration: "none" }} className="d-block mb-2 fw-bolder text-info">
                <h5>View Artist Details</h5>
              </Link>
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
