'use strict';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import AppRoot from 'containers/AppRoot';

render(
    <AppRoot/>,
    document.getElementById('app-container')
);