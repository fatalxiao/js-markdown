'use strict';

import MetaData from './block/MetaData';
import AtxHeader from './block/AtxHeader';
import Mark from './block/Mark';
import SetextHeader from './block/SetextHeader';
import BlockCode from './block/BlockCode';
import HorizontalRule from './block/HorizontalRule';
import List from './block/List';
import ListItem from './block/ListItem';
import Blockquote from './block/Blockquote';
import Table from './block/Table';
import TableHead from './block/TableHead';
import TableHeadCell from './block/TableHeadCell';
import TableBody from './block/TableBody';
import TableRow from './block/TableRow';
import TableDataCell from './block/TableDataCell';
import Footnote from './block/Footnote';
import FootnoteListItem from './block/FootnoteListItem';
import ReferenceDefine from './block/ReferenceDefine';
import Paragraph from './block/Paragraph';

import Escaped from './inline/Escaped';
import Image from './inline/Image';
import Superscript from './inline/Superscript';
import Link from './inline/Link';
import AutoLink from './inline/AutoLink';
import InlineCode from './inline/InlineCode';
import BreakRow from './inline/BreakRow';
import Emphasize from './inline/Emphasize';

export default {

    DEFAULT: {
        blockTypes: [
            'AtxHeader', 'BlockCode', 'SetextHeader', 'HorizontalRule', 'Table', 'List', 'Blockquote',
            'Footnote', 'ReferenceDefine', 'MetaData', 'Paragraph'
        ],
        inlineTypes: {
            '\\': 'Escaped',
            '![': 'Image',
            '[^': 'Superscript',
            '[': 'Link',
            '<': 'AutoLink',
            '`': 'InlineCode',
            '  \n': 'BreakRow',
            '*': 'Emphasize',
            '_': 'Emphasize'
        }
    },

    DERBY: {
        blockTypes: [
            'AtxHeader', 'Mark', 'BlockCode', 'SetextHeader', 'HorizontalRule', 'Table', 'List', 'Blockquote',
            'Footnote', 'ReferenceDefine', 'MetaData', 'Paragraph'
        ],
        inlineTypes: {
            '\\': 'Escaped',
            '![': 'Image',
            '[^': 'Superscript',
            '[': 'Link',
            '<': 'AutoLink',
            '`': 'InlineCode',
            '  \n': 'BreakRow',
            '*': 'Emphasize',
            '_': 'Emphasize'
        }
    },

    // block
    MetaData,
    AtxHeader,
    Mark,
    SetextHeader,
    BlockCode,
    HorizontalRule,
    List,
    ListItem,
    Blockquote,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableDataCell,
    Footnote,
    FootnoteListItem,
    ReferenceDefine,
    Paragraph,

    // inline
    Escaped,
    Image,
    Superscript,
    Link,
    AutoLink,
    InlineCode,
    BreakRow,
    Emphasize

};
