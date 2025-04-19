import styles from "./TabItem.module.css";

import React, { memo } from "react";

const TabItem = memo(({ tab, isActive, setSelectedtab }) => {
  function changeTab(id) {
    setSelectedtab(id);
  }

  return (
    <li className={`${styles.menu_item} ${isActive ? styles.active : ""}`}>
      <button className={styles.tab_button} onClick={() => changeTab(tab.id)}>
        {tab.label}
      </button>
    </li>
  );
});

export default TabItem;
