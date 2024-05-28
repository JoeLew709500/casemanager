import React from 'react';
import "../styles/home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <div>
            <ul className="list-inline social-nets">
              <li className="list-inline-item">
                <a href="http://facebook.com" target="_blank" rel="noopener" aria-label="Visit our Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="http://youtube.com" target="_blank" rel="noopener" aria-label="Visit our Youtube">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;