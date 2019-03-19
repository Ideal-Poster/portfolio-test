import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
