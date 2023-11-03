export const getDateString = (date) => {
    const dateArray = date.toDateString().split(" ");
    const month = dateArray[1];
    const day = dateArray[2];
    return `${month} ${day}`;
};

export const getTimeString = (date) => {
    const timeString = date.toLocaleTimeString();
    const ampm = timeString.substr(-2) == "AM"
        ? "am"
        : timeString.substr(-2) == "PM"
            ? "pm"
            : null;
    const timeArray = timeString.split(":");
    const hours = timeArray[0];
    const minutes = timeArray[1];

    if (ampm) {
        return `${hours}.${minutes}${ampm}`;
    } else {
        if (hours > 12) {
            return `${hours % 12}.${minutes}pm`;
        }
        return `${hours % 12}.${minutes}am`;
    }
}