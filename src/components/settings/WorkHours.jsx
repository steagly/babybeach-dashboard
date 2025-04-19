import { useState, useEffect } from "react";

import styles from "./SettingsPage.module.css";
import WorkHoursList from "./WorkHoursList";
import WorkHourPresets from "./WorkHourPresets";
import Button from "../../ui/buttons/Button";
import SaveIcon from "../icons/SaveIcon";

import useWorkingHoursStore from "../../store/workingHoursStore";
import useToastNotificationStore from "../../store/toastNotificationStore";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  saveChanges,
  getPresetsWithHours,
  deletePreset,
} from "../../modules/work-hours/api/workHoursApi";
import Overlay from "../Overlay";
import AddPresetModal from "../modals/AddPresetModal";

export default function WorkHours() {
  const [selectedPresetId, setSelectedPresetId] = useState(1);

  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["workingHours", "presets"],
    queryFn: getPresetsWithHours,
  });

  const { mutate: saveChangesFn, isPending } = useMutation({
    mutationFn: () => saveChanges(workingHours, selectedPresetId),
    onSuccess: () => {
      setNotification({ message: "Data saved!", type: "success" });
      queryClient.invalidateQueries(["workingHours", "presets"]);
    },
    onError: (error) => {
      setNotification({ message: error, type: "error" });
    },
  });

  const { mutate: deletePresetFn } = useMutation({
    mutationFn: (id) => deletePreset(id),
    onSuccess: (data) => {
      setNotification({
        message: data.message,
        type: "success",
      });
      queryClient.invalidateQueries(["workingHours", "presets"]);
    },
    onError: (error) => {
      setNotification({
        message: error.message,
        type: "error",
      });
    },
  });

  const {
    workingHours,
    setWorkingHours,
    presets,
    setStatus,
    changePreset,
    setFetchedPresets,
  } = useWorkingHoursStore();

  const setNotification = useToastNotificationStore(
    (state) => state.setNotification
  );

  function handleChangePreset(id) {
    const selectedPreset = presets.find((preset) => preset.id === id);
    if (selectedPreset) {
      setWorkingHours(selectedPreset.workingHours);
    }
    setSelectedPresetId(id);
    changePreset(id);
  }

  function changeAvailability(id) {
    setStatus(id);
  }

  useEffect(() => {
    if (isSuccess) {
      const selectedPreset = data.presets.find(
        (preset) => preset.id === data.presets[0].id
      );
      setFetchedPresets(data.presets);
      setWorkingHours(selectedPreset.workingHours);
    }
  }, [data]);

  return (
    <div className={styles.hours_container}>
      <Overlay ModalElement={AddPresetModal} />
      <div className={styles.hours_header}>
        <div className={styles.hours_wrapper}>
          <div className={styles.title}>
            <h4>My Work Hour Presets</h4>
            <p>Save and reuse your custom work schedules.</p>
          </div>
        </div>
        <WorkHourPresets
          presets={presets}
          currentCount={data?.settings?.currentPreset}
          maxCount={data?.settings?.maxPreset}
          selectedPresetId={selectedPresetId}
          isLoading={isLoading}
          handleChangePreset={handleChangePreset}
          deletePreset={deletePresetFn}
        />
      </div>
      <div className={styles.hours_body}>
        <p>Default Preset</p>
        <WorkHoursList
          workingHours={workingHours}
          changeAvailability={changeAvailability}
          isLoading={isLoading}
        />
        {workingHours?.length > 0 && (
          <div className={styles.buttons_wrapper}>
            <Button
              variant="secondary"
              size="large"
              onClick={saveChangesFn}
              disabled={isPending}
            >
              <SaveIcon width="20px" height="20px" /> Save Changes
            </Button>
            <Button variant="secondary" size="large">
              Active Preset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
