import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PresetsSkeleton.module.css";

export default function PresetsSkeleton({ presetsNumber }) {
  return (
    <div className={styles.presets_skeleton}>
      {Array(presetsNumber)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton count={1} width={200} height={38}></Skeleton>
          </div>
        ))}
    </div>
  );
}
