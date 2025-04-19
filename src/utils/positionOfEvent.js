const getBookingPosition = (
  start,
  end,
  interval = 60,
  workStart = "10:00",
  workEnd = "18:00",
  rowHeight = 94
) => {
  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * (60 / interval) + minutes / interval;
  };

  const workStartIndex = parseTime(workStart);
  const workEndIndex = parseTime(workEnd);

  const startIndex = parseTime(start) - workStartIndex;
  const endIndex = parseTime(end) - workStartIndex;

  if (startIndex < 0 || endIndex > workEndIndex - workStartIndex) {
    //throw new Error("Время записи выходит за границы рабочего времени");
  }

  return {
    top: startIndex * rowHeight,
    height: (endIndex - startIndex) * rowHeight,
  };
};

export default getBookingPosition;
