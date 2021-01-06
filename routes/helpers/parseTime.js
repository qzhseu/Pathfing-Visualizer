module.exports = {
    secondsToFormat: (time) => {
        const HOUR = 60 * 60;
        const MINUTE = 60;
    
        var minutesInSeconds = time % HOUR;
        var hours = Math.floor(time / HOUR);
        var minutes = Math.floor(minutesInSeconds / MINUTE)
        var seconds = minutesInSeconds % MINUTE;
    
        return hours.toString().padStart(2, 0) + ':' + minutes.toString().padStart(2, 0) + ':' + seconds.toString().padStart(2, 0);
    }
}