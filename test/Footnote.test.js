'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Footnote Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            'Footnote1 [^footnote1]\n'
            + 'Footnote2 [^2]\n'
            + '[^2]: Here is the footnote No.2.\n'
            + 'Footnote3 [^footnote3]\n'
            + 'Footnote4 [^4]\n'
            + 'Footnote5 [^footnote5]\n'
            + '\n'
            + '[^4]: Here is the footnote No.4.\n'
            + '\n'
            + '[^footnote1]: Here is the footnote No.1.\n'
            + '[^footnote3]: Here is the footnote No.3.\n'
            + '[^footnote5]: Here is the footnote No.5.'
        )).to.be.equal(
            '<p>Footnote1 <sup id="fnref1">[<a href="#fn1" rel="footnote">1</a>]</sup>\n'
            + 'Footnote2 <sup id="fnref2">[<a href="#fn2" rel="footnote">2</a>]</sup>\n'
            + 'Footnote3 <sup id="fnref3">[<a href="#fn3" rel="footnote">3</a>]</sup>\n'
            + 'Footnote4 <sup id="fnref4">[<a href="#fn4" rel="footnote">4</a>]</sup>\n'
            + 'Footnote5 <sup id="fnref5">[<a href="#fn5" rel="footnote">5</a>]</sup></p>'
            + '<div class="footnotes">'
            + '<hr>'
            + '<ol>'
            + '<li id="fn1">Here is the footnote No.1.<a href="#fnref1" rev="footnote">↩</a></li>'
            + '<li id="fn2">Here is the footnote No.2.<a href="#fnref2" rev="footnote">↩</a></li>'
            + '<li id="fn3">Here is the footnote No.3.<a href="#fnref3" rev="footnote">↩</a></li>'
            + '<li id="fn4">Here is the footnote No.4.<a href="#fnref4" rev="footnote">↩</a></li>'
            + '<li id="fn5">Here is the footnote No.5.<a href="#fnref5" rev="footnote">↩</a></li>'
            + '</ol>'
            + '</div>'
        )
    );

});