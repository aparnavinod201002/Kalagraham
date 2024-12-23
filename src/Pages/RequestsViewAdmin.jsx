import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RequestGetAPI, ReplyAPI } from '../Services/allAPI';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../Components/Header';

function RequestsViewAdmin() {
    const { userId } = useParams(); // Extract userId from URL
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [request, setRequest] = useState([]);
    const [reply, setReply] = useState({ reply: "", date: "", userId: "" });

    const getRequest = async () => {
        const result = await RequestGetAPI(userId);
        if (result.status === 200) {
            setRequest(result.data);
        } else {
            console.log(result);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setReply({ ...reply, userId }); // Pre-fill userId in reply state
        setShow(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { reply: replyText, date } = reply;

        if (!replyText || !date) {
            toast.info("Please fill in all required fields");
        } else {
            try {
                const result = await ReplyAPI(reply);
                if (result.status === 200) {
                    handleClose();
                    toast.success(`Response successfully submitted`);
                    getRequest(); // Optionally refresh data after submission
                   
                } else {
                    toast.warning("Failed to submit the response. Please try again.");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        getRequest();
    }, [userId]);

    return (
        <>
        <Header/>
            <div style={styles.container}>
                <h1 style={styles.title}>Booking Details</h1>

                <div style={styles.grid}>
                    {request?.length > 0 ? 
                        request.map((requests) => (
                            <div key={requests.id} style={styles.card}>
                                <h3 style={{ color: "black" }}>{requests.carnivalName}</h3>
                                <p style={styles.email}>Start Date: {new Date(requests.startDate).toLocaleDateString()}</p>
                                <p style={styles.email}>End Date: {new Date(requests.endDate).toLocaleDateString()}</p>
                                <p style={styles.email}>Category: {requests.categoryName}</p>
                                <p style={styles.email}>Sub Category: {requests.subCategoryName}</p>
                                <p style={styles.email}>About: {requests.aboutMe}</p>
                                <p style={styles.email}>Status: {requests.requests}</p>
                                <p style={styles.email}>
                                    Allotted Date: {new Date(requests.date).toLocaleDateString()}
                                </p>
                                <Button onClick={handleShow}>Add Reply..</Button>
                            </div>
                        )) : 
                        <p style={styles.email}>Loading carnival details...</p>
                    }
                </div>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Reply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingInput" label="Accept or Reject" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter your reply"
                                value={reply.reply}
                                onChange={(e) => setReply({ ...reply, reply: e.target.value })}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingDate" label="Allotted Date" className="mb-3">
                            <Form.Control
                                type="date"
                                placeholder="Select a date"
                                value={reply.date}
                                onChange={(e) => setReply({ ...reply, date: e.target.value })}
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
            </div>
        </>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    email: {
        fontSize: '14px',
        color: '#777',
    },
};

export default RequestsViewAdmin;
