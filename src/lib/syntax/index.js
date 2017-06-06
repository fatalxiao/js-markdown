import MetaData from './MetaData';
import AtxHeader from './AtxHeader';
import SetextHeader from './SetextHeader';
import Code from './Code';
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
import ReferenceDefine from './ReferenceDefine';
import Paragraph from './Paragraph';

export default {

    blockTypes: [
        'MetaData',
        'AtxHeader', 'SetextHeader', 'Code', 'HorizontalRule', 'List', 'Blockquote', 'Table',
        'ReferenceDefine', 'Paragraph'
    ],
    inlineTypes: [],

    MetaData,
    AtxHeader,
    SetextHeader,
    Code,
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
    ReferenceDefine,
    Paragraph

};