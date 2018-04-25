import React, {Component} from 'react';
import AceEditor from 'react-ace';
import 'github-markdown-css';

import Markdown from 'src';

import Event from 'vendors/Event';

import MarkDownData from 'assets/MarkDown.md';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import 'assets/sass/MarkDownEditor.scss';

class MarkDownEditor extends Component {

    constructor(props) {

        super(props);

        this.state = {

            data: MarkDownData,
            markdownHTML: Markdown.parse(MarkDownData).html,

            fullWidth: window.innerWidth,
            editorWidthPerCent: .5,
            editorHeight: window.innerHeight,

            editorScrollPerCent: 0,

            isResizing: false

        };

        this.changeHandler = ::this.changeHandler;
        this.markdownBodyScrollHandle = ::this.markdownBodyScrollHandle;
        this.editorScrollHandler = ::this.editorScrollHandler;
        this.resizeHandler = ::this.resizeHandler;
        this.mouseDownHandler = ::this.mouseDownHandler;
        this.mouseMoveHandler = ::this.mouseMoveHandler;
        this.mouseUpHandler = ::this.mouseUpHandler;

    }

    changeHandler(data) {
        if (data !== this.state.data) {
            this.setState({
                data,
                markdownHTML: Markdown.parse(data).html
            });
        }
    }

    markdownBodyScrollHandle() {

        const el = this.refs.markdownBody,
            scrollTop = el.scrollTop;

        this.setState({
            editorScrollPerCent: scrollTop / (el.scrollHeight - window.innerHeight)
        });

    }

    editorScrollHandler({topPerCent}) {
        const el = this.refs.markdownBody;
        el.scrollTop = (el.scrollHeight - window.innerHeight) * topPerCent;
    }

    resizeHandler() {
        this.setState({
            fullWidth: window.innerWidth
        });
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
            editorWidthPerCent: (window.innerWidth - e.clientX) / window.innerWidth,
            editorHeight: window.innerHeight
        });

    }

    mouseUpHandler() {
        this.setState({
            isResizing: false
        });
    }

    componentDidMount() {
        Event.addEvent(window, 'resize', this.resizeHandler);
        Event.addEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.addEvent(document, 'mouseup', this.mouseUpHandler);
    }

    componentWillUnmount() {
        Event.removeEvent(window, 'resize', this.resizeHandler);
        Event.removeEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.removeEvent(document, 'mouseup', this.mouseUpHandler);
    }

    render() {

        const {data, markdownHTML, editorWidthPerCent, editorHeight, isResizing, editorScrollPerCent} = this.state,
            html = {__html: markdownHTML},
            markdownBodyWidth = window.innerWidth * (1 - editorWidthPerCent),
            markdownBodyStyle = {
                width: markdownBodyWidth
            },
            markDownEditorStyle = {
                left: markdownBodyWidth
            },
            dragEdgeStyle = {
                left: markdownBodyWidth - 1
            };

        return (
            <div className={`mark-down-editor-wrapper ${isResizing ? 'resizing' : ''}`}>

                <div ref="markdownBody"
                     className="markdown-body"
                     style={markdownBodyStyle}
                     dangerouslySetInnerHTML={html}
                     onScroll={this.markdownBodyScrollHandle}></div>

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
                               $blockScrolling: true,
                               enableBasicAutocompletion: false,
                               enableLiveAutocompletion: false,
                               enableSnippets: false,
                               showLineNumbers: false,
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

export default MarkDownEditor;