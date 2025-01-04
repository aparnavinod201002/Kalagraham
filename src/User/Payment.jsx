import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { GetBookingAPI, PaymentAPI } from '../Services/allAPI';
import './Payment.css';
import Header2 from '../Components/Header2';

const Payment = () => {
  const TO_ACCOUNT = '1265843643257896'; // Fixed toAccount value
  const [payment, setPayment] = useState(null);
  const [fromAccount, setFromAccount] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve total amount and user ID from session storage
    setTotalAmount(sessionStorage.getItem('totalAmount'));
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!userId) return;

      try {
        const result = await GetBookingAPI(userId);

        if (result.status === 200 && result.data.length > 0) {
          const unpaidBooking = result.data.find((booking) => booking.PaymentStatus === 'Pending');

          if (unpaidBooking) {
            setPayment(unpaidBooking);
            setTotalAmount(unpaidBooking.total_amount);
            sessionStorage.setItem('paymentId', unpaidBooking._id);
          } else {
            toast.info('No unpaid bookings available.');
          }
        } else {
          toast.error('No bookings found for this user.');
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast.error('Failed to fetch booking details. Please try again.');
      }
    };

    fetchPayment();
  }, [userId]);

  const validateFields = () => {
    if (!fromAccount || !expMonth || !expYear || !cvc || !totalAmount) {
      toast.error('All fields are required.');
      return false;
    }
    if (fromAccount.length !== 16 || isNaN(fromAccount)) {
      toast.error('From Account must be a 16-digit number.');
      return false;
    }
    if (!/^\d{2}$/.test(expMonth) || parseInt(expMonth, 10) < 1 || parseInt(expMonth, 10) > 12) {
      toast.error('Expiration month must be a valid 2-digit number (01-12).');
      return false;
    }
    if (!/^\d{2}$/.test(expYear) || parseInt(expYear, 10) < new Date().getFullYear() % 100) {
      toast.error('Expiration year must be valid and not in the past.');
      return false;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      toast.error('CVC/CVV must be a valid 3 or 4-digit number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const paymentData = {
      fromAccount,
      toAccount: TO_ACCOUNT,
      expMonth,
      expYear,
      cvc,
      totalAmount,
      userId,
      id: sessionStorage.getItem('paymentId'), // Use stored payment ID
    };

    try {
      const result = await PaymentAPI(paymentData);

      if (result?.status === 200) {
        
        navigate('/Index');
        toast.success('Payment Successful!');
      } else {
        toast.warning(result?.data?.message || 'Payment failed. Try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      const errorMessage = error?.response?.data?.error || 'An error occurred. Please try again later.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header2 />
      <div style={{ marginTop: '60px' }}>
        <div id="form-container">
          <form onSubmit={handleSubmit}>
            <div id="card-front">
              <div id="image-container">
                <span id="amount">
                  Paying: <strong>Rs. {totalAmount}</strong>
                </span>
              </div>
              <label htmlFor="fromaccount">From Account Number</label>
              <input
                type="text"
                id="fromaccount"
                placeholder="1234 5678 9101 1112"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                maxLength="16"
                required
              />

              <label htmlFor="toaccount">To Account Number</label>
              <input
                type="text"
                id="toaccount"
                value={TO_ACCOUNT}
                readOnly
                maxLength="16"
              />

              <div id="exp-container">
                <label htmlFor="card-exp">Expiration</label>
                <input
                  id="card-month"
                  type="text"
                  placeholder="MM"
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  maxLength="2"
                  required
                />
                <input
                  id="card-year"
                  type="text"
                  placeholder="YY"
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  maxLength="2"
                  required
                />
              </div>

              <div id="cvc-container">
                <label htmlFor="card-cvc">CVC/CVV</label>
                <input
                  id="card-cvc"
                  type="text"
                  placeholder="XXX-X"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  minLength="3"
                  maxLength="4"
                  required
                />
                <p>Last 3 or 4 digits</p>
              </div>
            </div>

            <button type="submit" id="card-btn">
              Submit
            </button>
          </form>
        </div>
        <ToastContainer autoClose={2000} position="top-center" theme="colored" />
      </div>
    </>
  );
};

export default Payment;
