/**
 * @file index.js
 */

'use strict';

import '@babel/polyfill';

import React from 'react';
import {render} from 'react-dom';

import Editor from './Editor';

render(
    <Editor/>,
    document.getElementById('app-container')
);
