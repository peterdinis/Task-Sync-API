export function startOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

// Function to subtract a specified number of days from a given date
export function subDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - days);
    return newDate;
}
