import MetaData from './block/MetaData';
import AtxHeader from './block/AtxHeader';
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
import ReferenceDefine from './block/ReferenceDefine';
import Paragraph from './block/Paragraph';

import Escaped from './inline/Escaped';
import Image from './inline/Image';
import Anchor from './inline/Anchor';
import AutoLink from './inline/AutoLink';
import InlineCode from './inline/InlineCode';
import BreakRow from './inline/BreakRow';
import Strong from './inline/Strong';
import Emphasize from './inline/Emphasize';

export default {

    blockTypes: [
        'MetaData',
        'AtxHeader', 'BlockCode', 'SetextHeader', 'HorizontalRule', 'List', 'Blockquote', 'Table',
        'Footnote', 'ReferenceDefine', 'Paragraph'
    ],
    inlineTypes: {
        '\\': 'Escaped',
        '![': 'Image',
        '[': 'Anchor',
        '<': 'AutoLink',
        '`': 'InlineCode',
        '  ': 'BreakRow',
        '**': 'Strong',
        '__': 'Strong',
        '*': 'Emphasize',
        '_': 'Emphasize'
    },

    // block
    MetaData,
    AtxHeader,
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
    ReferenceDefine,
    Paragraph,

    // inline
    Escaped,
    Image,
    Anchor,
    AutoLink,
    InlineCode,
    BreakRow,
    Strong,
    Emphasize

};