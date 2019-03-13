import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Project from '../components/project/project';
import Slideshow from '../components/slideshow/Slideshow';
import SplashPage from '../components/splash-page/splash-page';

import { TransitionGroup, Transition } from "react-transition-group";
import { TweenLite, TweenMax } from 'gsap';

const completeCall = target => {
  TweenLite.set(target, { clearProps: "position, width" });
};
const AppRoutes = (props) => (

  <TransitionGroup>
    <Transition
      key={props.location.pathname}
      timeout={{
        enter: 1000,
        exit: 1000
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEnter={
        node => {
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
          TweenLite.to(node, 1, {
            autoAlpha: 1,
            onComplete: completeCall,
            onCompleteParams: [node],
            delay: 2
          });
        }
      } // on enter end

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

        TweenLite.to(node, 1, {
          position: "fixed",
          opacity: 0,
          delay: 2
        });
      }}
      >

      <Switch location={ props.location }>
        <Route exact path="/" component={ SplashPage }/>
        <Route exact path="/home" component={ Slideshow }/>
        <Route path="/site/:number" component={ Project } />
      </Switch>
    </Transition>
  </TransitionGroup>


);



export default AppRoutes;