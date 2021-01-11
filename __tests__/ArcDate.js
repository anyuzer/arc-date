const ArcDate = require('../index');
const is = require('arc-is');

describe('ArcDate',()=>{
    let TestDate = new ArcDate(Date.UTC(1981,7,25,0,0,0,0));
    it('Should accept a formatting string and return the formatted date as expected in UTC time',()=>{
        expect(TestDate.format('M jS, Y - h:i A')).toBe('Aug 25th, 1981 - 12:00 AM');
    });

    it('Should be able to accurately format a date for pacific or eastern timezones in daylight or standard time', () => {
        //Pacific test
        let TestDate = new ArcDate(Date.UTC(2018,2,11,9,59,59));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Vancouver')).toBe('Mar 11th, 2018 - 01:59 AM');
        TestDate = new ArcDate(Date.UTC(2018,2,11,10));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Vancouver')).toBe('Mar 11th, 2018 - 03:00 AM');

        //Eastern test
        TestDate = new ArcDate(Date.UTC(2018,2,11,6,59,59));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Toronto')).toBe('Mar 11th, 2018 - 01:59 AM');
        TestDate = new ArcDate(Date.UTC(2018,2,11,7));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Toronto')).toBe('Mar 11th, 2018 - 03:00 AM');

        //Pacific test
        TestDate = new ArcDate(Date.UTC(2018,10,4,8,59,59));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Vancouver')).toBe('Nov 4th, 2018 - 01:59 AM');
        TestDate = new ArcDate(Date.UTC(2018,10,4,9));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Vancouver')).toBe('Nov 4th, 2018 - 01:00 AM');

        //Pacific test
        TestDate = new ArcDate(Date.UTC(2018,10,4,5,59,59));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Toronto')).toBe('Nov 4th, 2018 - 01:59 AM');
        TestDate = new ArcDate(Date.UTC(2018,10,4,6));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Toronto')).toBe('Nov 4th, 2018 - 01:00 AM');
    });

    it('should handle first sunday of november being the 1st for DST', () => {
        TestDate = new ArcDate(Date.UTC(2015,10,1,9));
        expect(TestDate.format('M jS, Y - h:i A', 'America/Vancouver')).toBe('Nov 1st, 2015 - 01:00 AM');
    });

    it('Should accept a non DST timezone, and accurately format it', () => {
        //Pacific test
        let TestDate = new ArcDate(Date.UTC(1981,7,25));
        expect(TestDate.format('M jS, Y - h:i A', 'Africa/Tripoli')).toBe('Aug 25th, 1981 - 02:00 AM');
    });

    it('Should accept a timezone string, and then automatically return an adjusted response when format is called', () => {
        TestDate = new ArcDate(Date.UTC(2018,10,4,5,59,59));
        expect(TestDate.setTZ('America/Toronto').format('M jS, Y - h:i A')).toBe('Nov 4th, 2018 - 01:59 AM');
        TestDate = new ArcDate(Date.UTC(2018,10,4,6));
        expect(TestDate.setTZ('America/Toronto').format('M jS, Y - h:i A')).toBe('Nov 4th, 2018 - 01:00 AM');
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

    it('should return a correct timezone offset in minutes according to the tzString set or if not set, according to local time', () => {
        let TestDate = new ArcDate(1981,7,25);
        TestDate.setTZ('America/Toronto');
        expect(TestDate.getTimezoneOffset()).toBe(240);

        TestDate = new ArcDate(1981,1,1);
        TestDate.setTZ('America/Toronto');
        expect(TestDate.getTimezoneOffset()).toBe(300);

        TestDate = new ArcDate(1981,1,1);
        expect(TestDate.getTimezoneOffset()).toBe((new Date(1981, 1, 1)).getTimezoneOffset());
    });

    it('should return a date that matches the target constructor and timezone', () => {
        const TargetDate = (new ArcDate).setUTCHours(9, 30);
        let TestDate = ArcDate.target('America/Toronto', TargetDate);

        expect(TestDate.format('Y-m-d h:i A')).toBe(TargetDate.format('Y-m-d h:i A'));
        expect(TestDate.getTime()).not.toBe(TargetDate.getTime());
    });

    it('should return a date that matches the target constructor and timezone from a number', () => {
        const TargetDate = Date.UTC(2019, 0, 23);
        let TestDate = ArcDate.target('America/Toronto', TargetDate);

        expect(TestDate.format('Y-m-d h:i A')).toBe((new ArcDate(TargetDate)).format('Y-m-d h:i A'));
        expect(TestDate.getTime()).not.toBe((new ArcDate(TargetDate)).getTime());
    });

    it('should throw a TypeError if wrapping a non date',()=>{
        expect(()=>{
            ArcDate.wrap('FAIL');
        }).toThrow();
    });
});
