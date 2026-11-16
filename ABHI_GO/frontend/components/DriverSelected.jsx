const DriverSelected = ({ ride }) => {
  if (!ride) return <div className="driver-finding-copy">Waiting for your Captain’s details…</div>;

  const captain = ride.captain || {};
  const name = [captain.fullname?.firstname, captain.fullname?.lastname].filter(Boolean).join(" ") || "Your Captain";
  const vehicle = captain.vehicle || {};

  return (
    <section className="driver-selected-card" aria-label="Captain and pickup details">
      <div className="driver-selected-top">
        <div className="captain-profile-mark" aria-hidden="true">{name[0]?.toUpperCase() || "C"}</div>
        <div><span>YOUR CAPTAIN</span><h2>{name}</h2><small>{vehicle.color || "Vehicle"} · {vehicle.plate || "Details loading"}</small></div>
        <div className="ride-otp"><small>RIDE CODE</small><strong>{ride.otp || "••••••"}</strong></div>
      </div>
      <div className="driver-selected-status"><i /><span>Your Captain has accepted. Keep your ride code ready for pickup.</span></div>
      <div className="driver-selected-pickup"><small>PICKUP</small><strong>{ride.pickup?.split(",")[0] || "Pickup location"}</strong><span>{ride.pickup?.split(",").slice(1).join(",").trim()}</span></div>
    </section>
  );
};

export default DriverSelected;
