import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Card, Col, Row } from 'react-bootstrap';
import { carnivalGetAPI, GetTestimonyAPI, IncomeAPI, MoreBookedCarnivalAPI, MostRequestedParticipationAPI } from '../Services/allAPI';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function Dashboard() {
  const [name,setName]=useState('sarin')
  const updated = "new"
  const [totalIncomes, setTotalIncome] = useState('');
  const [carnival, setCarnival] = useState([]);
  const [moreBookCarnival, setMoreBookCarnival] = useState('');
  const [mostRequestedParticipation, setMostRequestedParticipation] = useState('');
const [getTestimony,setGetTestimony]=useState([])
  
  // Fetch total income
  const fetchTotalIncome = async () => {
    try {
      const result = await IncomeAPI();
      if (result.status === 200) {
        setTotalIncome(result.data.totalIncome);
      } else {
        console.error('Error fetching total income:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  //fetch
  // Fetch most booked carnival ID
  const fetchMoreBookedCarnival = async () => {
    try {
      const result = await MoreBookedCarnivalAPI();
      if (result.status === 200) {
        setMoreBookCarnival(result.data.carnivalId);
      } else {
        console.error('Error fetching most booked carnival:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Fetch carnival details
  const fetchCarnivalDetails = async () => {
    if (!moreBookCarnival) return;
    try {
      const result = await carnivalGetAPI(moreBookCarnival);
      if (result.status === 200 && result.data.length > 0) {
        setCarnival(result.data);
      } else {
        console.error('Error fetching carnival details:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Fetch most requested participation
  const fetchMostRequestedParticipation = async () => {
    try {
      const result = await MostRequestedParticipationAPI();
      if (result.status === 200) {
        setMostRequestedParticipation(result.data.carnivalName);
      } else {
        console.error('Error fetching most requested participation:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const TestimonyGet = async () => {
   

    try {
      const result = await GetTestimonyAPI();
      if (result.status === 200) {
        setGetTestimony(result.data);
      } else {
        console.error('Error fetching testimony:', result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchTotalIncome();
    fetchMoreBookedCarnival();
    fetchMostRequestedParticipation();
    TestimonyGet()
  }, []);

  // Fetch carnival details when `moreBookCarnival` updates
  useEffect(() => {
    fetchCarnivalDetails();
  }, [moreBookCarnival]);

  return (
    <>
      <Header />
      <Row className="g-4 m-5">
        <Col sm={12} md={6} lg={4}>
          <Card className="m-5 shadow text-center" style={{ width: '70%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Body>
              <Card.Text className="fw-bold" style={{ fontSize: "30px", textShadow: "2px 4px 6px grey" }}>
                Total Income
              </Card.Text>
              <Card.Title className="text-primary" style={{ fontSize: "35px",textShadow: "2px 4px 6px grey" }}>
                $ {totalIncomes || "Not Found"}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4}>
          <Card className="m-5 shadow text-center" style={{ width: '70%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Body>
              <Card.Text className="fw-bold" style={{ fontSize: "30px", textShadow: "2px 4px 6px grey" }}>
                Most Booked Carnival
              </Card.Text>
              <Card.Title className="text-primary" style={{ fontSize: "35px",textShadow: "2px 4px 6px grey" }}>
                {carnival.length > 0 ? carnival[0].carnivalname : "Not Found"}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={4}>
          <Card className="m-5 shadow text-center" style={{ width: '70%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Body>
              <Card.Text className="fw-bold" style={{ fontSize: "30px", textShadow: "2px 4px 6px grey",textShadow: "2px 4px 6px grey" }}>
                Most Participation Requested carnival
              </Card.Text>
              <Card.Title className="text-primary" style={{ fontSize: "35px" ,textShadow: "2px 4px 6px grey"}}>
                {mostRequestedParticipation || "Not Found"}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        <div className="mt-5 w-75">
                <h3 className="text-center mb-4" style={{ fontWeight: '600', color: '#343a40' }}>
                  <FaQuoteLeft className="me-2 text-primary " /> What People Say About Our Carnivals{' '}
                  <FaQuoteRight className="ms-2 text-primary" />
                </h3>
                <Row className='m-3'>
                
                {getTestimony?.length>0?getTestimony.map((testimony)=>( <Col md={4}  className="mb-4">
                    
                      <Card className="shadow-lg" style={{ borderRadius: '10px', backgroundColor: '#ffffff' }}>
                      <Card.Body>
                          <Card.Text className="text-muted fst-italic mb-3">
                            {testimony.feedback}
                            </Card.Text>
                          <Card.Title className="text-end text-primary fw-bold">
                          {testimony.username}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>)):<p>Not found</p>}
                 
                </Row>
              </div>
    </>
  );
}

export default Dashboard;
