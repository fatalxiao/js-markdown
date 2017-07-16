'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Escaped Test', () => {

    it('default', () => {

        const md = '\\ , \` , \* , \_ , \{ , \} , \< , \> , \[ , \] , \( , \), \# , \+ , \. , \! , \- , \~ , \" , \= , \^',
            result = '<p>\\ , ` , * , _ , { , } , < , > , [ , ] , ( , ), # , + , . , ! , - , ~ , " , = , ^</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});