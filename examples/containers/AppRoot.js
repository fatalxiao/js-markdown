/**
 * @file AppRoot.js
 */

import React, {Component} from 'react';

// Statics
import MarkDownData from 'assets/MarkDown.md';

// Vendors
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';
import Markdown from 'src';
import Event from 'vendors/Event';

// Styles
import 'sass/global.scss';
import 'assets/sass/MarkDownEditor.scss';
import 'github-markdown-css';
import 'assets/sass/selfDefinedSyntax.scss';

class AppRoot extends Component {

    constructor(props) {

        super(props);

        this.parseOption = {
            dialect: Markdown.Dialect.DERBY
        };

        this.state = {

            data: MarkDownData,
            markdownHTML: Markdown.parse(MarkDownData, this.parseOption),

            editorWidthPerCent: .5,

            isResizing: false

        };

    }

    componentDidMount() {

        document.getElementById('loading').style.display = 'none';

        Event.addEvent(document, 'mousemove', this.handleMouseMove);
        Event.addEvent(document, 'mouseup', this.handleMouseUp);

    }

    componentWillUnmount() {
        Event.removeEvent(document, 'mousemove', this.handleMouseMove);
        Event.removeEvent(document, 'mouseup', this.handleMouseUp);
    }

    handleChange = data => {
        if (data !== this.state.data) {
            this.setState({
                data,
                markdownHTML: Markdown.parse(data, this.parseOption)
            });
        }
    };

    handleScroll = editor => {
        this.markdownBodyEl.scrollTop =
            (this.markdownBodyEl.scrollHeight - window.innerHeight)
            *
            (editor.renderer.scrollTop / (editor.renderer.layerConfig.maxHeight - editor.renderer.layerConfig.height));
    };

    handleMouseDown = () => {
        this.setState({
            isResizing: true
        });
    };

    handleMouseMove = e => {

        if (!this.state.isResizing) {
            return;
        }

        this.setState({
            editorWidthPerCent: (window.innerWidth - e.clientX) / window.innerWidth
        });

    };

    handleMouseUp = () => {
        this.setState({
            isResizing: false
        });
    };

    render() {

        const {data, markdownHTML, editorWidthPerCent, isResizing} = this.state,
            markdownBodyWidth = window.innerWidth * (1 - editorWidthPerCent);

        return (
            <div className={`mark-down-editor-wrapper ${isResizing ? 'resizing' : ''}`}>

                <div ref={el => this.markdownBodyEl = el}
                     className="markdown-body"
                     style={{width: markdownBodyWidth}}
                     dangerouslySetInnerHTML={{__html: markdownHTML}}></div>

                <AceEditor className="mark-down-editor"
                           style={{left: markdownBodyWidth}}
                           width={`calc(100% - ${markdownBodyWidth}px)`}
                           height="100%"
                           mode="markdown"
                           theme="monokai"
                           focus={true}
                           fontSize={14}
                           showPrintMargin={false}
                           showGutter={false}
                           highlightActiveLine={true}
                           setOptions={{
                               enableBasicAutocompletion: false,
                               enableLiveAutocompletion: false,
                               enableSnippets: false,
                               showLineNumbers: false,
                               scrollPastEnd: .4,
                               tabSize: 4
                           }}
                           value={data}
                           onChange={this.handleChange}
                           onScroll={this.handleScroll}/>

                <div className="drag-edge"
                     style={{left: markdownBodyWidth - 4}}
                     onMouseDown={this.handleMouseDown}></div>

            </div>
        );
    }
}

export default AppRoot;
