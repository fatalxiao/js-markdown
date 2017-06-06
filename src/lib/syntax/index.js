import MetaData from './MetaData';
import AtxHeader from './AtxHeader';
import SetextHeader from './SetextHeader';
import Code from './Code';
import HorizontalRule from './HorizontalRule';
import List from './List';
import ListItem from './ListItem';
import Blockquote from './Blockquote';
import ReferenceDefine from './ReferenceDefine';
import Paragraph from './Paragraph';

export default {

    blockTypes: [
        'MetaData',
        'AtxHeader', 'SetextHeader', 'Code', 'HorizontalRule', 'List', 'Blockquote',
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
    ReferenceDefine,
    Paragraph

};