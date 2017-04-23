const strings = {
    "shortDays":["Sun","Mon","Tues","Weds","Thurs","Fri","Sat"],
    "longDays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "shortMonths":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    "longMonths":["January","February","March","April","May","June","July","August","September","October","November","December"]
};

function d(_DateObj){
    let $return = _DateObj.getUTCDate();
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function D(_DateObj){
    return strings.shortDays[_DateObj.getUTCDay()];
}

function j(_DateObj){
    return _DateObj.getUTCDate();
}

function l(_DateObj){
    return strings.longDays[_DateObj.getUTCDay()];
}

function N(_DateObj){
    return _DateObj.getUTCDay()+1;
}

function S(_DateObj){
    let $return = 'th';
    switch(_DateObj.getUTCDate()){
        case 1: case 21: case 31: $return = 'st'; break;
        case 2: case 22: $return = 'nd'; break;
        case 3: case 23: $return = 'rd'; break;
    }
    return $return;
}

function w(_DateObj){
    return _DateObj.getUTCDay();
}

function z(_DateObj){
    return Math.floor(getMSPassedThisYear(_DateObj)/(86400*1000));
}

function W(_DateObj){
    return Math.floor(getMSPassedThisYear(_DateObj)/((86400*1000)*7));
}

function F(_DateObj){
    return strings.longMonths[_DateObj.getUTCMonth()];
}

function m(_DateObj){
    let $return = _DateObj.getUTCMonth()+1;
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function M(_DateObj){
    return strings.shortMonths[_DateObj.getUTCMonth()];
}

function n(_DateObj){
    return _DateObj.getUTCMonth()+1;
}

function t(_DateObj){
    return (getMSInThisMonth(_DateObj)/(86400*1000));
}

function L(_DateObj){
    let tempDate = new Date();
    tempDate.setTime(_DateObj.getTime());
    tempDate.setUTCMonth(1,10);
    return (t(tempDate) === 29 ? true : false);
}

function Y(_DateObj){
    return _DateObj.getUTCFullYear();
}

function y(_DateObj){
    return String(_DateObj.getUTCFullYear()).charAt(2)+String(_DateObj.getUTCFullYear()).charAt(3);
}

function a(_DateObj){
    return (_DateObj.getUTCHours() >= 12 ? 'pm':'am');
}

function A(_DateObj){
    return a(_DateObj).toUpperCase();
}

function g(_DateObj){
    let hour = _DateObj.getUTCHours();
    return (hour > 12 ? hour-12 : hour) || 12;
}

function G(_DateObj){
    return _DateObj.getUTCHours();
}

function h(_DateObj){
    let $return = g(_DateObj);
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function H(_DateObj){
    let $return = _DateObj.getUTCHours();
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function i(_DateObj){
    let $return =  _DateObj.getUTCMinutes();
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function s(_DateObj){
    let $return = _DateObj.getUTCSeconds();
    return (String($return).length === 1 ? "0"+$return : String($return));
}

function x(_DateObj){
    return _DateObj.getUTCMilliseconds();
}

function X(_DateObj){
    let ms = _DateObj.getUTCMilliseconds();
    switch(String(ms).length){
        case 1: ms = "00"+ms; break;
        case 2: ms = "0"+ms; break;
    }
    return ms;
}

function getMSPassedThisYear(_DateObj){
    var YearStart = new Date(_DateObj.getUTCFullYear()+"-01-01");
    return (_DateObj.getTime()-YearStart.getTime());
}

function getMSInThisMonth(_DateObj){
    let mStart,mEnd,nextMonth,nextYear;
    const MonthStart = new Date(_DateObj.getUTCFullYear()+"-"+(_DateObj.getUTCMonth()+1)+'-01');

    nextMonth = (_DateObj.getUTCMonth() === 11 ? 0 : _DateObj.getUTCMonth()+1);
    nextYear = (_DateObj.getUTCMonth() === 11 ? _DateObj.getUTCFullYear()+1 : _DateObj.getUTCFullYear());

    mStart = MonthStart.getTime();
    MonthStart.setUTCFullYear(nextYear);
    MonthStart.setUTCMonth(nextMonth,1);
    mEnd = MonthStart.getTime();

    return (mEnd-mStart);
}

module.exports = {
    d, D, j, l, N, S, w, z, W, F, m, M, n, t, L, Y, y, a, A, g, G, h, H, i, s, x, X,
    getMSPassedThisYear, getMSInThisMonth
};