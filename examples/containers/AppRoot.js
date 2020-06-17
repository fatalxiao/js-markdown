/**
 * @file AppRoot.js
 */

import React, {useState, useEffect, useCallback, useRef} from 'react';

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

function AppRoot() {

    const PARSE_OPTION = {
            dialect: Markdown.Dialect.DERBY
        },

        markdownBody = useRef(null),

        [data, setData] = useState(MarkDownData),
        [markdownHTML, setMarkdownHTML] = useState(Markdown.parse(MarkDownData, PARSE_OPTION)),
        [isResizing, setIsResizing] = useState(false),
        [editorWidthPerCent, setEditorWidthPerCent] = useState(.5),

        markdownBodyWidth = window.innerWidth * (1 - editorWidthPerCent),

        /**
         * handle md text changed
         */
        handleChange = useCallback(nextData => {
            if (nextData !== data) {
                setData(nextData);
                setMarkdownHTML(Markdown.parse(nextData, PARSE_OPTION));
            }
        }),

        /**
         * handle mouse down when start dragging edge
         */
        handleMouseDown = useCallback(() => setIsResizing(true)),

        /**
         * handle mouse move when dragging edge
         */
        handleMouseMove = useCallback(() => {

            if (!isResizing) {
                return;
            }

            setEditorWidthPerCent((window.innerWidth - e.clientX) / window.innerWidth);

        }),

        /**
         * handle mouse up to stop dragging
         */
        handleMouseUp = useCallback(() => setIsResizing(false)),

        /**
         * sync html scroll top when editor scrolling
         */
        handleScroll = useCallback(editor =>
            markdownBody.current.scrollTop = (markdownBody.current.scrollHeight - window.innerHeight)
                * (editor.renderer.scrollTop / (editor.renderer.layerConfig.maxHeight - editor.renderer.layerConfig.height))
        );

    useEffect(() => {

        // mount
        document.getElementById('loading').style.display = 'none';

        Event.addEvent(document, 'mousemove', handleMouseMove);
        Event.addEvent(document, 'mouseup', handleMouseUp);

        // unmount
        return () => {
            Event.removeEvent(document, 'mousemove', handleMouseMove);
            Event.removeEvent(document, 'mouseup', handleMouseUp);
        };

    }, []);

    return (
        <div className={`mark-down-editor-wrapper ${isResizing ? 'resizing' : ''}`}>

            <div ref={markdownBody}
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
                       onChange={handleChange}
                       onScroll={handleScroll}/>

            <div className="drag-edge"
                 style={{left: markdownBodyWidth - 4}}
                 onMouseDown={handleMouseDown}></div>

        </div>
    );
}

export default AppRoot;
