import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Project from '../components/project/project';
import Slideshow from '../components/slideshow/Slideshow';

import { TransitionGroup, Transition } from "react-transition-group";
import { TweenLite, TweenMax } from 'gsap';

const completeCall = target => {
  TweenLite.set(target, { clearProps: "position, width" });
};
const AppRoutes = (props) => (
  <TransitionGroup>
    <Transition
      key={props.location.pathname}
      timeout={2000}
      mountOnEnter={true}
      unmountOnExit={true}
      onEnter={node => {
        TweenMax.killTweensOf(node);
        // Node change hands animation
        const parent = node.parentNode;
        const targetWidth =
          parent.clientWidth -
          parseFloat(getComputedStyle(node.parentNode).paddingLeft) * 2;
        // set the position and properties of the entering element
        TweenLite.set(node, {
          position: "fixed",
          autoAlpha: 0,
          width: targetWidth
        });
        // animate in the element
        TweenLite.to(node, 0.5, {
          autoAlpha: 1,
          onComplete: completeCall,
          onCompleteParams: [node],
          delay: 1
        });

          // console.log(props.history);

          // // first kill all tweens of the target
          // hideSlides(node);
        }} // on enter end

        onExit={node => {

          TweenMax.killTweensOf(node);
          const parent = node.parentNode;
          const targetWidth =
            parent.clientWidth -
            parseFloat(getComputedStyle(node.parentNode).paddingLeft) * 2;

          // set the position of the element
          TweenLite.set(node, {
            position: "fixed",
            width: targetWidth
          });

          TweenLite.to(node, 0.5, {
            position: "fixed",
            opacity: 0,
            delay: 1

          });

          // Project image exit animation
          // const image = node.childNodes[1].childNodes[0].childNodes[0];

          // projectImageExit(node);
          // projectNameExit(node);

        }} >

      <Switch location={ props.location }>
        <Route exact path="/" component={ Slideshow }/>
        <Route path="/site/:number" component={ Project } />
      </Switch>
    </Transition>
  </TransitionGroup>
);



export default AppRoutes;