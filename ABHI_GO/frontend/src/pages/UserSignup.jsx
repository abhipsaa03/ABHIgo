import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";

const UserSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
        fullname: { firstname: firstname.trim(), lastname: lastname.trim() },
        email: email.trim(),
        password,
      });
      toast.success("Account created. Sign in to book your first ride.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      kicker="A BETTER WAY TO GET THERE"
      title="Let's get you moving."
      description="Create your account and make the next trip an easy one."
      switchText="Already have an account?"
      switchLabel="Sign in"
      switchTo="/login"
      visualKicker="TAKE THE EASY ROUTE"
      visualTitle={<>Everyday trips,<br />made lighter.</>}
      visualCopy="Set your pickup, choose the ride that fits and enjoy a smoother city journey."
      legal="By creating an account, you agree to the service terms and privacy policy."
    >
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="auth-name-row">
          <div className="auth-field">
            <label htmlFor="user-firstname">First name</label>
            <input id="user-firstname" className="auth-input" value={firstname} onChange={(event) => setFirstName(event.target.value)} required minLength={3} autoComplete="given-name" placeholder="First name" />
          </div>
          <div className="auth-field">
            <label htmlFor="user-lastname">Last name</label>
            <input id="user-lastname" className="auth-input" value={lastname} onChange={(event) => setLastName(event.target.value)} required minLength={3} autoComplete="family-name" placeholder="Last name" />
          </div>
        </div>
        <div className="auth-field">
          <label htmlFor="user-email">Email address</label>
          <input id="user-email" className="auth-input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="user-password">Password</label>
          <input id="user-password" className="auth-input" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} type="password" autoComplete="new-password" placeholder="At least 6 characters" />
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Creating account…" : <>Create account <span aria-hidden="true">→</span></>}</button>
      </form>
      <p className="auth-switch">Driving with us? <Link to="/captain-signup">Join as a driver</Link></p>
    </AuthLayout>
  );
};

export default UserSignup;
