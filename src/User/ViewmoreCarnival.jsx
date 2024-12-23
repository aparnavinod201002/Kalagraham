import React, { useEffect, useState } from "react";
import "./ViewmoreCarnival.css";
import { carnivalGetAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import Header2 from "../Components/Header2";

function ViewmoreCarnival() {
  const [carnivalId, setCarnivalId] = useState(null);
  const [carnival, setCarnival] = useState(null);

  // Fetch carnival ID from session storage
  useEffect(() => {
    const storedId = sessionStorage.getItem("carnivalId");
    if (storedId) {
      setCarnivalId(storedId);
    }
  }, []);

  // Fetch carnival details when the ID is available
  useEffect(() => {
    if (carnivalId) {
      const fetchCarnival = async () => {
        try {
          const result = await carnivalGetAPI(carnivalId);
          if (result.status === 200 && result.data.length > 0) {
            setCarnival(result.data[0]); // Access the first element of the returned array
          } else {
            console.error("Error fetching carnival:", result);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCarnival();
    }
  }, [carnivalId]);

  console.log(carnival);

  return (
   <>
   <Header2/>
    <section className="client_section layout_padding">
      <div className="container d-flex align-items-center justify-content-center">
        <div
          className="heading_container"
          style={{ marginTop: "-90px", marginRight: "-450px" }}
        >
          <h2>KALAGRAHAM</h2>
          <p>CrEaTe yOuR OwN SuNsHiNe</p>
        </div>
        <div className="client_container" style={{ marginRight: "-200px" }}>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="box">
                <div className="detail-box">
                  <div className="img-box">
                    {carnival && carnival.carnivalImage ? (
                      <img
                        src={`${server_url}/uploads/${carnival.carnivalImage}`}
                        alt={carnival.carnivalname}
                        className="carnival-img"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/500" // Placeholder if the image is not available
                        alt="Placeholder"
                        className="carnival-img"
                      />
                    )}
                  </div>
                  <h4>
                    <b>{carnival ? carnival.carnivalname : "Loading..."}</b>
                  </h4>
                  <p className="price">
                    {carnival ? `Rs.${carnival.amount}/- Only` : ""}
                  </p>
                  <div className="date">
                    <h6>
                      <b>
                        {carnival
                          ? `Join us from ${new Date(carnival.startdate).toLocaleDateString()} to ${new Date(carnival.enddate).toLocaleDateString()}. The gates open at ${carnival.locationname}, ${carnival.districtname}.`
                          : ""}
                      </b>
                    </h6>
                  </div>
                  <p>{carnival ? carnival.description : "Loading..."}</p>
                  <div className="d-flex">
                    <a href="/Booking" className="book-now-btn">
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default ViewmoreCarnival;
