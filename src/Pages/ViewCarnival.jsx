import React, { useEffect, useState } from 'react';
import Carnival from '../Components/Carnival';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Header1 from '../Components/Header1';
import Footer from '../Components/Footer';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { CarnivalGetAPI, DistrictAPI, getDistLocAPI, getLocationsByDistrictAPI } from '../Services/allAPI';

function ViewCarnival() {
  const [username, setUsername] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [carnival, setCarnival] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setUsername(sessionStorage.getItem('username'));
    }
    getCarnival();
    getDistricts();
  }, []);

  // Fetch carnival data
  const getCarnival = async () => {
    try {
      const result = await CarnivalGetAPI();
      if (result.status === 200) {
        setCarnival(result.data);
      } else {z
        console.error(result);
      }
    } catch (error) {
      console.error('Error fetching carnivals:', error);
    }
  };

  // Fetch districts
  const getDistricts = async () => {
    try {
      const result = await DistrictAPI();
      if (result.status === 200) {
        setDistricts(result.data);
      } else {
        console.error('Error fetching districts:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch locations by district
  const getLocations = async (districtName) => {
    try {
      const result = await getLocationsByDistrictAPI(districtName);
      if (result.status === 200) {
        setLocations(result.data);
      } else {
        console.error('Error fetching locations:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDistrictSelect = (districtName) => {
    setSelectedDistrict(districtName);
    setSelectedLocation('Select Location'); // Reset location when district changes
    getLocations(districtName);
  };

  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName);
  };

  const getcarnivalbylocation = async (selectedLocation) => {
    try {
      const result = await getDistLocAPI(selectedLocation);
      if (result.status === 200) {
        setCarnival(result.data);
      } else {
        console.error('Error fetching locations:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(selectedLocation);
  console.log(selectedDistrict);
  
  console.log(carnival);
  

  return (
    <>
      <Header1 />

      {/* Main Section */}
      <div
        className="d-flex flex-column align-items-center"
        style={{
          minHeight: 'calc(100vh - 100px)',
          background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
          padding: '30px 15px',
        }}
      >
        <h1
          style={{ color: 'black', textShadow: '2px 4px 6px black' }}
          className="m-2 mb-4"
        >
          Welcome <span className="text-danger">{username}</span>
        </h1>

        {/* Search Card */}
        <div
          className="card shadow-lg p-4 w-75"
          style={{
            maxWidth: '600px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <h3
            className="text-center mb-4"
            style={{ fontWeight: '600', color: '#343a40' }}
          >
            <FaSearch className="me-2" /> Search Carnivals
          </h3>

          <div className="mb-3">
            <label className="form-label" htmlFor="district-dropdown">
              <FaMapMarkerAlt className="me-1 text-secondary" />
              Select District
            </label>
            <DropdownButton
              id="district-dropdown"
              title={selectedDistrict}
              variant="outline-secondary"
              onSelect={handleDistrictSelect}
              className="w-100"
            >
              {districts.length > 0 ? (
                districts.map((district) => (
                  <Dropdown.Item key={district.id} eventKey={district.name}>
                    {district.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No Districts Available</Dropdown.Item>
              )}
            </DropdownButton>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="location-dropdown">
              <FaMapMarkerAlt className="me-1 text-secondary" />
              Select Location
            </label>
            <DropdownButton
              id="location-dropdown"
              title={selectedLocation}
              variant="outline-secondary"
              onSelect={handleLocationSelect}
              className="w-100"
            >
              {locations.length > 0 ? (
                locations.map((location) => (
                  <Dropdown.Item key={location.id} eventKey={location.name}>
                    {location.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No Locations Available</Dropdown.Item>
              )}
            </DropdownButton>
          </div>

          <button
            className="btn btn-warning w-100 fw-bold mt-3"
            style={{ fontSize: '16px' }}
            onClick={() => getcarnivalbylocation(selectedLocation)}>
            <FaSearch className="me-2" /> Search
          </button>
        </div>

        {/* Carnival Display */}
        <div className="mt-5 w-100">
          <Carnival carnival={carnival} />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewCarnival;
