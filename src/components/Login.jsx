import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Login.module.css";
import axios from "axios";
import useAuthStore from "../store/authStore";
import logo from "../assets/babybeachlogo.svg";

const svgEyeClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.input_input_icon} ${styles.svg_icon_hover}`}
    viewBox="0 0 24 24"
  >
    <path
      fill="#838383"
      d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"
    />
  </svg>
);
const svgEyeOpen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.input_input_icon} ${styles.svg_icon_hover}`}
    viewBox="0 0 24 24"
  >
    <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
  </svg>
);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      login(response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main_container}>
      <motion.div
        className={styles.main}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.logo_container}>
          <img src={logo} alt="babybeach_logo" />
          <h2>Access admin dashboard</h2>
          <h4>Enter admin email and password</h4>
        </div>
        <div></div>
        <form className={styles.form}>
          <label htmlFor="email">Email</label>
          <div className={styles.input_input}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.input_input_icon}
              viewBox="0 0 24 24"
            >
              <path
                fill="#838383"
                d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
              />
            </svg>
            <input
              className={styles.input_input_el}
              type="text"
              id="email"
              placeholder="Enter your email"
              name="name"
              onChange={handleUserName}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className={styles.input_input}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.input_input_icon}
              viewBox="0 0 24 24"
            >
              <path
                fill="#838383"
                d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
              />
            </svg>
            <input
              className={styles.input_input_el}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleUserPassword}
            />
            <div className={styles.svg_container} onClick={handleShowPassword}>
              {showPassword ? svgEyeOpen : svgEyeClose}
            </div>
          </div>
          {error && <p className={styles.error_message}>{error}</p>}
          <button
            className={styles.btn}
            type="submit"
            value="Log in"
            onClick={handleLogin}
          >
            {isLoading ? <div className={styles.spinner}></div> : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
