import useToastNotificationStore from "../../../store/toastNotificationStore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newPresetWithHours } from "../../../modules/work-hours/api/workHoursApi";

export function useCreatePreset() {
  const queryClient = useQueryClient();

  const setNotification = useToastNotificationStore(
    (state) => state.setNotification
  );

  const { mutate: newPresetWithHoursFn } = useMutation({
    mutationFn: newPresetWithHours,
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

  return { newPresetWithHoursFn };
}
