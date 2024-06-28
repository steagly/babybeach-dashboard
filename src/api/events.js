import axios from "axios";

async function getEvents(date, setEvents) {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/events?date=${date.toISOString()}`
    );
    setEvents(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

export default getEvents;
