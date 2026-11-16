import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserDataContext";
import AuthLayout from "../components/AuthLayout";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserDataContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );
      const { user: authenticatedUser, token } = response.data || {};

      if (!authenticatedUser?.email || !token) {
        throw new Error("The server returned an incomplete sign-in response.");
      }

      setUser(authenticatedUser);
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "We couldn't sign you in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      kicker="WELCOME BACK"
      title="Your next ride is close."
      description="Sign in to pick up where you left off and get moving."
      switchText="New to Abhi Go?"
      switchLabel="Create an account"
      switchTo="/signup"
      visualKicker="THE CITY IS YOURS"
      visualTitle={<>Good rides.<br />Better days.</>}
      visualCopy="A little less waiting. A lot more room for what matters."
    >
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="auth-field">
          <label htmlFor="user-email">Email address</label>
          <input id="user-email" className="auth-input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="user-password">Password</label>
          <input id="user-password" className="auth-input" value={password} onChange={(event) => setPassword(event.target.value)} required type="password" autoComplete="current-password" placeholder="Enter your password" />
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Signing in…" : <>Sign in <span aria-hidden="true">→</span></>}</button>
      </form>
      <p className="auth-switch">Driving with us? <Link to="/captain-login">Driver sign in</Link></p>
    </AuthLayout>
  );
};

export default UserLogin;
