import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptainDataContext } from "../context/CaptainDataContext";
import AuthLayout from "../components/AuthLayout";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCaptain, setError } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, { email, password });
      const { captain, token } = response.data || {};

      if (!captain?._id || !token) {
        throw new Error("The server returned an incomplete sign-in response.");
      }

      setCaptain(captain);
      localStorage.setItem("token", token);
      navigate("/captain-home");
    } catch (error) {
      const message = error.response?.data?.message || "We couldn't sign you in. Check your email and password.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      kicker="DRIVER PARTNER"
      title="Welcome back, Captain."
      description="Sign in to get online and see what’s moving in your area."
      switchText="New to driving with Abhi Go?"
      switchLabel="Join the driver team"
      switchTo="/captain-signup"
      visualKicker="YOUR NEXT TRIP IS OUT THERE"
      visualTitle={<>Take the wheel.<br />Set your pace.</>}
      visualCopy="Pick up rides around your city and make every trip count."
    >
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="auth-field">
          <label htmlFor="captain-email">Email address</label>
          <input id="captain-email" className="auth-input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="captain-password">Password</label>
          <input id="captain-password" className="auth-input" value={password} onChange={(event) => setPassword(event.target.value)} required type="password" autoComplete="current-password" placeholder="Enter your password" />
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Signing in…" : <>Driver sign in <span aria-hidden="true">→</span></>}</button>
      </form>
      <p className="auth-switch">Booking a ride? <Link to="/login">Passenger sign in</Link></p>
    </AuthLayout>
  );
};

export default CaptainLogin;
