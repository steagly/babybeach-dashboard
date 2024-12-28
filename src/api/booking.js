import axios from "axios";

async function getTimeSlots(date, setTimeSlots) {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/booking/timeslots?date=${date.toISOString()}`
    );
    setTimeSlots(response.data);
  } catch (error) {
    console.log(error);
  }
}

export default getTimeSlots;
