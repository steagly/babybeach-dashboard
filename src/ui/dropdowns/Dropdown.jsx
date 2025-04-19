import styles from "./Dropdown.module.css";

import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

import Button from "../buttons/Button";
import DropdownBody from "./DropdownBody";
import DropdownItem from "./DropdownItem";
import DropdownSplitter from "./DropdownSplitter";
import ToggleButton from "../../components/settings/ToggleButton";
import RadioGroup from "../radio/RadioGroup";
import Select from "../../components/settings/Select";

import SettingsIcon from "../../components/icons/SettingsIcon";
import GridIcon from "../../components/icons/GridIcon";
import MouseIcon from "../../components/icons/MouseIcon";
import ExpandIcon from "../../components/icons/ExpandIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";

import useSettingsStore from "../../store/settingsStore";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const setMovement = useSettingsStore((state) => state.setMovement);
  const freeMovement = useSettingsStore((state) => state.freeMovement);
  const stepInterval = useSettingsStore((state) => state.stepInterval);
  const setStepInterval = useSettingsStore((state) => state.setStepInterval);

  const dropdownRef = useRef();

  const handleDropdownOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Button
        variant="primary_outline"
        dropdown
        dropdownDirection={isOpen ? "up" : "down"}
        onClick={handleDropdownOpen}
      >
        <SettingsIcon />
      </Button>
      {isOpen && (
        <DropdownBody>
          <DropdownItem>
            <div className={styles.title_wrapper}>
              <GridIcon />
              Minutes pro Row
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className={styles.title_wrapper}>
              <MouseIcon />
              Free movement
            </div>
            <ToggleButton isAvailable={freeMovement} onChange={setMovement} />
          </DropdownItem>
          <DropdownItem>
            <div className={styles.title_wrapper}>
              <ExpandIcon />
              Step Interval
            </div>
            <Select
              options={[
                { id: 1, value: 5 },
                { id: 2, value: 10 },
                { id: 3, value: 15 },
                { id: 4, value: 20 },
                { id: 5, value: 30 },
                { id: 6, value: 60 },
              ]}
              suffix="min"
              noBorder
              size="small"
              defaultValue={stepInterval}
              onChange={setStepInterval}
            />
          </DropdownItem>
          <DropdownSplitter />
          <DropdownItem>
            <div className={styles.title_wrapper}>
              <CalendarIcon />
              Calendar Format
            </div>
          </DropdownItem>
          <DropdownItem>
            <RadioGroup />
          </DropdownItem>
        </DropdownBody>
      )}
    </div>
  );
}
