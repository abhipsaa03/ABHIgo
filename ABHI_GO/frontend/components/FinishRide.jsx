import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const addressParts = (address = "") => {
  const [primary, ...rest] = address.split(",");
  return { primary: primary.trim(), detail: rest.join(",").trim() };
};

const FinishRide = ({ setFinishRidePanel, ride }) => {
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!ride) return <div className="finish-ride-empty">Ride details are unavailable.</div>;

  const pickup = addressParts(ride.pickup);
  const destination = addressParts(ride.destination);
  const riderName = [ride.user?.fullname?.firstname, ride.user?.fullname?.lastname].filter(Boolean).join(" ") || "Passenger";

  const finishRide = async () => {
    if (!paymentReceived) {
      toast.error("Confirm that you received payment before closing this ride.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Ride completed.");
      navigate("/captain-home", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "We couldn't close this ride. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="finish-ride">
      <div className="finish-ride-heading"><span>COMPLETE THIS TRIP</span><h1>Finish ride</h1><button type="button" onClick={() => setFinishRidePanel(false)} aria-label="Close" className="ride-search-close">×</button></div>
      <div className="finish-rider"><div className="captain-profile-mark" aria-hidden="true">{riderName[0]?.toUpperCase() || "P"}</div><div><small>PASSENGER</small><strong>{riderName}</strong></div></div>
      <div className="confirm-route finish-route">
        <div className="confirm-route-markers" aria-hidden="true"><i /><span /><b /></div>
        <div className="confirm-address"><small>PICKUP</small><strong>{pickup.primary || ride.pickup}</strong><span>{pickup.detail}</span></div>
        <div className="confirm-address"><small>DESTINATION</small><strong>{destination.primary || ride.destination}</strong><span>{destination.detail}</span></div>
      </div>
      <div className="finish-fare"><span><i className="ri-bank-card-line" aria-hidden="true" /> Fare · Cash</span><strong>₹{Math.ceil(Number(ride.fare || 0))}</strong></div>
      <label className="finish-payment-check"><input type="checkbox" checked={paymentReceived} onChange={(event) => setPaymentReceived(event.target.checked)} /><span>I received the ride payment from the passenger.</span></label>
      <div className="finish-ride-actions">
        <button type="button" className="ride-confirm-button" onClick={finishRide} disabled={submitting}>{submitting ? "Closing ride…" : "Complete ride"}</button>
        <button type="button" className="finish-cancel-button" onClick={() => setFinishRidePanel(false)}>Go back</button>
      </div>
    </section>
  );
};

export default FinishRide;
