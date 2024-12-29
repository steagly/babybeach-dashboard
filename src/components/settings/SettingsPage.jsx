import Header from "../Header";
import WorkHourItem from "./WorkHourItem";
import styles from "./SettingsPage.module.css";
import axios from "axios";
import AccordionItem from "./AccordionItem";
import ExtraWorkHours from "./ExtraWorkHours";

import { useEffect, useState } from "react";

export default function Settings() {
  const [workingHours, setWorkingHours] = useState([]);

  const changeAvailability = (id) => {
    setWorkingHours((prevState) =>
      prevState.map((workingHour) =>
        workingHour.id === id
          ? { ...workingHour, enabled: !workingHour.enabled }
          : workingHour
      )
    );
  };

  async function getWorkingHours() {
    try {
      const response = await axios.get(
        "http://localhost:5001/api//settings/hours"
      );
      setWorkingHours(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWorkingHours();

    console.log(workingHours);
  }, []);

  return (
    <>
      <Header sectionName={"Settings"} />
      <div className={styles.settings_body}>
        <AccordionItem sectionName={"Arbeitszeiten"}>
          {workingHours?.map((workingHour) => (
            <WorkHourItem
              key={workingHour.id}
              workingHour={workingHour}
              changeAvailability={changeAvailability}
            />
          ))}
        </AccordionItem>
        <AccordionItem sectionName={"Arbeitszeiten für ein bestimmter tag"}>
          <ExtraWorkHours />
        </AccordionItem>
      </div>
    </>
  );
}
