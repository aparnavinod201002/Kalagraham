import React from "react";

function HeaderUser() {
  return (
    <>
      <div className="hero_area">
        <div className="main slick_main">
          <div className="slider slider-for main_img-container">
            <div className="main-img-box b1"></div>
            <div className="main-img-box b2"></div>
            <div className="main-img-box b3"></div>
          </div>
        </div>

        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a href="index.html" className="navbar-brand">
              <img src="images/logo-black.png" alt="Logo" />
            </a>
            <button
              className="navbar-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="index.php">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="viewcarnival.php">
                      Search Carnival
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="changepassword.php">
                      Change Password
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="myprofileview.php">
                      My Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="mybooking.php">
                      My Booking
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="portfolio.html">
                      Portfolio
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="booking.php">
                      Contact us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="logout.php">
                      Logout
                    </a>
                  </li>
                </ul>
                <form className="form-inline">
                  <button
                    className="btn my-2 my-sm-0 nav_search-btn"
                    type="submit"
                  ></button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default HeaderUser;
