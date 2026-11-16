import { useState } from "react";
import { toast } from "react-toastify";

const getAddressParts = (address = "") => {
  const [primary, ...rest] = address.split(",");
  return { primary: primary.trim(), detail: rest.join(",").trim() };
};

const rideLabels = {
  car: { name: "Abhi Go Car", icon: "ri-car-line", detail: "Comfortable ride" },
  moto: { name: "Abhi Go Bike", icon: "ri-motorbike-line", detail: "Quick city ride" },
  auto: { name: "Abhi Go Auto", icon: "ri-taxi-line", detail: "Easy city ride" },
};

const ConfirmedRide = ({
  setConfirmRidePanel,
  setVehicleFound,
  selectedPrice,
  selectedVehicle,
  destination,
  pickup,
  createRide,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const pickupParts = getAddressParts(pickup);
  const destinationParts = getAddressParts(destination);
  const ride = rideLabels[selectedVehicle] || rideLabels.car;

  const confirmBooking = async () => {
    setSubmitting(true);
    try {
      await createRide();
      setConfirmRidePanel(false);
      setVehicleFound(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "We couldn't request this ride. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="confirm-ride" aria-label="Confirm ride details">
      <div className="confirm-ride-head">
        <div><span>ALMOST THERE</span><h2>Confirm your ride</h2></div>
        <button type="button" onClick={() => setConfirmRidePanel(false)} className="ride-search-close" aria-label="Back to ride options">⌄</button>
      </div>

      <div className="confirm-vehicle-card">
        <span className="confirm-vehicle-icon" aria-hidden="true"><i className={ride.icon} /></span>
        <div><strong>{ride.name}</strong><small>{ride.detail}</small></div>
        <strong className="confirm-fare">₹{Math.ceil(Number(selectedPrice || 0))}</strong>
      </div>

      <div className="confirm-route">
        <div className="confirm-route-markers" aria-hidden="true"><i /><span /><b /></div>
        <div className="confirm-address">
          <small>Pickup</small><strong>{pickupParts.primary || pickup}</strong>{pickupParts.detail && <span>{pickupParts.detail}</span>}
        </div>
        <div className="confirm-address">
          <small>Destination</small><strong>{destinationParts.primary || destination}</strong>{destinationParts.detail && <span>{destinationParts.detail}</span>}
        </div>
      </div>

      <div className="confirm-payment-row"><span><i className="ri-bank-card-line" aria-hidden="true" /> Cash or UPI</span><span>Estimated fare</span></div>
      <button type="button" onClick={confirmBooking} className="ride-confirm-button" disabled={submitting}>
        {submitting ? "Requesting your ride…" : <>Confirm ride <span aria-hidden="true">→</span></>}
      </button>
    </section>
  );
};

export default ConfirmedRide;
