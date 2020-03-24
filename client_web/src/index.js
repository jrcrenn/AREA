import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import Apptmp from './Apptmp';

ReactDOM.render(<Apptmp />, document.getElementById('root'));

serviceWorker.unregister();
