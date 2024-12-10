import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BookingAPI, carnivalGetAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header2 from "../Components/Header2";

function Booking() {
  const [carnivalId, setCarnivalId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [carnival, setCarnival] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [requiredDate, setRequiredDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = sessionStorage.getItem("carnivalId");
    const storedUserId = sessionStorage.getItem("userId");

    if (storedId && storedUserId) {
      setCarnivalId(storedId);
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (carnivalId) {
      const fetchCarnival = async () => {
        try {
          const result = await carnivalGetAPI(carnivalId);
          if (result.status === 200 && result.data.length > 0) {
            setCarnival(result.data[0]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCarnival();
    }
  }, [carnivalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requiredDate) {
      setError("Please select a required date.");
      return;
    }

    const totalAmount = carnival.amount * ticketCount;
    const bookingData = {
      carnival_id: carnivalId,
      ticket_count: ticketCount,
      total_amount: totalAmount,
      required_date: requiredDate,
      user_id: userId,
    };

    try {
      const result = await BookingAPI(bookingData);
      if (result.status === 200) {
        toast.success("Booking has successfully registered");
        sessionStorage.setItem("totalAmount", totalAmount);
        navigate("/Payment");
      } else {
        toast.warning("Booking already exists");
      }
    } catch (err) {
      console.error("Error registering booking:", err);
    }
  };

  return (
    
    <Container>
      <Header2/>
      <h2 className="text-warning">Book Your Tickets</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Carnival Name</Form.Label>
              <Form.Control
                type="text"
                value={carnival ? carnival.carnivalname : "Loading..."}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ticket Count</Form.Label>
              <Form.Control
                type="number"
                value={ticketCount}
                onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="text"
                value={`Rs.${carnival ? carnival.amount * ticketCount : 0}`}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Required Date</Form.Label>
              <Form.Control
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">CONFIRM</Button>
          </Form>
        </Col>
        <Col md={6}>
          <Image
            src={
              carnival && carnival.carnivalImage
                ? `${server_url}/uploads/${carnival.carnivalImage}`
                : "https://via.placeholder.com/500"
            }
            fluid
          />
        </Col>
      </Row>
      <ToastContainer autoClose={2000} />
    </Container>
  );
}

export default Booking;
