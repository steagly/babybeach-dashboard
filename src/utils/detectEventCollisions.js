function dateToMinutes(date) {
  const eventDate = new Date(date);
  const hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();
  return hours * 60 + minutes;
}

function detectOverlaping(event1, event2) {
  const start1 = dateToMinutes(event1.date);
  const end1 = dateToMinutes(event1.date) + 60;
  const start2 = dateToMinutes(event2.date);
  const end2 = dateToMinutes(event2.date) + 60;

  const isOverlaping = (start1, end1, start2, end2) => {
    return !(end1 <= start2 || end2 <= start1);
  };

  return isOverlaping(start1, end1, start2, end2);
}

function calculateCollisions(events, containerWidth) {
  const sortedEvents = [...events].sort(
    (a, b) => dateToMinutes(a.date) - dateToMinutes(b.date)
  );

  const columns = [];
  const eventColumnMap = new Map();

  for (const event of sortedEvents) {
    const start = dateToMinutes(event.date);
    const end = start + 60;

    let columnIndex = -1;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i] <= start) {
        columnIndex = i;
        break;
      }
    }

    if (columnIndex === -1) {
      columnIndex = columns.length;
      columns.push(end);
    } else {
      columns[columnIndex] = end;
    }

    eventColumnMap.set(event.id, columnIndex);
  }

  return events.map((event) => ({
    ...event,
    left: eventColumnMap.get(event.id) * containerWidth,
  }));
}

export { detectOverlaping, dateToMinutes, calculateCollisions };
