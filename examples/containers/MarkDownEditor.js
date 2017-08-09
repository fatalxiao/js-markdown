import React, {Component} from 'react';
import 'github-markdown-css';

import ReactTextEdit from 'react-text-edit';

import Event from 'utils/Event';

import MarkDownData from 'assets/MarkDown.md';

import 'assets/sass/MarkDownEditor.scss';

export default class MarkDownEditor extends Component {

    constructor(props) {

        super(props);

        this.nextStateAnimationFrameId = null;

        this.state = {

            data: MarkDownData,
            markdownHTML: '',

            fullWidth: window.innerWidth,
            editorWidthPerCent: .5,
            editorHeight: window.innerHeight,

            editorScrollPerCent: 0,

            isResizing: false

        };

        this.parse = this::this.parse;
        this.setNextState = this::this.setNextState;
        this.changeHandle = this::this.changeHandle;
        this.markdownBodyScrollHandle = this::this.markdownBodyScrollHandle;
        this.editorScrollHandle = this::this.editorScrollHandle;
        this.resizeHandle = this::this.resizeHandle;
        this.mouseDownHandle = this::this.mouseDownHandle;
        this.mouseMoveHandle = this::this.mouseMoveHandle;
        this.mouseUpHandle = this::this.mouseUpHandle;

    }

    parse(data) {

        const self = this,
            MyWorker = require('worker-loader!./markdownWorker.js'),
            worker = new MyWorker();

        worker.onmessage = function (event) {
            self.setState({
                markdownHTML: event.data.html
            });
        };

        worker.postMessage(data);

    }

    setNextState(state) {

        if (this.nextStateAnimationFrameId) {
            cancelAnimationFrame(this.nextStateAnimationFrameId);
        }

        this.nextStateAnimationFrameId = requestAnimationFrame(() => {
            this.nextStateAnimationFrameId = null;
            this.setState(state);
        });

    }

    changeHandle(data) {
        if (data !== this.state.data) {
            this.setState({
                data
            }, () => {
                this.parse(data);
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

    editorScrollHandle({topPerCent}) {
        const el = this.refs.markdownBody;
        el.scrollTop = (el.scrollHeight - window.innerHeight) * topPerCent;
    }

    resizeHandle() {
        this.setNextState({
            fullWidth: window.innerWidth
        });
    }

    mouseDownHandle() {
        this.setState({
            isResizing: true
        });
    }

    mouseMoveHandle(e) {

        if (!this.state.isResizing) {
            return;
        }

        this.setNextState({
            editorWidthPerCent: (window.innerWidth - e.clientX) / window.innerWidth,
            editorHeight: window.innerHeight
        });

    }

    mouseUpHandle() {
        this.setState({
            isResizing: false
        });
    }

    componentDidMount() {

        Event.addEvent(window, 'resize', this.resizeHandle);
        Event.addEvent(document, 'mousemove', this.mouseMoveHandle);
        Event.addEvent(document, 'mouseup', this.mouseUpHandle);

        this.parse(MarkDownData);

    }

    componentWillUnmount() {
        Event.removeEvent(window, 'resize', this.resizeHandle);
        Event.removeEvent(document, 'mousemove', this.mouseMoveHandle);
        Event.removeEvent(document, 'mouseup', this.mouseUpHandle);
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

                <ReactTextEdit className="mark-down-editor"
                               style={markDownEditorStyle}
                               data={data}
                               width={window.innerWidth * editorWidthPerCent}
                               height={editorHeight}
                               scrollTopPerCent={editorScrollPerCent}
                               options={{
                                   scrollBottomBlankHeight: 0
                               }}
                               onChange={this.changeHandle}
                               onScroll={this.editorScrollHandle}/>

                <div className="drag-edge"
                     style={dragEdgeStyle}
                     onMouseDown={this.mouseDownHandle}></div>

            </div>
        );
    }
}