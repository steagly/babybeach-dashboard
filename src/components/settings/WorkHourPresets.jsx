import styles from "./WorkHourPresets.module.css";
import useModalStore from "../../store/modalStore";
import PresetItem from "./PresetItem";
import PresetsSkeleton from "./PresetsSkeleton";

import AddPresetModal from "../modals/AddPresetModal";

export default function WorkHourPresets({
  presets,
  handleChangePreset,
  deletePreset,
  currentCount,
  maxCount,
  isLoading,
}) {
  const openModal = useModalStore((state) => state.openModal);

  if (isLoading) {
    return <PresetsSkeleton presetsNumber={5} />;
  }

  return (
    <div className={styles.presets}>
      <h4
        className={styles.preset_number}
      >{`${currentCount} / ${maxCount}`}</h4>
      {presets?.map((preset) => (
        <PresetItem
          key={preset.id}
          preset={preset}
          deletePreset={deletePreset}
          handleChangePreset={handleChangePreset}
        />
      ))}
      <button
        className={styles.add_preset}
        onClick={() => openModal(AddPresetModal)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            fill="currentColor"
          />
        </svg>
        Add New Work Hour Preset
      </button>
    </div>
  );
}
