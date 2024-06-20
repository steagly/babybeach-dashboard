import styles from "./header.module.css";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function Header({ sectionName }) {
  let sectionImage = renderSectionIcons();

  function renderSectionIcons() {
    switch (sectionName) {
      case "Calendar":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3H18V1"
              fill="#838383"
            />
          </svg>
        );
      case "Dashboard":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11H11V3H3M3 21H11V13H3M13 21H21V13H13M13 3V11H21V3"
              fill="#838383"
            />
          </svg>
        );
      case "Cards":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4698 4.35L20.1298 3.79V12.82L22.5598 6.96C22.9698 5.94 22.4998 4.77 21.4698 4.35ZM1.96976 8.05L6.92976 20C7.23976 20.77 7.96976 21.24 8.73976 21.26C8.99976 21.26 9.26976 21.21 9.52976 21.1L16.8998 18.05C17.6498 17.74 18.1098 17 18.1298 16.26C18.1398 16 18.0898 15.71 17.9998 15.45L12.9998 3.5C12.7098 2.73 11.9698 2.26 11.1898 2.25C10.9298 2.25 10.6698 2.31 10.4198 2.4L3.05976 5.45C2.03976 5.87 1.54976 7.04 1.96976 8.05ZM18.1198 4.25C18.1198 3.71957 17.9091 3.21086 17.534 2.83579C17.1589 2.46071 16.6502 2.25 16.1198 2.25H14.6698L18.1198 10.59"
              fill="#838383"
            />
          </svg>
        );
    }
  }

  return (
    <motion.div
      className={styles.header_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.section_name}>
        {sectionImage}
        <p>{sectionName}</p>
      </div>
      <div className={styles.search_input}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.91667 2.5C9.35326 2.5 10.731 3.07068 11.7468 4.0865C12.7627 5.10233 13.3333 6.48008 13.3333 7.91667C13.3333 9.25833 12.8417 10.4917 12.0333 11.4417L12.2583 11.6667H12.9167L17.0833 15.8333L15.8333 17.0833L11.6667 12.9167V12.2583L11.4417 12.0333C10.4917 12.8417 9.25833 13.3333 7.91667 13.3333C6.48008 13.3333 5.10233 12.7627 4.0865 11.7468C3.07068 10.731 2.5 9.35326 2.5 7.91667C2.5 6.48008 3.07068 5.10233 4.0865 4.0865C5.10233 3.07068 6.48008 2.5 7.91667 2.5ZM7.91667 4.16667C5.83333 4.16667 4.16667 5.83333 4.16667 7.91667C4.16667 10 5.83333 11.6667 7.91667 11.6667C10 11.6667 11.6667 10 11.6667 7.91667C11.6667 5.83333 10 4.16667 7.91667 4.16667Z"
            fill="#838383"
          />
        </svg>
        <form action="">
          <input type="search" placeholder="Search for something" />
        </form>
      </div>
      <div>languages</div>
    </motion.div>
  );
}
