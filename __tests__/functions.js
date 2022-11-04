import functions from "../functions.js";

const RawUTCDate = new Date(1);
const timezoneOffsetMS = (RawUTCDate.getTimezoneOffset()*60*1000);
const dayMS = 86400*1000;

describe('Format Functions',()=>{
    //01/01/1970 @ 12:00am (UTC)
    const TestDate = new Date(0);

    it('should return the day as a string with a preceding zero',()=>{
        expect(functions.d(TestDate)).toBe('01');
        expect(functions.d(new Date((dayMS*19)))).toBe("20");
    });

    it('should return the shortened day of the week',()=>{
        expect(functions.D(TestDate)).toBe('Thurs');
    });

    it('should return the day with no preceding zeroes',()=>{
        expect(functions.j(TestDate)).toBe(1);
    });

    it('should return the ful english string day of the week',()=>{
        expect(functions.l(TestDate)).toBe('Thursday');
    });

    it('should return the day of the week as a number',()=>{
        expect(functions.N(TestDate)).toBe(5);
    });

    it('should return the day of the week as a number but with a zero index',()=>{
        expect(functions.w(TestDate)).toBe(4);
    });

    it('should return the day of the year as a number, 0-365, zero index',()=>{
        expect(functions.z(TestDate)).toBe(0);
    });

    it('should return the week of the year 0-51',()=>{
        expect(functions.W(TestDate)).toBe(0);
    });

    it('should return the week of the year 0-51',()=>{
        expect(functions.W(TestDate)).toBe(0);
    });

    it('should return the full english month of the year',()=>{
        expect(functions.F(TestDate)).toBe('January');
    });

    it('should return a numeric string for month of the year with preceeding zeroes',()=>{
        expect(functions.m(TestDate)).toBe('01');
        expect(functions.m(new Date((dayMS*299)))).toBe("10");
    });

    it('should return a shortened string for english month',()=>{
        expect(functions.M(TestDate)).toBe('Jan');
    });

    it('should return a numeric string for month of the year with preceeding zeroes',()=>{
        expect(functions.n(TestDate)).toBe(1);
    });

    it('should return days in the month',()=>{
        expect(functions.t(new Date('1972-12-25'))).toBe(31);
    });

    it('should return the full year',()=>{
        expect(functions.Y(TestDate)).toBe(1970);
    });

    it('should return the 2 digit year',()=>{
        expect(functions.y(TestDate)).toBe("70");
    });

    it('should return am/pm lowercase',()=>{
        expect(functions.a(TestDate)).toBe("am");
        expect(functions.a(new Date((dayMS/2)))).toBe("pm");
    });

    it('should return AM/PM uppercase',()=>{
        expect(functions.A(TestDate)).toBe("AM");
        expect(functions.A(new Date((dayMS/2)))).toBe("PM");
    });

    it('should return the hour, on 12 hour time non zero indexed',()=>{
        expect(functions.g(TestDate)).toBe(12);
        expect(functions.g(new Date((15*60*60*1000)))).toBe(3);
    });

    it('should return the hour, on 24 hour time zero indexed (0-23)',()=>{
        expect(functions.G(TestDate)).toBe(0);
    });

    it('should return the hour as a string, on 12 hour time with preceeding zeroes',()=>{
        expect(functions.h(TestDate)).toBe("12");
        expect(functions.h(new Date((4*60*60*1000)))).toBe("04");
        expect(functions.h(new Date((11*60*60*1000)))).toBe("11");
    });

    it('should return the hour, as a string on 24 hour time with preceeding zeroes, zero indexed (0-23)',()=>{
        expect(functions.H(TestDate)).toBe("00");
        expect(functions.H(new Date((11*60*60*1000)))).toBe("11");
    });

    it('should return the minutes, as a string with preceeding zeroes, zero indexed (00-59)',()=>{
        expect(functions.i(TestDate)).toBe("00");
        expect(functions.i(new Date((40*60*1000)))).toBe("40");
    });

    it('should return the seconds, as a string with preceeding zeroes, zero indexed (00-59)',()=>{
        expect(functions.s(TestDate)).toBe("00");
        expect(functions.s(new Date((40*1000)))).toBe("40");
    });

    it('should return the milliseconds, as a number without preceeding zeroes, zero indexed (0-999)',()=>{
        expect(functions.x(TestDate)).toBe(0);
    });

    it('should return the milliseconds, as a string with preceeding zeroes, zero indexed (000-999)',()=>{
        expect(functions.X(TestDate)).toBe("000");
        expect(functions.X(new Date(75))).toBe("075");
    });

    it('should return whether or not it is a leap year as a boolean false/true',()=>{
        expect(functions.L(TestDate)).toBe(false);
        expect(functions.L(new Date('1972-02-02'))).toBe(true);
    });

    it('should return the english suffix of the day',()=>{
        let SuffixDate = new Date(1);
        expect(functions.S(SuffixDate)).toBe('st');

        SuffixDate = new Date(dayMS);
        expect(functions.S(SuffixDate)).toBe('nd');

        SuffixDate = new Date((dayMS*2));
        expect(functions.S(SuffixDate)).toBe('rd');
    });

    it('should properly get me milliseconds in a month even if the month is December',()=>{
        expect(functions.getMSInThisMonth(new Date('1972-12-25'))).toBe(2678400000);
    });

});