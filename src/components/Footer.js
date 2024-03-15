import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Footer() {
  return (
    <footer className="footer--container flex items-center justify-between px-2">
      <div>
        <a
          href="https://seanpoole.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="footer-link text-base"
        >
          &copy; Sean Poole 2024
        </a>
      </div>
      <div className="flex">
        <a 
          href="https://github.com/sean-poole" 
          target="_blank" 
          rel="noreferrer" 
          className="footer-icon"
        >
          <FontAwesomeIcon icon={ faGithub } />
        </a>
        <a 
          href="https://www.linkedin.com/in/seandev21/" 
          target="_blank" 
          rel="noreferrer" 
          className="footer-icon"
        >
          <FontAwesomeIcon icon={ faLinkedin } />
        </a>
        <a 
          href="https://twitter.com/twxntyone_" 
          target="_blank" 
          rel="noreferrer" 
          className="footer-icon"
        >
          <FontAwesomeIcon icon={ faTwitter } />
        </a>
      </div>
      
    </footer>
  );
}
