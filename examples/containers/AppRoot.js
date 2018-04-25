import React, {Component} from 'react';

import MarkDownEditor from './MarkDownEditor';

import 'assets/font-awesome/css/font-awesome.min.css';
import 'sass/global.scss';
import 'sass/Root.scss';
import 'sass/example.scss';

export default class AppRoot extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById('loading').style.display = 'none';
    }

    render() {
        return (
            <div className="root">
                <MarkDownEditor/>
            </div>
        );
    }
}