export const renderMonthDays = (
  month: number,
  year: number,
  options: {
    selectedDate: Date | null;
    checkAvailability: boolean;
    timeSlots: Array<{ start: string; end: string }>;
  },
) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(Date.UTC(year, month, day));
    const isAvailable = options.checkAvailability
      ? findAvailableDay(date, options.timeSlots)
      : true;
    const isSelected =
      options.selectedDate?.toDateString() === date.toDateString();

    return {
      day,
      date,
      isAvailable,
      isSelected,
    };
  });
};

export const findAvailableDay = (
  date: Date,
  timeSlots: Array<{ start: string; end: string }>,
) => {
  return timeSlots.some(
    (slot) => new Date(slot.start).toDateString() === date.toDateString(),
  );
};
