import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Project from '../components/project/project';
import Slideshow from '../components/slideshow/Slideshow';
import SplashPage from '../components/splash-page/splash-page';

import { TransitionGroup, Transition } from "react-transition-group";
import { TweenLite, TweenMax } from 'gsap';

import { connect } from 'react-redux';

import _ from 'lodash';

const completeCall = target => {
  TweenLite.set(target, { clearProps: "position, width" });
};

class AppRoutes extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   colorScheme: 0,
    //   repeatArray: [0, 1, 2, 3, 4, 5]
    // };
  }

  // updateColorScheme() {
  //   // clone state array
  //   let repeatArrayClone = [0, 1, 2, 3, 4, 5];
  //   // select number from array
  //   let number = repeatArray[Math.floor(Math.random() * repeatArray.length)];
  //   // remove number from clone
  //   _.remove(repeatArrayClone, function(n) {
  //     return n === number
  //   });
  // }

  render() {
    return(
      <div>
        <h1 onClick={this.props.onSelectScheme}>hello</h1>
      <TransitionGroup>
      <Transition
        key={this.props.location.pathname}
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
              delay: 1
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
            delay: 1
          });
        }}>

        <Switch location={ this.props.location }>
          <Route exact path="/" component={ SplashPage }/>
          {/* <Route exact path="/home" component={ Slideshow }/> */}
          <Route path='/home' render={(props) => <Slideshow  {...props} isAuthed={true} />}/>
          <Route path="/site/:number" component={ Project } />
        </Switch>
      </Transition>
    </TransitionGroup>

      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    ctr: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectScheme: ()=> dispatch({type: 'SELECT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppRoutes);
// export default AppRoutes;