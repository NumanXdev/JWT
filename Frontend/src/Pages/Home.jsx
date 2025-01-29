import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      console.log("Cookies from react-cookie:", cookies); // Debugging react-cookie
      console.log("Cookies from document.cookie:", document.cookie); // Debugging browser cookies

      if (!cookies.token) {
        console.warn("Token not found in cookies, redirecting...");
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://jwt-backend-omega.vercel.app",
          {},
          { withCredentials: true }
        );

        console.log("Response from server:", data); // Debugging server response
        const { status, user } = data;

        setUsername(user);
        if (!status) {
          removeCookie("token");
          navigate("/login");
        } else {
          toast(`Hello ${user}`, { position: "top-right" });
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
