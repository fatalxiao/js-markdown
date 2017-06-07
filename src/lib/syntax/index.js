import MetaData from './MetaData';
import AtxHeader from './AtxHeader';
import SetextHeader from './SetextHeader';
import BlockCode from './BlockCode';
import HorizontalRule from './HorizontalRule';
import List from './List';
import ListItem from './ListItem';
import Blockquote from './Blockquote';
import Table from './Table';
import TableHead from './TableHead';
import TableHeadCell from './TableHeadCell';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableDataCell from './TableDataCell';
import Footnote from './Footnote';
import ReferenceDefine from './ReferenceDefine';
import Paragraph from './Paragraph';

export default {

    blockTypes: [
        'MetaData',
        'AtxHeader', 'BlockCode', 'SetextHeader', 'HorizontalRule', 'List', 'Blockquote', 'Table',
        'Footnote', 'ReferenceDefine', 'Paragraph'
    ],
    inlineTypes: [],

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
    Paragraph

};