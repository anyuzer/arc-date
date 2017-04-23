const formatFunctions = require('../functions');
const RawUTCDate = new Date(1);
const timezoneOffsetMS = (RawUTCDate.getTimezoneOffset()*60*1000);
const dayMS = 86400*1000;

describe('Format Functions',()=>{
    //01/01/1970 @ 12:00am (UTC)
    const TestDate = new Date(0);

    it('should return the day as a string with a preceding zero',()=>{
        expect(formatFunctions.d(TestDate)).toBe('01');
        expect(formatFunctions.d(new Date((dayMS*19)))).toBe("20");
    });

    it('should return the shortened day of the week',()=>{
        expect(formatFunctions.D(TestDate)).toBe('Thurs');
    });

    it('should return the day with no preceding zeroes',()=>{
        expect(formatFunctions.j(TestDate)).toBe(1);
    });

    it('should return the ful english string day of the week',()=>{
        expect(formatFunctions.l(TestDate)).toBe('Thursday');
    });

    it('should return the day of the week as a number',()=>{
        expect(formatFunctions.N(TestDate)).toBe(5);
    });

    it('should return the day of the week as a number but with a zero index',()=>{
        expect(formatFunctions.w(TestDate)).toBe(4);
    });

    it('should return the day of the year as a number, 0-365, zero index',()=>{
        expect(formatFunctions.z(TestDate)).toBe(0);
    });

    it('should return the week of the year 0-51',()=>{
        expect(formatFunctions.W(TestDate)).toBe(0);
    });

    it('should return the week of the year 0-51',()=>{
        expect(formatFunctions.W(TestDate)).toBe(0);
    });

    it('should return the full english month of the year',()=>{
        expect(formatFunctions.F(TestDate)).toBe('January');
    });

    it('should return a numeric string for month of the year with preceeding zeroes',()=>{
        expect(formatFunctions.m(TestDate)).toBe('01');
        expect(formatFunctions.m(new Date((dayMS*299)))).toBe("10");
    });

    it('should return a shortened string for english month',()=>{
        expect(formatFunctions.M(TestDate)).toBe('Jan');
    });

    it('should return a numeric string for month of the year with preceeding zeroes',()=>{
        expect(formatFunctions.n(TestDate)).toBe(1);
    });

    it('should return days in the month',()=>{
        expect(formatFunctions.t(new Date('1972-12-25'))).toBe(31);
    });

    it('should return the full year',()=>{
        expect(formatFunctions.Y(TestDate)).toBe(1970);
    });

    it('should return the 2 digit year',()=>{
        expect(formatFunctions.y(TestDate)).toBe("70");
    });

    it('should return am/pm lowercase',()=>{
        expect(formatFunctions.a(TestDate)).toBe("am");
        expect(formatFunctions.a(new Date((dayMS/2)))).toBe("pm");
    });

    it('should return AM/PM uppercase',()=>{
        expect(formatFunctions.A(TestDate)).toBe("AM");
        expect(formatFunctions.A(new Date((dayMS/2)))).toBe("PM");
    });

    it('should return the hour, on 12 hour time non zero indexed',()=>{
        expect(formatFunctions.g(TestDate)).toBe(12);
        expect(formatFunctions.g(new Date((15*60*60*1000)))).toBe(3);
    });

    it('should return the hour, on 24 hour time zero indexed (0-23)',()=>{
        expect(formatFunctions.G(TestDate)).toBe(0);
    });

    it('should return the hour as a string, on 12 hour time with preceeding zeroes',()=>{
        expect(formatFunctions.h(TestDate)).toBe("12");
        expect(formatFunctions.h(new Date((4*60*60*1000)))).toBe("04");
        expect(formatFunctions.h(new Date((11*60*60*1000)))).toBe("11");
    });

    it('should return the hour, as a string on 24 hour time with preceeding zeroes, zero indexed (0-23)',()=>{
        expect(formatFunctions.H(TestDate)).toBe("00");
        expect(formatFunctions.H(new Date((11*60*60*1000)))).toBe("11");
    });

    it('should return the minutes, as a string with preceeding zeroes, zero indexed (00-59)',()=>{
        expect(formatFunctions.i(TestDate)).toBe("00");
        expect(formatFunctions.i(new Date((40*60*1000)))).toBe("40");
    });

    it('should return the seconds, as a string with preceeding zeroes, zero indexed (00-59)',()=>{
        expect(formatFunctions.s(TestDate)).toBe("00");
        expect(formatFunctions.s(new Date((40*1000)))).toBe("40");
    });

    it('should return the milliseconds, as a number without preceeding zeroes, zero indexed (0-999)',()=>{
        expect(formatFunctions.x(TestDate)).toBe(0);
    });

    it('should return the milliseconds, as a string with preceeding zeroes, zero indexed (000-999)',()=>{
        expect(formatFunctions.X(TestDate)).toBe("000");
        expect(formatFunctions.X(new Date(75))).toBe("075");
    });

    it('should return whether or not it is a leap year as a boolean false/true',()=>{
        expect(formatFunctions.L(TestDate)).toBe(false);
        expect(formatFunctions.L(new Date('1972-02-02'))).toBe(true);
    });

    it('should return the english suffix of the day',()=>{
        let SuffixDate = new Date(1);
        expect(formatFunctions.S(SuffixDate)).toBe('st');

        SuffixDate = new Date(dayMS);
        expect(formatFunctions.S(SuffixDate)).toBe('nd');

        SuffixDate = new Date((dayMS*2));
        expect(formatFunctions.S(SuffixDate)).toBe('rd');
    });

    it('should properly get me milliseconds in a month even if the month is December',()=>{
        expect(formatFunctions.getMSInThisMonth(new Date('1972-12-25'))).toBe(2678400000);
    });

});