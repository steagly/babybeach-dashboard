import styles from "./SettingsPage.module.css";
import WorkHoursSkeleton from "./WorkHoursSkeleton";
import WorkHourItem from "./WorkHourItem";

export default function WorkHoursList({
  workingHours,
  changeAvailability,
  isLoading,
}) {
  if (isLoading) {
    return <WorkHoursSkeleton hoursNumber={7} />;
  }

  return (
    <div className={styles.hours_list}>
      {workingHours?.map((workingHour) => (
        <WorkHourItem
          key={workingHour.id}
          workingHour={workingHour}
          changeAvailability={changeAvailability}
        />
      ))}
    </div>
  );
}
