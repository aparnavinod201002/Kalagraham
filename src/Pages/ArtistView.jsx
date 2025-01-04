
  import React, { useEffect, useState } from 'react';
import { GetArtistAPI, GetUserAPI } from '../Services/allAPI';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';

function ArtistView() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  const getArtists = async () => {
    const result = await GetArtistAPI();
    if (result.status === 200) {
        setArtists(result.data);
    } else {
      setError(result.data || "Error fetching users");
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    
    <div style={styles.container}>
      <Header/>
      <h1 style={styles.title} className='text-primary'>User Directory</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={styles.grid}>
        {artists?.length > 0
          ? artists.map((artists) => (
              <div  style={styles.card}>
                <h3 style={styles.name}>{artists.username}</h3>
                <p style={styles.email}>Phone: {artists.phoneno}</p>
                <p style={styles.email}>Email: {artists.email}</p>
                <p style={styles.email}>Password: {artists.password}</p>
                <d-flex align-items-row>
                  <Link
                     className='m-3 text-primary' style={{textDecoration:"none"}}
                    to={`/requests/${artists._id}`} 
                  >
                    View Request Details
                  </Link>
                
              
                  <Link
                     className='m-3 text-secondary ' style={{textDecoration:"none"}}
                    to={`/imagegallaryget/${artists._id}`} 
                  >
                    View Image Gallary 
                  </Link>
                

              
                  <Link
                   className='m-3 text-primary' style={{textDecoration:"none"}}
                    to={`/VideoView/${artists._id}`} 
                  >
                    View Video Gallary
                  </Link>
              
                </d-flex>
              </div>
            ))
          : !error && <p>No Users Found</p>}
      </div>
    </div>
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

export default ArtistView;
