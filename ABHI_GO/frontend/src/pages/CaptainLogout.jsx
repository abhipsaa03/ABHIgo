import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        console.warn("Logout request could not be completed:", error.message);
      } finally {
        localStorage.removeItem("token");
        navigate("/captain-login", { replace: true });
      }
    };
    logout();
  }, [navigate]);

  return <main className="min-h-screen grid place-items-center text-slate-600">Signing you out…</main>;
};

export default Logout;
