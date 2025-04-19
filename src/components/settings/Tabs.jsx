import WorkHours from "./WorkHours";
import ExtraWorkHours from "./ExtraWorkHours";
import TabItem from "./TabItem";
import styles from "./SettingsPage.module.css";
import { useMemo, useState } from "react";

export default function Tabs() {
  const [selectedTab, setSelectedtab] = useState(1);

  const tabs = useMemo(
    () => [
      { id: 1, label: "Allgemein", content: "asdasdsds" },
      {
        id: 2,
        label: "Arbeitszeiten",
        content: <WorkHours />,
      },
      {
        id: 3,
        label: "Arbeitszeiten für ein bestimmter tag",
        content: <ExtraWorkHours />,
      },
    ],
    []
  );

  return (
    <div className={styles.content_wrapper}>
      <nav className={styles.settings_menu}>
        <ul className={styles.settings_menu_list}>
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={selectedTab === tab.id}
              setSelectedtab={setSelectedtab}
            />
          ))}
        </ul>
      </nav>
      <div>{tabs.find((tab) => tab.id === selectedTab)?.content}</div>
    </div>
  );
}
