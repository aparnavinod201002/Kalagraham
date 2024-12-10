import React, { useEffect, useState } from "react";
import { DeleteBookingAPI, GetBookingAPI, PaymentGetByIdAPI, carnivalGetAPI } from "../Services/allAPI";
import Header2 from "../Components/Header2";

function BookingViewUser() {
  const [userId, setUserId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [selectedCarnival, setSelectedCarnival] = useState(null);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  // Get userId from session storage on initial load
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch all bookings for the user
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (userId) {
          const bookingResult = await GetBookingAPI(userId);
          if (bookingResult.status === 200) {
            setBookingDetails(bookingResult.data);
          } else {
            setError("No bookings found.");
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("An error occurred while fetching bookings.");
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  // Fetch carnival details for a selected booking
  const handleViewCarnival = async (carnivalid,id) => {
    console.log("Button clicked, carnival ID:", carnivalid,id);
    try {
      if (!carnivalid,!id) {
        alert("Invalid carnival ID");
        return;
      }
  
  
      const carnivalResponse = await carnivalGetAPI(carnivalid);
      if (carnivalResponse.status === 200) {
        setSelectedCarnival(carnivalResponse.data); // Set the carnival details
      } else {
        setSelectedCarnival(null); // Clear previous selection if no carnival found
      
      }
      const paymentResponse = await PaymentGetByIdAPI(id);
      if (paymentResponse.status === 200) {
        setSelectedPayment(paymentResponse.data); // Set the carnival details
      } else {
        setSelectedPayment(null); // Clear previous selection if no carnival found
     
      }
        
      
    }
       //delete
    
  
    catch (error) {
      console.error("Error fetching carnival details:", error);
      setSelectedCarnival(null);
      setSelectedPayment(null)
      alert("An error occurred while fetching carnival details.");
    }
  }
      
    const handleDeleteBooking = async (bookingId) => {
      try {
        const result = await DeleteBookingAPI(bookingId); // Assume DeleteBookingAPI is defined
        if (result.status === 200) {
          setBookingDetails((prev) => prev.filter((booking) => booking._id !== bookingId));
        } else {
          console.error('Error deleting booking:', result);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  
  
  //
      

  

  return (
    <div style={styles.container}>
      <Header2/>
      <h1 style={styles.title}>Booking Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={styles.grid}>
        {bookingDetails?.length > 0 ? (
          bookingDetails.map((booking) => (
            <div key={booking._id} style={styles.card}>
              <p style={styles.email}>Ticket Count: {booking.ticket_count}</p>
              <p style={styles.email}>Total Amount: {booking.total_amount}</p>
              <p style={styles.email}>Payment Status: {booking.PaymentStatus}</p>
              <p style={styles.email}>
                Required Date: {new Date(booking.required_date).toLocaleDateString()}
              </p>
              <button
                style={styles.button}
                onClick={() => handleViewCarnival(booking.carnival_id,booking._id)}
              >

                View Carnival
              </button>
              <button className="btn btn-danger m-3"
                  style={styles.deleteButton}
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Cancel
                </button>
            </div>
          ))
        ) : (
          !error && <p>No Bookings Found</p>
        )}
      </div>

      {/* Carnival Details Modal or Section */}
      {selectedCarnival ?.length>0?selectedCarnival.map((carnival)=>(
        <div style={styles.carnivalDetails}>
         
          <h3 className="text-dark"> {carnival.carnivalname || "N/A"}</h3>
          <p className="text-dark">Location: {carnival.locationname || "N/A"}</p>
          <p className="text-dark">
            Start Date:{" "}
            {new Date(carnival.startdate).toLocaleDateString() || "N/A"}
          </p>
          <p className="text-dark">
            End Date:{" "}
            {new Date(carnival.enddate).toLocaleDateString() || "N/A"}
          </p>
         
          <button
            style={styles.closeButton}
            onClick={() => setSelectedCarnival(null)}
          >
            Close
          </button>
        </div>
      )) :<p>Not Found</p>}



    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  email: {
    fontSize: "14px",
    color: "#777",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  carnivalDetails: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  closeButton: {
    marginTop: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default BookingViewUser;
