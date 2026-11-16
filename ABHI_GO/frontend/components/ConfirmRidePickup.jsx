import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const addressParts = (address = "") => {
  const [primary, ...rest] = address.split(",");
  return { primary: primary.trim(), detail: rest.join(",").trim() };
};

const ConfirmRidePickup = ({ ride, setConfirmRidePickup, setRidePopup }) => {
  const [otp, setOtp] = useState("");
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  if (!ride) return <div className="ride-request-empty">Ride details are loading…</div>;

  const pickup = addressParts(ride.pickup);
  const destination = addressParts(ride.destination);
  const riderName = [ride.user?.fullname?.firstname, ride.user?.fullname?.lastname].filter(Boolean).join(" ") || "Passenger";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStarting(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: { rideId: ride._id, otp: otp.trim() },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        navigate("/captain-riding", { state: { ride: response.data || ride } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "That ride code didn't work. Check it and try again.");
    } finally {
      setStarting(false);
    }
  };

  return (
    <form className="captain-start-ride" onSubmit={handleSubmit}>
      <div className="finish-ride-heading"><span>RIDE ACCEPTED</span><h1>Confirm pickup</h1><button type="button" onClick={() => { setConfirmRidePickup(false); setRidePopup(false); }} aria-label="Close ride request" className="ride-search-close">×</button></div>
      <div className="finish-rider"><div className="captain-profile-mark" aria-hidden="true">{riderName[0]?.toUpperCase() || "P"}</div><div><small>PASSENGER</small><strong>{riderName}</strong></div><b className="start-ride-fare">₹{Math.ceil(Number(ride.fare || 0))}</b></div>
      <div className="confirm-route finish-route">
        <div className="confirm-route-markers" aria-hidden="true"><i /><span /><b /></div>
        <div className="confirm-address"><small>PICKUP</small><strong>{pickup.primary || ride.pickup}</strong><span>{pickup.detail}</span></div>
        <div className="confirm-address"><small>DESTINATION</small><strong>{destination.primary || ride.destination}</strong><span>{destination.detail}</span></div>
      </div>
      <div className="captain-otp-field"><label htmlFor="ride-otp">Enter the passenger’s 6-digit ride code</label><input id="ride-otp" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} className="auth-input" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required placeholder="••••••" /></div>
      <div className="start-ride-actions">
        <button type="submit" className="ride-confirm-button" disabled={starting}>{starting ? "Starting ride…" : "Start ride"}</button>
        <button type="button" className="finish-cancel-button" onClick={() => setConfirmRidePickup(false)}>Go back</button>
      </div>
    </form>
  );
};

export default ConfirmRidePickup;
