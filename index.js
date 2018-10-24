const is = require('arc-is')
const formatFunctions = require('./functions');
const timezones = require('./timezones');

const isDaylight = (_targetDate, _zone, _standardOffset, _daylightOffset) => {
    //Not relevant, no actual DST change
    if(!_zone){
        return false;
    }

    // There are a bunch of zones for sorting out the rules of when DST starts and end because time is stupid - https://www.timeanddate.com/time/dst/2018.html
    // For now supporting one zone
    // [Start]  [End]     [Zone] (2017 dates)
    // Mar 12 -> Nov  5 = 1 (Americas)
    // Mar 19 -> Oct 29 = 2
    // Mar 22 -> Sep 22 = 3
    // Mar 24 -> Oct 29 = 4
    // Mar 25 -> Oct 28 = 5
    // Mar 26 -> Oct 29 = 6
    // Mar 31 -> Oct 27 = 7
    // Apr  2 -> Oct 29 = 8
    // Aug 12 -> May 13 = 9
    // Aug 13 -> May 14 = 10
    // Sep  3 -> Oct 24 = 11
    // Sep 24 -> Apr  2 = 12
    // Oct  1 -> Mar 26 = 13
    // Oct  1 -> Apr  2 = 14
    // Oct 15 -> Feb 19 = 15
    // Nov  5 -> Jan 15 = 16

    //Americas - HAT, AKT, PT, MT, CT, ET, AT, NT
    if(_zone === 1){
        //On March (2nd Sunday) at 2:00am, it becomes 3:00am and returns true (daylight = true)
        //On November (1st Sunday) at 2:00am it becines 1:00am and returns false (daylight = false)
        const marchFirstDayIndex = Number(new ArcDate(Date.UTC(_targetDate.getUTCFullYear(), 2, 1)).format('N'));
        const marchChangeDay = (marchFirstDayIndex === 1 ? 8 : 1+(7-marchFirstDayIndex)+1+7);
        const marchChangeTime = new ArcDate(Date.UTC(_targetDate.getUTCFullYear(), 2, marchChangeDay, 2-_standardOffset));

        const novFirstDayIndex = Number(new ArcDate(Date.UTC(_targetDate.getUTCFullYear(), 10, 1)).format('N'));
        const novChangeDay = (novFirstDayIndex === 1 ? novFirstDayIndex : 1+(7-novFirstDayIndex)+1);
        const novChangeTime = new ArcDate(Date.UTC(_targetDate.getUTCFullYear(), 10, novChangeDay, 2-_daylightOffset));

        //It is between 2nd sunday in march and 1st sunday in november
        if(_targetDate.getTime() >= marchChangeTime.getTime() && _targetDate.getTime() < novChangeTime.getTime()) {
            return true;
        }

        //It is after 1st sunday in november
        return false;
    }
};

const hour = 60*60*1000;

class ArcDate extends Date {
    format(_formatString, _timezone){
        _timezone = _timezone || this.tzString;
        let date = new Date(this.getTime());
        if(timezones[_timezone]){
            const [standard, daylight, zone] = timezones[_timezone];
            if(isDaylight(date, zone, standard, daylight)){
                date = new Date(date.getTime()+(hour*daylight));
            }
            else {
                date = new Date(date.getTime()+(hour*standard));
            }
        }
        let formattedDate = '';
        for(let charCount=0;charCount<_formatString.length;charCount++){
            if(is(formatFunctions[_formatString.charAt(charCount)]) === 'function'){
                formattedDate += String(formatFunctions[_formatString.charAt(charCount)](date));
            }
            else{
                formattedDate += _formatString.charAt(charCount);
            }
        }
        return formattedDate;
    }

    formatLocal(_formatString){
        const localizedDate = new Date(this.getTime()-(this.getTimezoneOffset()*60*1000));
        let formattedDate = '';
        for(let charCount=0;charCount<_formatString.length;charCount++){
            if(is(formatFunctions[_formatString.charAt(charCount)]) === 'function'){
                formattedDate += String(formatFunctions[_formatString.charAt(charCount)](localizedDate));
            }
            else{
                formattedDate += _formatString.charAt(charCount);
            }
        }
        return formattedDate;
    }

    setTZ(_tzString){
        this.tzString = _tzString;
        return this;
    }

    toString(){
        return '[object '+this.constructor.name+']';
    }

    static wrap(_Date){
        if(is(_Date,true) === 'ArcDate'){
            return _Date;
        }
        else if(is(_Date) === 'date'){
            return new ArcDate(_Date.getTime());
        }
        else{
            throw new TypeError('Cannot wrap value. Must evaluate to a native date.');
        }
    }
}

module.exports = ArcDate;