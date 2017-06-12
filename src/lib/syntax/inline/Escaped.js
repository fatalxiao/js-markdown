/**
 * match a escaped identifier
 * 
 * valid escaped identifier:
 * 
 *  \ , ` , * , _ , { , } , < , > , [ , ] , ( , ), # , + , . , ! , - , ~ , " , = , ^
 * 
 */

'use strict';

function parse(str, children, renderTree) {

    if (/^\\[\\`\*_{}<>\[\]()#\+.!\-~"=\^]/.test(str)) {
        return [{
            type: 'Text',
            rawValue: str.at(1)
        }, 2];
    }

    return [{
        type: 'Escaped',
        rawValue: str.at(0)
    }, 1];

}

function render(data = '', node) {
    return '\\';
}

export default {
    parse,
    render
};