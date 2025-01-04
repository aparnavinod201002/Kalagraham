import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  GetBookingAPI, GetCarnivalDetailsAPI, PaymentGetAPI } from '../Services/allAPI';
import { server_url } from '../Services/server_url';
import Header from '../Components/Header';

function BookingView() {
    const { userId } = useParams(); // Extract userId from URL
    const [bookingDetails, setBookingDetails] = useState([]);
    const [carnivalDetails, setCarnivalDetails] = useState({});
    const [error, setError] = useState("");
const [getPayment,setGetPayment]=useState([])
    const getBooking = async () => {
        try {
            const result = await GetBookingAPI(userId);
            if (result.status === 200) {
                setBookingDetails(result.data);

                // Fetch details for each unique carnival_id
                const uniqueCarnivalIds = [...new Set(result.data.map(booking => booking.carnival_id))];
                console.log("Unique Carnival IDs:", uniqueCarnivalIds); // Debugging

                const carnivalPromises = uniqueCarnivalIds.map(id => GetCarnivalDetailsAPI(id));
                const carnivalResponses = await Promise.all(carnivalPromises);

                // Map carnival details to their respective IDs
                const carnivalMap = {};
                carnivalResponses.forEach((response, index) => {
                    if (response.status === 200) {
                        console.log(response.data); // Debugging
                        setCarnivalDetails(response.data);
                       
                    } else {
                        console.error(`Failed to fetch details for carnival ID: ${uniqueCarnivalIds[index]}`);
                    }
                });

               
            } else {
                setError(result.data || "");
            }
        } catch (error) {
            console.error("Error fetching data:", error); // Debugging
            setError("An error occurred while fetching bookings");
        }
    };
    const PaymentGet = async () => {
      
  
      try {
        const result = await PaymentGetAPI(userId);
        if (result.status === 200) {
          setGetPayment(result.data);
        } else {
          console.error('Error fetching districts:', result);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    useEffect(() => {
      PaymentGet()
        getBooking();
    }, [userId]);

   
    
    return (
      <>
       <Header/>
        <div style={{color:"black"}}>
           
            <h1 style={styles.title} className='text-info'>Payment Details</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={styles.grid}>
              
                {bookingDetails?.length > 0
                    ? bookingDetails.map((booking) => (
                        <div key={booking._id} style={styles.card}>
                          {carnivalDetails?.length>0?carnivalDetails.map((carnival)=> (
                            <h3 style={styles.name}>
                                    Carnival: {carnival.carnivalname || "No Name Available"}
                                    </h3>

                            )) : 
                                <p style={styles.email}>Loading carnival details...</p>
                            }
 {carnivalDetails?.length>0?carnivalDetails.map((carnival)=> (
                            <p style={styles.name}>
                                     {carnival.locationname} , {carnival.districtname}
                                    </p>

                            )) : 
                                <p style={styles.email}>Loading carnival details...</p>
                            }

                          
                            <p style={styles.email}>Ticket Count: {booking.ticket_count}</p>
                            <p style={styles.email}>Total Amount: {booking.total_amount}</p>
                            <p style={styles.email}>
                                Required Date: {new Date(booking.required_date).toLocaleDateString()}
                            </p>
                            
                        </div>
                    ))
                    : !error && <p></p>}


                            
            </div>
            <div className='m-3 mt-3'>
              <h2 className='text-info' style={{textAlign:"center"}}></h2>
            {getPayment.length>0?getPayment.map((payment)=>(
                              <p style={styles.email} className='text-success'>Account No: {payment.fromAccount}</p>
                             
                              
                              
                          
                            
)):<p className='text-danger text-align-center'>No payment has been made</p>
}

</div>
        </div>
       </>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'dark',
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
        backgroundColor: 'dark',
        borderRadius: '10px',
        boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    name: {
        fontSize: '18px',
        margin: '10px 0',
        color: '#333',
    },
    email: {
        fontSize: '14px',
        color: '#777',
    },
};

export default BookingView;
