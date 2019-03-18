import React from 'react';
import './Project.css';

import projectsAPI from '../../api';

import { Col } from 'antd';
import { Link }from 'react-router-dom';



const Project = (props) => {
  const index = parseInt(props.match.params.number, 10);
  const project = projectsAPI.projects[index];

  return(
    <div id="project__container">
      <Link to="/home">
        <p>back</p>
      </Link>
      <Col offset={1} span={22} style={{background: 'green'}}>
        <Col span={12}>
          <img className="project__img" src={ require(`../../assets/img/${project.img}`) } alt=""/>
        </Col>
      </Col>
    </div>
  );

};

export default Project;