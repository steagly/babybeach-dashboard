import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5001/api/settings",
});

export async function getPresetsWithHours() {
  try {
    await new Promise((res) => setTimeout(res, 2000));
    const response = await API.get("/presets");
    return response.data;
  } catch (error) {
    throw new Error("Не удалось получить пресеты с сервера.");
  }
}

export async function saveChanges(workingHours, selectedPresetId) {
  const response = await API.put(
    `/presets/${selectedPresetId}/hours`,
    workingHours
  );
  return response.data;
}

export async function newPresetWithHours(name = "delete preset") {
  try {
    const response = await API.post("/presets", {
      name: name,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || "Failed to add new presets";
    throw new Error(message);
  }
}

export async function deletePreset(id) {
  try {
    const response = await API.delete(`/presets/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || "Failed to delete presets";
    throw new Error(message);
  }
}
