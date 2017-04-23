const ArcDate = require('../index');
const is = require('arc-is');

describe('ArcDate',()=>{
    let TestDate = new ArcDate(Date.UTC(1981,7,25,0,0,0,0));
    it('Should accept a formatting string and return the formatted date as expected in UTC time',()=>{
        expect(TestDate.format('M jS, Y - h:i A')).toBe('Aug 25th, 1981 - 12:00 AM');
    });

    it('Should accept a formatting string and return the formatted date as expected in local time',()=>{
        expect(TestDate.formatLocal('M jS, Y - h:i A')).toBe('Aug 24th, 1981 - 05:00 PM');
    });

    it('Should accept a new date in local time, and return the correct format in local time',()=>{
        let TestDate = new ArcDate(1981,7,25);
        expect(TestDate.formatLocal('M jS, Y - h:i A')).toBe('Aug 25th, 1981 - 12:00 AM');
    });

    it('should return ArcDate as a constructor, or date as a base class',()=>{
        expect(is(TestDate)).toBe('date');
        expect(is(TestDate,true)).toBe('ArcDate');
    });

    it('should return a new ArcDate object from a Date object, or if it is already an ArcDate should return the same object',()=>{
        let NewDate = ArcDate.wrap(new Date('1981-08-25'));
        expect(is(NewDate,true)).toBe('ArcDate');
        expect(ArcDate.wrap(NewDate)).toBe(NewDate);
    });

    it('should throw a TypeError if wrapping a non date',()=>{
        expect(()=>{
            ArcDate.wrap('FAIL');
        }).toThrow();
    });

});
