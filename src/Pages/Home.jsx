import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { CarnivalGetAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import Header4 from "../Guest/Header4";

function Home() {
  const [isHome, setIsHome] = useState(true);
  const [carnivals, setCarnivals] = useState([]);

  const getCarnival = async () => {
    try {
      const result = await CarnivalGetAPI();
      if (result.status === 200) {
        // Filter carnivals to only show those that are live
        const currentDate = new Date();
        const liveCarnivals = result.data.filter((carnival) => 
          new Date(carnival.startdate) >= currentDate 
          
        );
        setCarnivals(liveCarnivals);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Error fetching carnival details", error);
    }
  };

  useEffect(() => {
    getCarnival();
  }, []);

  return (
    <>
    <Header4/>
      <div
        className="home d-flex justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url("https://t4.ftcdn.net/jpg/10/35/34/03/360_F_1035340371_GwBzBxNeYfkwHcENGF60MGVsRYZfuQcU.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        {/* Content Container */}
        <div
          className="container bg-primary bg-opacity-50 p-4 rounded shadow text-light"
          style={{ maxWidth: "800px" }}
        >
          <h5 className="font-serif fw-bold display-5 mb-3 text-primary">WELCOME TO</h5>
          <h4 className="fst-italic fw-bold text-light display-3 mb-3">
            KALAGRAHAM
          </h4>
          <p className="fst-italic fw-medium text-light fs-5 lh-base">
            The thrill of festivities meets the excitement of community
            engagement! Dive into the magic, culture, and vibrant energy of our
            carnival events. Whether you're an enthusiastic spectator, a
            first-time performer, or a seasoned carnival lover, explore
            opportunities to participate, showcase your talents, or simply soak
            in the spirit of celebration.
          </p>

          {/* Action Buttons */}
        

          {/* Explore Button */}
          <div className="mt-3">
            <Link to={"/Login"}>
              <button className="btn btn-light shadow-lg fw-bold fs-5 px-4">
                <span className="text-primary">Login Now</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Carnival Details */}
      <div className="container py-5">
        <h1 className="text-center mb-5 text-primary font-serif fw-bold " style={{textShadow:"2px 4px 6px grey"}}>Upcoming Carnivals </h1>

        {carnivals.length > 0 ? (
          <div className="row">
            {carnivals.map((carnival, index) => (
              <div className="col-md-4 col-sm-6 mb-4" key={index}>
                <div className="card shadow-lg h-100">
                  <img
                    src={`${server_url}/uploads/${carnival.carnivalImage}`}
                    className="card-img-top"
                    alt={carnival.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary font-serif fw-bold">
                      {carnival.carnivalname}
                    </h5>
                    <p className="card-text text-dark">
                      {carnival.description} 
                    </p>
                    <p className="text-dark">Live at {carnival.locationname}, {carnival.districtname}</p>
                  </div>
                  <div className="card-footer text-center">
                    <Link to={`/login`} className="btn btn-primary">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No live carnivals available.</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
