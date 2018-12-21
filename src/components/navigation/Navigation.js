import React from 'react';
import '../navigation/Navigation.css'


class Navigation extends React.Component {
  render() {
    return(
      <div>

        <ul id="name">
          <li>Malcolm Gourdine</li>
        </ul>

        <ul id="navlist">
          <li>Portfolio</li>
          <li>About</li>
          <li>Contact</li>
        </ul>


        <ul id="links">
          <li>Github</li>
          <li>Instagram</li>
        </ul>

        <div id="title">
          <div>Web Design & Web Development</div>
        </div>

      </div>
    );
  }
}

export default Navigation;