import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Project from '../components/project/Project';
import Slideshow from '../components/slideshow/Slideshow';
import SplashPage from '../components/splash-page/splash-page';

import { TransitionGroup, Transition } from "react-transition-group";
import { TweenLite, TweenMax } from 'gsap';

const completeCall = target => {
  TweenLite.set(target, { clearProps: "position, width" });
};

class AppRoutes extends React.Component {
  render() {
    return(
      <TransitionGroup>
        <Transition
          key={this.props.location.pathname}
          timeout={{
            enter: 2500,
            exit: 2000
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
              TweenLite.to(node, 0.5, {
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

            TweenLite.to(node, 0.5, {
              position: "fixed",
              opacity: 0,
              delay: 2
            });
          }}>

          <Switch location={ this.props.location }>
            <Route exact path="/" component={ SplashPage }/>
            <Route exact path="/home" component={ Slideshow }/>
            {/* <Route path='/home' render={(props) => <Slideshow  {...props} isAuthed={true} />}/> */}
            <Route path="/site/:number" component={ Project } />
          </Switch>
        </Transition>
      </TransitionGroup>
    );
  }
};


export default AppRoutes;