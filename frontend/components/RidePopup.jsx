import { useState } from "react";

const addressLabel = (address = "") => {
  const [primary, ...rest] = address.split(",");
  return { primary: primary.trim(), detail: rest.join(",").trim() };
};

const RidePopup = ({ setRidePopup, ride, confirmRide }) => {
  const [accepting, setAccepting] = useState(false);
  if (!ride) return <div className="ride-request-empty">Waiting for a ride request…</div>;

  const pickup = addressLabel(ride.pickup);
  const destination = addressLabel(ride.destination);

  const acceptRequest = async () => {
    setAccepting(true);
    try {
      await confirmRide();
    } finally {
      setAccepting(false);
    }
  };

  return (
    <section className="ride-request-card" aria-label="New ride request">
      <div className="ride-request-heading"><span>NEW REQUEST</span><h2>A rider needs a pickup</h2></div>
      <div className="ride-request-route">
        <div className="ride-request-marker" aria-hidden="true"><i /><span /><b /></div>
        <div className="ride-request-stop"><small>Pickup</small><strong>{pickup.primary || "Pickup location"}</strong><span>{pickup.detail}</span></div>
        <div className="ride-request-stop"><small>Destination</small><strong>{destination.primary || "Destination"}</strong><span>{destination.detail}</span></div>
      </div>
      <div className="ride-request-fare"><span><i className="ri-bank-card-line" aria-hidden="true" /> Cash payment</span><strong>₹{Math.ceil(Number(ride.fare || 0))}</strong></div>
      <div className="ride-request-actions">
        <button type="button" onClick={() => setRidePopup(false)} className="ride-decline-button" disabled={accepting}>Skip</button>
        <button type="button" onClick={acceptRequest} className="ride-accept-button" disabled={accepting}>{accepting ? "Accepting…" : "Accept ride"}</button>
      </div>
    </section>
  );
};

export default RidePopup;
