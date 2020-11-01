export const makeActiveTimes = (activeDays, startTime, endTime) =>
  activeDays.reduce((acc, day) => {
    acc.push({
      activeDay: day,
      startTime,
      endTime
    });
    return acc;
  }, []);
