/**
 * returnMinMaxTemps destructures the OpenWeather 5 Day / 3 Hour Forecast API response to get the daily minimum
 *   and maximum temperatures using a list of 40 three-hour forecast blocks.
 * @param - the data from the API response
 * @returns - an array of objects that represent the minimum and maximum temperature of each forecast day.
 *   Example response:
 *   [
 *      {
 *          "date":"2023-07-14",
 *          "min":97.39,
 *          "max":106.63
 *      },
 *      {
 *          "date":"2023-07-15",
 *          "min":75.79,
 *          "max":105.75
 *      },
 *      etc.
 *   ]
 */
function returnMinMaxTemps({list}) {
    const minMaxTempDays = [];

    // loops through 40 three hour blocks of forecast and creates a new temperature object for each new day
    list.forEach(({dt_txt, main: {temp_max, temp_min}}) => {
        const [date, time] = dt_txt.split(' '); // splits the date time string
        if (minMaxTempDays.length === 0 || time.startsWith('00')) { // add a new forecast day for each new date
            minMaxTempDays.push({date, min: temp_min, max: temp_max});
        } else {
            // replace the current days min and max temps if a higher max or lower min is found throughout the day
            const currentMinMaxTemp = minMaxTempDays[minMaxTempDays.length - 1];
            const {min, max} = currentMinMaxTemp;
            if (min > temp_min) currentMinMaxTemp.min = temp_min;
            if (max < temp_max) currentMinMaxTemp.max = temp_max;
        }
    });


    return minMaxTempDays;
}

console.log(returnMinMaxTemps);
/*
    EXAMPLE OF USAGE:

    $.get(OPEN_WEATHER_API_URL)).done(data => {
            const minMaxTemps = returnMinMaxTemps(data);
            // use minMaxTemps data as needed
     });

 */