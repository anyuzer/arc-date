# arc-date
A Date convenience subclass for javascript (ES6)

## Install & Test
```
$ npm install arc-date --save
$ npm run test
```

## Features
* Handles DST when using specific timezones
* Create formatted strings for a specific timezone
* Create formatted strings for local time
* Create formatted strings for UTC
* Create a new date object targeting a time in a specific timezone, taking DST into account
* Setters return `this` to enable chaining

## Basic Usage
The following example creates a new ArcDate, and utilizes formatting functions to return a formatted string

```js
const ArcDate = require('arc-date');

//We use the same constructor signatures as Date
let TestDate = new ArcDate(Date.UTC(1981,7,25));

//We use format and pass in a formatting string to get a UTC date back
TestDate.format('M jS, Y - h:i A'); //returns 'Aug 25th, 1981 - 12:00 AM'

//We use format local (which will use your system timezone, in my case PDT) to get an adjusted response
TestDate.formatLocal('M jS, Y - h:i A'); //returns 'Aug 24th, 1981 - 05:00 PM'

//Or we can specify what timezone we want to format the time in
TestDate.format('M jS, Y - h:i A', 'America/Toronto'); //returns 'Aug 24th, 1981 - 08:00 PM'

//Or we can set a timezone internally, and have format auto format in that time
TestDate.setTZ('America/Toronto');
TestDate.format('M jS, Y - h:i A'); //returns 'Aug 24th, 1981 - 08:00 PM'
```

## Advanced Usage
In certain scenarios, it can be useful to set a time in a non local timezone that you want to check against in realtime. For this we can create a date, while targeting specific timezones which in turn will return the correct UTC timestamp
```js
//Create a date for a specific timezone, without worrying about its DST, etc
const TargetTime = ArcDate.target('America/Toronto', (new ArcDate).setUTCHours(9, 30));

//TargetTime will now have the correct internal UTC timestamp, for whenever the target time is in the specific timezone
if(Date.now() > TargetTime.getTime()) { 
    //Is right now UTC greater than the time we targeted in a non local timezone?
}
```

## API

### new ArcDate([See Date Signature])
Create a new `ArcDate` object. Requires `new`

### .format(formattingString:String [, tzString: String])
Search for tokens in a string, and run date functions against them to return a formatted string

### .formatLocal(formattingString:String)
same as `.format` but first applies the current timezoneOffset before returning formatted string

### .setTZ(tzString: String)

Sets TZ internally, so format will automatically return correctly adjusted responses.

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

#### _possible tz strings:_
```
  "Africa/Abidjan": [0, 0],
  "Africa/Accra": [0, 0],
  "Africa/Algiers": [1, 1],
  "Africa/Bissau": [0, 0],
  "Africa/Cairo": [2, 2],
  "Africa/Casablanca": [0, 1],
  "Africa/Ceuta": [1, 2],
  "Africa/El_Aaiun": [0, 1],
  "Africa/Johannesburg": [2, 2],
  "Africa/Juba": [3, 3],
  "Africa/Khartoum": [2, 2],
  "Africa/Lagos": [1, 1],
  "Africa/Maputo": [2, 2],
  "Africa/Monrovia": [0, 0],
  "Africa/Nairobi": [3, 3],
  "Africa/Ndjamena": [1, 1],
  "Africa/Tripoli": [2, 2],
  "Africa/Tunis": [1, 1],
  "Africa/Windhoek": [2, 2],
  "America/Adak": [-10, -9, 1],
  "America/Anchorage": [-9, -8, 1],
  "America/Araguaina": [-3, -3],
  "America/Argentina/Buenos_Aires": [-3, -3],
  "America/Argentina/Catamarca": [-3, -3],
  "America/Argentina/Cordoba": [-3, -3],
  "America/Argentina/Jujuy": [-3, -3],
  "America/Argentina/La_Rioja": [-3, -3],
  "America/Argentina/Mendoza": [-3, -3],
  "America/Argentina/Rio_Gallegos": [-3, -3],
  "America/Argentina/Salta": [-3, -3],
  "America/Argentina/San_Juan": [-3, -3],
  "America/Argentina/San_Luis": [-3, -3],
  "America/Argentina/Tucuman": [-3, -3],
  "America/Argentina/Ushuaia": [-3, -3],
  "America/Asuncion": [-4, -3],
  "America/Atikokan": [-5, -5],
  "America/Bahia": [-3, -3],
  "America/Bahia_Banderas": [-6, -5],
  "America/Barbados": [-4, -4],
  "America/Belem": [-3, -3],
  "America/Belize": [-6, -6],
  "America/Blanc-Sablon": [-4, -4],
  "America/Boa_Vista": [-4, -4],
  "America/Bogota": [-5, -5],
  "America/Boise": [-7, -6, 1],
  "America/Cambridge_Bay": [-7, -6, 1],
  "America/Campo_Grande": [-4, -3],
  "America/Cancun": [-5, -5],
  "America/Caracas": [-4, -4],
  "America/Cayenne": [-3, -3],
  "America/Chicago": [-6, -5, 1],
  "America/Chihuahua": [-7, -6],
  "America/Costa_Rica": [-6, -6],
  "America/Creston": [-7, -7],
  "America/Cuiaba": [-4, -3],
  "America/Curacao": [-4, -4],
  "America/Danmarkshavn": [0, 0],
  "America/Dawson": [-8, -7, 1],
  "America/Dawson_Creek": [-7, -7],
  "America/Denver": [-7, -6, 1],
  "America/Detroit": [-5, -4, 1],
  "America/Edmonton": [-7, -6, 1],
  "America/Eirunepe": [-5, -5],
  "America/El_Salvador": [-6, -6],
  "America/Fort_Nelson": [-7, -7],
  "America/Fortaleza": [-3, -3],
  "America/Glace_Bay": [-4, -3, 1],
  "America/Godthab": [-3, -2],
  "America/Goose_Bay": [-4, -3, 1],
  "America/Grand_Turk": [-4, -4],
  "America/Guatemala": [-6, -6],
  "America/Guayaquil": [-5, -5],
  "America/Guyana": [-4, -4],
  "America/Halifax": [-4, -3, 1],
  "America/Havana": [-5, -4, 1],
  "America/Hermosillo": [-7, -7],
  "America/Indiana/Indianapolis": [-5, -4, 1],
  "America/Indiana/Knox": [-6, -5, 1],
  "America/Indiana/Marengo": [-5, -4, 1],
  "America/Indiana/Petersburg": [-5, -4, 1],
  "America/Indiana/Tell_City": [-6, -5, 1],
  "America/Indiana/Vevay": [-5, -4, 1],
  "America/Indiana/Vincennes": [-5, -4, 1],
  "America/Indiana/Winamac": [-5, -4, 1],
  "America/Inuvik": [-7, -6, 1],
  "America/Iqaluit": [-5, -4, 1],
  "America/Jamaica": [-5, -5],
  "America/Juneau": [-9, -8, 1],
  "America/Kentucky/Louisville": [-5, -4, 1],
  "America/Kentucky/Monticello": [-5, -4, 1],
  "America/La_Paz": [-4, -4],
  "America/Lima": [-5, -5],
  "America/Los_Angeles": [-8, -7, 1],
  "America/Maceio": [-3, -3],
  "America/Managua": [-6, -6],
  "America/Manaus": [-4, -4],
  "America/Martinique": [-4, -4],
  "America/Matamoros": [-6, -5, 1],
  "America/Mazatlan": [-7, -6],
  "America/Menominee": [-6, -5, 1],
  "America/Merida": [-6, -5],
  "America/Metlakatla": [-9, -8],
  "America/Mexico_City": [-6,-5],
  "America/Miquelon": [-3,-2, 1],
  "America/Moncton": [-4,-3, 1],
  "America/Monterrey": [-6,-5],
  "America/Montevideo": [-3,-3],
  "America/Nassau": [-5,-4, 1],
  "America/New_York": [-5,-4, 1],
  "America/Nipigon": [-5,-4, 1],
  "America/Nome": [-9,-8, 1],
  "America/Noronha": [-2,-2],
  "America/North_Dakota/Beulah": [-6,-5, 1],
  "America/North_Dakota/Center": [-6,-5, 1],
  "America/North_Dakota/New_Salem": [-6,-5, 1],
  "America/Ojinaga": [-7,-6, 1],
  "America/Panama": [-5,-5],
  "America/Pangnirtung": [-5,-4, 1],
  "America/Paramaribo": [-3,-3],
  "America/Phoenix": [-7,-7],
  "America/Port_of_Spain": [-4,-4],
  "America/Port-au-Prince": [-5,-4, 1],
  "America/Porto_Velho": [-4,-4],
  "America/Puerto_Rico": [-4,-4],
  "America/Punta_Arenas": [-3,-3],
  "America/Rainy_River": [-6,-5, 1],
  "America/Rankin_Inlet": [-6,-5, 1],
  "America/Recife": [-3,-3],
  "America/Regina": [-6,-6],
  "America/Resolute": [-6,-5, 1],
  "America/Rio_Branco": [-5,-5],
  "America/Santarem": [-3,-3],
  "America/Santiago": [-4,-3],
  "America/Santo_Domingo": [-4,-4],
  "America/Sao_Paulo": [-3,-2],
  "America/Scoresbysund": [-1,0],
  "America/Sitka": [-9,-8, 1],
  "America/St_Johns": [-3.5,-2.5, 1],
  "America/Swift_Current": [-6,-6],
  "America/Tegucigalpa": [-6,-6],
  "America/Thule": [-4,-3, 1],
  "America/Thunder_Bay": [-5,-4, 1],
  "America/Tijuana": [-8,-7, 1],
  "America/Toronto": [-5,-4, 1],
  "America/Vancouver": [-8,-7, 1],
  "America/Whitehorse": [-8,-7, 1],
  "America/Winnipeg": [-6,-5, 1],
  "America/Yakutat": [-9,-8, 1],
  "America/Yellowknife": [-7,-6, 1],
  "Antarctica/Casey": [11,11],
  "Antarctica/Davis": [7,7],
  "Antarctica/DumontDUrville": [10,10],
  "Antarctica/Macquarie": [11,11],
  "Antarctica/Mawson": [5,5],
  "Antarctica/Palmer": [-3,-3],
  "Antarctica/Rothera": [-3,-3],
  "Antarctica/Syowa": [3,3],
  "Antarctica/Troll": [0,2],
  "Antarctica/Vostok": [6,6],
  "Asia/Almaty": [6,6],
  "Asia/Amman": [2,3],
  "Asia/Anadyr": [12,12],
  "Asia/Aqtau": [5,5],
  "Asia/Aqtobe": [5,5],
  "Asia/Ashgabat": [5,5],
  "Asia/Atyrau": [5,5],
  "Asia/Baghdad": [3,3],
  "Asia/Baku": [4,4],
  "Asia/Bangkok": [7,7],
  "Asia/Barnaul": [7,7],
  "Asia/Beirut": [2,3],
  "Asia/Bishkek": [6,6],
  "Asia/Brunei": [8,8],
  "Asia/Chita": [9,9],
  "Asia/Choibalsan": [8,8],
  "Asia/Colombo": [5.5,5.5],
  "Asia/Damascus": [2,3],
  "Asia/Dhaka": [6,6],
  "Asia/Dili": [9,9],
  "Asia/Dubai": [4,4],
  "Asia/Dushanbe": [5,5],
  "Asia/Famagusta": [2,2],
  "Asia/Gaza": [2,3],
  "Asia/Hebron": [2,3],
  "Asia/Ho_Chi_Minh": [7,7],
  "Asia/Hong_Kong": [8,8],
  "Asia/Hovd": [7,7],
  "Asia/Irkutsk": [8,8],
  "Asia/Jakarta": [7,7],
  "Asia/Jayapura": [9,9],
  "Asia/Jerusalem": [2,3],
  "Asia/Kabul": [4.5, 4.5],
  "Asia/Kamchatka": [12,12],
  "Asia/Karachi": [5,5],
  "Asia/Kathmandu": [5.75, 5.75],
  "Asia/Khandyga": [9,9],
  "Asia/Kolkata": [5.5, 5.5],
  "Asia/Krasnoyarsk": [7,7],
  "Asia/Kuala_Lumpur": [8,8],
  "Asia/Kuching": [8,8],
  "Asia/Macau": [8,8],
  "Asia/Magadan": [11,11],
  "Asia/Makassar": [8,8],
  "Asia/Manila": [8,8],
  "Asia/Novokuznetsk": [7,7],
  "Asia/Novosibirsk": [7,7],
  "Asia/Omsk": [6,6],
  "Asia/Oral": [5,5],
  "Asia/Pontianak": [7,7],
  "Asia/Pyongyang": [9,9],
  "Asia/Qatar": [3,3],
  "Asia/Qyzylorda": [6,6],
  "Asia/Riyadh": [3,3],
  "Asia/Sakhalin": [11,11],
  "Asia/Samarkand": [5,5],
  "Asia/Seoul": [9,9],
  "Asia/Shanghai": [8,8],
  "Asia/Singapore": [8,8],
  "Asia/Srednekolymsk": [11,11],
  "Asia/Taipei": [8,8],
  "Asia/Tashkent": [5,5],
  "Asia/Tbilisi": [4,4],
  "Asia/Tehran": [3.5, 4.5],
  "Asia/Thimphu": [6,6],
  "Asia/Tokyo": [9,9],
  "Asia/Tomsk": [7,7],
  "Asia/Ulaanbaatar": [8,8],
  "Asia/Urumqi": [6,6],
  "Asia/Ust-Nera": [10,10],
  "Asia/Vladivostok": [10,10],
  "Asia/Yakutsk": [9,9],
  "Asia/Yangon": [6.5,6.5],
  "Asia/Yekaterinburg": [5,5],
  "Asia/Yerevan": [4,4],
  "Atlantic/Azores": [-1,0],
  "Atlantic/Bermuda": [-4,-3, 1],
  "Atlantic/Canary": [0,1],
  "Atlantic/Cape_Verde": [-1,-1],
  "Atlantic/Faroe": [0,1],
  "Atlantic/Madeira": [0,1],
  "Atlantic/Reykjavik": [0,0],
  "Atlantic/South_Georgia": [-2,-2],
  "Atlantic/Stanley": [-3,-3],
  "Australia/Adelaide": [9.5,10.5],
  "Australia/Brisbane": [10,10],
  "Australia/Broken_Hill": [9.5,10.5],
  "Australia/Currie": [10,11],
  "Australia/Darwin": [9.5,9.5],
  "Australia/Eucla": [8.75,8.75],
  "Australia/Hobart": [10,11],
  "Australia/Lindeman": [10,10],
  "Australia/Lord_Howe": [10.5,11],
  "Australia/Melbourne": [10,11],
  "Australia/Perth": [8,8],
  "Australia/Sydney": [10,11],
  "Europe/Amsterdam": [1,2],
  "Europe/Andorra": [1,2],
  "Europe/Astrakhan": [4,4],
  "Europe/Athens": [2,3],
  "Europe/Belgrade": [1,2],
  "Europe/Berlin": [1,2],
  "Europe/Brussels": [1,2],
  "Europe/Bucharest": [2,3],
  "Europe/Budapest": [1,2],
  "Europe/Chisinau": [2,3],
  "Europe/Copenhagen": [1,2],
  "Europe/Dublin": [0,1],
  "Europe/Gibraltar": [1,2],
  "Europe/Helsinki": [2,3],
  "Europe/Istanbul": [3,3],
  "Europe/Kaliningrad": [2,2],
  "Europe/Kiev": [2,3],
  "Europe/Kirov": [3,3],
  "Europe/Lisbon": [0,1],
  "Europe/London": [0,1],
  "Europe/Luxembourg": [1,2],
  "Europe/Madrid": [1,2],
  "Europe/Malta": [1,2],
  "Europe/Minsk": [3,3],
  "Europe/Monaco": [1,2],
  "Europe/Moscow": [3,3],
  "Europe/Nicosia": [2,3],
  "Europe/Oslo": [1,2],
  "Europe/Paris": [1,2],
  "Europe/Prague": [1,2],
  "Europe/Riga": [2,3],
  "Europe/Rome": [1,2],
  "Europe/Samara": [4,4],
  "Europe/Saratov": [4,4],
  "Europe/Simferopol": [3,3],
  "Europe/Sofia": [2,3],
  "Europe/Stockholm": [1,2],
  "Europe/Tallinn": [2,3],
  "Europe/Tirane": [1,2],
  "Europe/Ulyanovsk": [4,4],
  "Europe/Uzhgorod": [2,3],
  "Europe/Vienna": [1,2],
  "Europe/Vilnius": [2,3],
  "Europe/Volgograd": [3,3],
  "Europe/Warsaw": [1,2],
  "Europe/Zaporozhye": [2,3],
  "Europe/Zurich": [1,2],
  "Factory": [0,0],
  "Indian/Chagos": [6,6],
  "Indian/Christmas": [7,7],
  "Indian/Cocos": [6.5,6.5],
  "Indian/Kerguelen": [5,5],
  "Indian/Mahe": [4,4],
  "Indian/Maldives": [5,5],
  "Indian/Mauritius": [4,4],
  "Indian/Reunion": [4,4],
  "Pacific/Apia": [13,14],
  "Pacific/Auckland": [12,13],
  "Pacific/Bougainville": [11,11],
  "Pacific/Chatham": [12.75, 13.75],
  "Pacific/Chuuk": [10,10],
  "Pacific/Easter": [-6,-5],
  "Pacific/Efate": [11,11],
  "Pacific/Enderbury": [13,13],
  "Pacific/Fakaofo": [13,13],
  "Pacific/Fiji": [12,13],
  "Pacific/Funafuti": [12,12],
  "Pacific/Galapagos": [-6,-6],
  "Pacific/Gambier": [-9,-9],
  "Pacific/Guadalcanal": [11,11],
  "Pacific/Guam": [10,10],
  "Pacific/Honolulu": [-10,-10],
  "Pacific/Kiritimati": [14,14],
  "Pacific/Kosrae": [11,11],
  "Pacific/Kwajalein": [12,12],
  "Pacific/Majuro": [12,12],
  "Pacific/Marquesas": [-9.5,-9.5],
  "Pacific/Nauru": [12,12],
  "Pacific/Niue": [-11,-11],
  "Pacific/Norfolk": [11,11],
  "Pacific/Noumea": [11,11],
  "Pacific/Pago_Pago": [-11,-11],
  "Pacific/Palau": [9,9],
  "Pacific/Pitcairn": [-8,-8],
  "Pacific/Pohnpei": [11,11],
  "Pacific/Port_Moresby": [10,10],
  "Pacific/Rarotonga": [-10,-10],
  "Pacific/Tahiti": [-10,-10],
  "Pacific/Tarawa": [12,12],
  "Pacific/Tongatapu": [13,14],
  "Pacific/Wake": [12,12],
  "Pacific/Wallis": [12,12]
```

## _NOTE on DST_:
Currently only a single zone is supported for automatic adjustment for DST. This is the North America zone, which moves from standard time to daylight time on the 2nd sunday in March at 2:00am and moves from daylight to standard on the 1st sunday of November at 2:00am.

There are 15 other "zones" that have different DST days/rules which are not currently supported (in which case, standard adjustment will occur but the +/- hour will not).

For non DST timezones, format will adjust correctly as expected. The goal is eventually to support all zones, but in the meantime if somebody needs zone support sooner please ask or submit a PR.