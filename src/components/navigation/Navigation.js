import React from 'react';
import '../navigation/Navigation.css'
import projectApi from '../../api';

const Navigation = () => (
  <div>
    <div id="position__tracker">
      {/* <ul>
        { projectApi.projects.map((project, i) =>
          <li>
            <div className="number">
              -0{i+1}
            </div>
            <div className="project__name">
              {project.name}
            </div>
          </li>
        )}
      </ul> */}
    </div>
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
)

export default Navigation;