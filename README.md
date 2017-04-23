# arc-date [![Build Status](https://travis-ci.org/anyuzer/arc-date.svg?branch=master)](https://travis-ci.org/anyuzer/arc-date)
A Date convenience subclass for javascript (ES6)

## Install
```
$ npm install arc-date --save
```

## Features
* format()
* formatLocal()

## Basic Usage
The following example creates a new ArcDate, and utilizes formatLocal to return a formatted string

```js
const ArcDate = require('arc-date');

//We use the same constructor signatures as Date
let TestDate = new ArcDate(1981,7,25);

//We use format local and pass in a formatting string to define the string construction returned
TestDate.formatLocal('M jS, Y - h:i A'); //returns 'Aug 25th, 1981 - 12:00 AM'
```

## API

### new ArcDate([See Date Signature])
Create a new `ArcDate` object. Requires `new`

### .format(formattingString:String)
Search for tokens in a string, and run date functions against them to return a formatted string

### .formatLocal(formattingString:String)
same as `.format` but first applies the current timezoneOffset before returning formatted string

#### _possible tokens:_
```
d - Day: 01-31
D - Day: Sun-Sat
j - Day: 1-31
l - Day: Sunday-Saturday
N - Day: 1-7 (day of week)
S - Day: Suffix (st,nd,rd,th)
w - Day: 0-6 (zero indexed)
z - Day: 0-364 (zero indexed)
W - Week: 1-52 (of the year)
F - Month: January - December
m - Month: 01-12
M - Month: Jan - Dec,
n - Month: 1-12
t - Month: 28-31 (days in month)
L - Year: false/true (Leap year)
Y - Year: 1993
y - Year: 93
a - Time: am-pm
A - Time: AM-PM
g - Time: 1-12 (hours)
G - Time: 0-23 (hours)
h - Time: 01-12 (hours)
H - Time: 00-23 (hours)
i - Time: 00-59 (minutes)
s - Time: 00-59 (seconds)
x - Time: 0-999 (milliseconds)
X - Time: 000-999 (milliseconds)
```

## Testing
```
npm test
```
