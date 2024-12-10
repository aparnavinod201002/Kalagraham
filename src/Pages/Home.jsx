import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function Home() {
  const [isHome, setIsHome] = useState(true);

  return (
    <>
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
          className="container bg-dark bg-opacity-50 p-4 rounded shadow text-light"
          style={{ maxWidth: "800px" }}
        >
          <h5 className="font-serif fw-bold display-5 mb-3">WELCOME TO</h5>
          <h4 className="fst-italic fw-bold text-warning display-3 mb-3">
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
          <div className="mt-4 row gx-3 justify-content-center">
            <div className="col-md-5 col-12 mb-3">
              <Link to={"/UserReg"}>
                <button className="btn btn-warning w-100 shadow-lg fw-bold fs-5">
                  User Registration
                </button>
              </Link>
            </div>
            <div className="col-md-5 col-12 mb-3">
              <Link to={"/ArtistReg"}>
                <button className="btn btn-warning w-100 shadow-lg fw-bold fs-5">
                  Artist Registration
                </button>
              </Link>
            </div>
          </div>

          {/* Explore Button */}
          <div className="mt-3">
            <Link to={"/Login"}>
              <button className="btn btn-danger shadow-lg fw-bold fs-5 px-4">
                Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
