const is = require('arc-is')
const formatFunctions = require('./functions');

class ArcDate extends Date {
    format(_formatString){
        let formattedDate = '';
        for(let charCount=0;charCount<_formatString.length;charCount++){
            if(is(formatFunctions[_formatString.charAt(charCount)]) === 'function'){
                formattedDate += String(formatFunctions[_formatString.charAt(charCount)](this));
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