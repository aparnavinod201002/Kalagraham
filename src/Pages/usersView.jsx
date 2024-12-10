import React, { useEffect, useState } from 'react';
import { GetUserAPI } from '../Services/allAPI';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';

function UsersView() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const getUsers = async () => {
    const result = await GetUserAPI();
    if (result.status === 200) {
      setUsers(result.data);
    } else {
      setError(result.data || "Error fetching users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
     <Header/>
    <div style={styles.container}>
     
      <h1 style={styles.title}>User Directory</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={styles.grid}>
        {users?.length > 0
          ? users.map((user) => (
              <div key={user._id} style={styles.card}>
                <h3 style={styles.name}>{user.username}</h3>
                <p style={styles.email}>Phone: {user.phoneno}</p>
                <p style={styles.email}>Email: {user.email}</p>
                <p style={styles.email}>Password: {user.password}</p>
                <Button>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/BookingView/${user._id}`} 
                  >
                    View Booking Details
                  </Link>
                </Button>
              </div>
            ))
          : !error && <p>No Users Found</p>}
      </div>
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

export default UsersView;
