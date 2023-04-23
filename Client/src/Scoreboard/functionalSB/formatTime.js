export const formatTime = function(time) {
    time = new Date(time);
    let amORpm;
    let hours = time.getHours();
    let minutes = time.getMinutes();

    hours >= 12 ? amORpm = 'pm' : amORpm = 'am';

    if (hours !== 12) {
        hours = hours % 12;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    time = `${hours}:${minutes}${amORpm}`;

    return(time);
}