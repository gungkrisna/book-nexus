export const formatTime = (totalTimeSecs) => {
    let result = '';

    if (totalTimeSecs >= 3600) {
        const hours = Math.floor(totalTimeSecs / 3600);
        result += `${hours} hour${hours > 1 ? 's' : ''}`;
        totalTimeSecs %= 3600;
    }

    else if (totalTimeSecs >= 60) {
        const minutes = Math.floor(totalTimeSecs / 60);
        result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        totalTimeSecs %= 60;
    }

    if (totalTimeSecs > 0 && totalTimeSecs < 60 && result == '' ) {
        result += `${totalTimeSecs} second${totalTimeSecs > 1 ? 's' : ''}`;
    }

    return result.trim();
};
