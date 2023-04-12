import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/fa";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
function Footer() {
  return (
    <>
      <section className="footer">
        <div className="icons">
          <button>
            <Link className="link-icon">
              <FacebookIcon
                fontSize="large"
                sx={{ color: "white" }}
                className="i"
              />
            </Link>
          </button>
          <button>
            <Link className="link-icon">
              <GitHubIcon
                fontSize="large"
                sx={{ color: "white" }}
                className="i"
              />
            </Link>
          </button>
          <button>
            <Link className="link-icon">
              <LinkedInIcon
                fontSize="large"
                sx={{ color: "white" }}
                className="i"
              />
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Footer;
