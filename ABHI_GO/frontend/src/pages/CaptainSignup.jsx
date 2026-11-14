import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";

const CaptainSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("1");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, {
        fullname: { firstname: firstname.trim(), lastname: lastname.trim() },
        email: email.trim(),
        password,
        vehicle: {
          color: vehicleColor.trim(),
          plate: vehiclePlate.trim(),
          capacity: Number(vehicleCapacity),
          vehicleType,
        },
      });
      toast.success("Driver account created. Sign in to get started.");
      navigate("/captain-login", { replace: true });
    } catch (error) {
      const message = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || "We couldn't create your driver account. Please review your details.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      kicker="DRIVER PARTNER"
      title="Make the city yours."
      description="A few details about you and your vehicle will get you on your way."
      switchText="Already a Captain?"
      switchLabel="Sign in"
      switchTo="/captain-login"
      visualKicker="DRIVE WITH ABHI GO"
      visualTitle={<>Your city.<br />Your schedule.</>}
      visualCopy="Join a ride network built around flexible trips and thoughtful service."
      legal="Your details are used to create and manage your driver account."
    >
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="auth-name-row">
          <div className="auth-field">
            <label htmlFor="captain-firstname">First name</label>
            <input id="captain-firstname" className="auth-input" value={firstname} onChange={(event) => setFirstName(event.target.value)} required minLength={3} autoComplete="given-name" placeholder="First name" />
          </div>
          <div className="auth-field">
            <label htmlFor="captain-lastname">Last name</label>
            <input id="captain-lastname" className="auth-input" value={lastname} onChange={(event) => setLastName(event.target.value)} required autoComplete="family-name" placeholder="Last name" />
          </div>
        </div>
        <div className="auth-field">
          <label htmlFor="captain-email">Email address</label>
          <input id="captain-email" className="auth-input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="auth-field">
          <label htmlFor="captain-password">Password</label>
          <input id="captain-password" className="auth-input" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} type="password" autoComplete="new-password" placeholder="At least 6 characters" />
        </div>
        <div className="auth-field">
          <label>Vehicle information</label>
          <div className="auth-vehicle-row">
            <input aria-label="Vehicle color" className="auth-input" value={vehicleColor} onChange={(event) => setVehicleColor(event.target.value)} required minLength={3} placeholder="Vehicle color" />
            <input aria-label="Vehicle plate" className="auth-input" value={vehiclePlate} onChange={(event) => setVehiclePlate(event.target.value)} required minLength={3} autoComplete="off" placeholder="Plate number" />
          </div>
        </div>
        <div className="auth-vehicle-row">
          <div className="auth-field">
            <label htmlFor="vehicle-capacity">Seats</label>
            <input id="vehicle-capacity" className="auth-input" value={vehicleCapacity} onChange={(event) => setVehicleCapacity(event.target.value)} required type="number" min="1" max="20" inputMode="numeric" />
          </div>
          <div className="auth-field">
            <label htmlFor="vehicle-type">Vehicle type</label>
            <select id="vehicle-type" className="auth-input" value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} required>
              <option value="" disabled>Select type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
        </div>
        <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Creating account…" : <>Create driver account <span aria-hidden="true">→</span></>}</button>
      </form>
      <p className="auth-switch">Booking a ride? <Link to="/signup">Create a passenger account</Link></p>
    </AuthLayout>
  );
};

export default CaptainSignup;
