import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <Link
                to="/"
                className="navbar-sm-brand text-light text-decoration-none"
                href="mailto:info@company.com"
              >
                info@company.com
              </Link>
              <i className="fa fa-phone mx-2"></i>
              <Link
                to="/"
                className="navbar-sm-brand text-light text-decoration-none"
                href="tel:010-020-0340"
              >
                010-020-0340
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="text-light"
                href="https://fb.com/templatemo"
                target="_blank"
                rel="sponsored"
              >
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </Link>
              <a
                className="text-light"
                href="https://www.instagram.com/"
                target="_blank"
              >
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://twitter.com/"
                target="_blank"
              >
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://www.linkedin.com/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="navbar-brand text-success logo h1 align-self-center"
          >
            Zay
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" href="index.html">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a onClick={logout} className="nav-link">
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                      Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search"></i>
                  </div>
                </div>
              </div>
              <a
                className="nav-icon d-none d-lg-inline"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#templatemo_search"
              >
                <i className="fa fa-fw fa-search text-dark mr-2"></i>
              </a>
              <a
                className="nav-icon position-relative text-decoration-none"
                href="#"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  7
                </span>
              </a>
              <a
                className="nav-icon position-relative text-decoration-none"
                href="#"
              >
                <i className="fa fa-fw fa-user text-dark mr-3"></i>
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  +99
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
