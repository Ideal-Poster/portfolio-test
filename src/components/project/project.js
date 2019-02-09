import React from 'react';
import './project.css';

import projectsAPI from '../../api';

import { Col } from 'antd';

const Project = (props) => {
  const index = parseInt(props.match.params.number);
  const project = projectsAPI.projects[index];

  return(
    <div id="project__container">
      <p>hello</p>
    </div>
  );

};

export default Project;