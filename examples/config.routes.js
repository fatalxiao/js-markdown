import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Root from './containers/Root';
import MarkDownEditor from './containers/MarkDownEditor';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={MarkDownEditor}/>
    </Route>
);