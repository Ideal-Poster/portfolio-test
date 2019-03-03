import React from 'react';
import './project.css';

import projectsAPI from '../../api';

import { Col, Row } from 'antd';


const Project = (props) => {
  const index = parseInt(props.match.params.number);
  const project = projectsAPI.projects[index];
  // console.log('MUTUMBO' + projectsAPI.projects);

  return(
    <div id="project__container">
      <Col offset={1} span={22} style={{background: 'green'}}>
        <Col span={12}>
          {/* <p>hello my name is blinko the sintk josep</p> */}
          <img className="project__img" src={ require(`../../assets/img/${project.img}`) } alt=""/>
        </Col>
      </Col>
    </div>
  );

};

export default Project;