//returns a map containing a formatted date, timeframe and duration
export function getTimeDetails(
    startDate: Date,
    endDate: Date,
    locale: string = 'en-GB'
): {
    date: string;
    timeframe: string;
    duration: string;
} {
    const date = startDate.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    const timeframe = `${startDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    })} - ${endDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

    const durationMinutes = Math.round(
        (endDate.getTime() - startDate.getTime()) / 60000
    );

    const duration = `${durationMinutes} minute${durationMinutes === 1 ? '' : 's'}`;

    return {
        date,
        timeframe,
        duration,
    };
}

export function toLocalDatetimeInput(date: Date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset) * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
}