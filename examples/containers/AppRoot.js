import React, {Component} from 'react';

import MarkDownEditor from './MarkDownEditor';

import 'sass/global.scss';

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