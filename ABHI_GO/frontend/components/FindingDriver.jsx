const rideIcons = { car: "ri-car-line", moto: "ri-motorbike-line", auto: "ri-taxi-line" };

const FindingDriver = ({ selectedVehicle, selectedPrice, pickup, destination }) => (
  <section className="driver-finding" aria-live="polite" aria-label="Finding a driver">
    <span className="driver-finding-spinner" aria-hidden="true" />
    <div className="driver-finding-copy"><span>REQUEST SENT</span><h2>Finding your Captain</h2><p>We’re checking for nearby drivers. This usually takes a moment.</p></div>
    <div className="driver-finding-ride"><i className={rideIcons[selectedVehicle] || rideIcons.car} aria-hidden="true" /><span>{pickup?.split(",")[0] || "Pickup"} <b>→</b> {destination?.split(",")[0] || "Destination"}</span><strong>₹{Math.ceil(Number(selectedPrice || 0))}</strong></div>
  </section>
);

export default FindingDriver;
