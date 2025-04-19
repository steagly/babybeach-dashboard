function getNewTimeFromPosition(
  top,
  interval = 60,
  workStart = "10:00",
  rowHeight = 94
) {
  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = parseTime(workStart);

  const exactIntervals = top / rowHeight;
  const roundedIntervals = Math.round(exactIntervals * 100) / 100;

  const minutesFromTop = roundedIntervals * interval;

  const newTimeInMinutes = Math.round(workStartMinutes + minutesFromTop);

  const safeMinutes = newTimeInMinutes % (24 * 60);
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export default getNewTimeFromPosition;
