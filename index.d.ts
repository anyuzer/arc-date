declare class ArcDate extends Date {
    format(_formatString: string, _timezone?: string): string;
    formatLocal(_formatString: string): string;
    setTZ(_tzString: string): this;
    getTimezoneOffset(): number;
    getMSInMonth(): number;
    getMSPassedInYear(): number;
    toString(): string;
    static target(_tzString: string, _UTCDate: Date|number): ArcDate;
    static wrap(_Date: Date|ArcDate): ArcDate;
}

export default ArcDate;
