import React, {Component} from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

import Markdown from 'src';
import Event from 'vendors/Event';
import MarkDownData from 'assets/MarkDown.md';

import 'assets/font-awesome/css/fontawesome-all.min.css';
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

        this.changeHandler = ::this.changeHandler;
        this.editorScrollHandler = ::this.editorScrollHandler;
        this.mouseDownHandler = ::this.mouseDownHandler;
        this.mouseMoveHandler = ::this.mouseMoveHandler;
        this.mouseUpHandler = ::this.mouseUpHandler;

    }

    changeHandler(data) {
        if (data !== this.state.data) {
            this.setState({
                data,
                markdownHTML: Markdown.parse(data, this.parseOption)
            });
        }
    }

    editorScrollHandler(editor) {
        this.markdownBodyEl.scrollTop =
            (this.markdownBodyEl.scrollHeight - window.innerHeight)
            *
            (editor.renderer.scrollTop / (editor.renderer.layerConfig.maxHeight - editor.renderer.layerConfig.height));
    }

    mouseDownHandler() {
        this.setState({
            isResizing: true
        });
    }

    mouseMoveHandler(e) {

        if (!this.state.isResizing) {
            return;
        }

        this.setState({
            editorWidthPerCent: (window.innerWidth - e.clientX) / window.innerWidth
        });

    }

    mouseUpHandler() {
        this.setState({
            isResizing: false
        });
    }

    componentDidMount() {

        document.getElementById('loading').style.display = 'none';

        Event.addEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.addEvent(document, 'mouseup', this.mouseUpHandler);

    }

    componentWillUnmount() {
        Event.removeEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.removeEvent(document, 'mouseup', this.mouseUpHandler);
    }

    render() {

        const {data, markdownHTML, editorWidthPerCent, isResizing} = this.state,

            markdownBodyWidth = window.innerWidth * (1 - editorWidthPerCent),

            markdownBodyStyle = {
                width: markdownBodyWidth
            },
            markDownEditorStyle = {
                left: markdownBodyWidth
            },
            dragEdgeStyle = {
                left: markdownBodyWidth - 4
            };

        return (
            <div className={`mark-down-editor-wrapper ${isResizing ? 'resizing' : ''}`}>

                <div ref={el => this.markdownBodyEl = el}
                     className="markdown-body"
                     style={markdownBodyStyle}
                     dangerouslySetInnerHTML={{__html: markdownHTML}}></div>

                <AceEditor className="mark-down-editor"
                           style={markDownEditorStyle}
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
                           onChange={this.changeHandler}
                           onScroll={this.editorScrollHandler}/>

                <div className="drag-edge"
                     style={dragEdgeStyle}
                     onMouseDown={this.mouseDownHandler}></div>

            </div>
        );
    }
}

export default AppRoot;