'use strict';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppRoot from 'containers/AppRoot';

injectTapEventPlugin();

render(
    <AppRoot/>,
    document.getElementById('app-container')
);