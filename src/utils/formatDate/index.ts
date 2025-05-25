export function formatDateToDdMonYyyy(dateString: string): string | null {
    // Create a date from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date string');
        return null; // Return null for invalid dates
    }

    // Options for formatting
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    // Format the date to dd-MON-yyyy
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Replace the month format from "MMM" to "MON" (uppercase)
    const [day, month, year] = formattedDate.split(' ');
    const monthUppercase = month.toUpperCase();

    return `${monthUppercase} ${day} ${year}`.replace(',','');
}
