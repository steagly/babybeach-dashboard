import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./WorkHoursSkeleton.module.css";

export default function WorkHoursSkeleton({ hoursNumber }) {
  return (
    <div className={styles.hours_skeleton}>
      {Array(hoursNumber)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.skeleton_item}>
            <Skeleton count={1} width={80} height={23}></Skeleton>
            <div className={styles.time_range}>
              <Skeleton count={1} width={140} height={42}></Skeleton>
              <Skeleton count={1} width={140} height={42}></Skeleton>
            </div>
          </div>
        ))}
    </div>
  );
}
