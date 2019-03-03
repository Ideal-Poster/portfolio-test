import React from 'react';
import '../navigation/Navigation.css'
import projectApi from '../../api';

const Navigation = () => (
  <div>
    <div className="navlist__top">
      <ul id="navlist">
        <li>Portfolio</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
    <div className="navlist__bottom">
      <ul id="links">
        <li>Github</li>
        <li>Instagram</li>
      </ul>
      <div id="title">
        {/* <p> */}
          Web Design & Web Development
          {/* </p> */}
      </div>
    </div>
  </div>
)

export default Navigation;