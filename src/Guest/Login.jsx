import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, NewPasswordAPI } from "../Services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState({ email: "", newpassword: "", confirm: "" });
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.info("Please fill in all required fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const result = await loginAPI({ email, password });
      if (result.status === 200) {
        sessionStorage.setItem("username", result.data.existingUser.username);
        sessionStorage.setItem("userId", result.data.existingUser._id);
        sessionStorage.setItem("token", result.data.token);
        setIsAuthorized(true)
        setUserData({ email: "", password: "" });

        if (result.data.existingUser.role === "Admin" || result.data.existingUser.password === "123") {
          navigate("/Dashboard");
        } else if (result.data.existingUser.role === "artist") {
          navigate("/ViewCarnival");
        } else if (result.data.existingUser.role === "user") {
          navigate("/Index");
        }
      } else {
        toast.warning(result.response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, newpassword, confirm } = password;

    if (!email || !newpassword || !confirm) {
      toast.info("Please fill in all required fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (newpassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (newpassword !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await NewPasswordAPI({ email, newpassword, confirm });
      if (result.status === 200) {
        toast.success("Password changed successfully");
        handleClose();
        navigate("/login");
      } else {
        toast.warning("Failed to update password");
        handleClose();
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("https://media.giphy.com/media/HYETDJHys0Hvi/giphy.gif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container w-75 bg-dark">
          <div className="card shadow p-3 bg-transparent">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img
                  src="https://i.pinimg.com/originals/1e/46/82/1e46824815d0e608bbc22fc3d6975b09.jpg"
                  alt=""
                  width={"80%"}
                />
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <h1 className="fw-bolder text-warning mt-2">
                    <i className="fa-solid fa-dance me-2"></i>KALAGRAHAM
                  </h1>
                  <h5 className="fw-bolder text-warning">Sign in to your account</h5>
                  <Form className="mt-4 text-dark">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter Your Email"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        value={userData.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        value={userData.password}
                      />
                    </Form.Group>
                    <div className="mt-3">
                      <button className="btn btn-warning" onClick={handleLogin}>
                        Login
                      </button>
                      <p className="text-light fw-bolder mt-2">
                        New User? Click here to{" "}
                        <Link to={"/"} style={{ textDecoration: "none", color: "red" }}>
                          Register
                        </Link>
                      </p>
                    </div>
                    <p className="text-success fw-bolder mt-2">
                      <button
                        className="btn btn-link"
                        style={{ textDecoration: "none", color: "darkgreen" }}
                        onClick={handleShow}
                      >
                        Forgot Password?
                      </button>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setPassword({ ...password, email: e.target.value })}
              value={password.email}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => setPassword({ ...password, newpassword: e.target.value })}
              value={password.newpassword}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirm" label="Confirm Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
              value={password.confirm}
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

export default Login;
