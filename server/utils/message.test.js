var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'sandra';
        var text = 'hello'
        var res = generateMessage(from,text);
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        expect(res).toInclude({from, text}); //simpler
        expect(res.createdAt).toBeA('number');
    });
});