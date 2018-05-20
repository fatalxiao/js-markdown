'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Escaped Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '\\ , \` , \* , \_ , \{ , \} , \< , \> , \[ , \] , \( , \), \# , \+ , \. , \! , \- , \~ , \" , \= , \^'
        )).to.be.equal(
            '<p>\\ , ` , * , _ , { , } , < , > , [ , ] , ( , ), # , + , . , ! , - , ~ , " , = , ^</p>'
        )
    );

});