const rideOptions = [
  { id: "car", title: "Abhi Go Car", note: "Comfortable, spacious", capacity: "4 seats", symbol: "ri-car-line" },
  { id: "moto", title: "Abhi Go Bike", note: "Affordable, quick", capacity: "1 seat", symbol: "ri-motorbike-line" },
  { id: "auto", title: "Abhi Go Auto", note: "Easy city rides", capacity: "3 seats", symbol: "ri-taxi-line" },
];

const formatDuration = (seconds) => {
  const totalMinutes = Math.max(1, Math.round(Number(seconds || 0) / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours} hr ${minutes} min` : `${minutes} min`;
};

const VehiclePanel = ({
  setVehiclePanel,
  setConfirmRidePanel,
  prices,
  distance,
  loading,
  setSelectedPrice,
  setSelectedVehicle,
}) => {
  const routeReady = distance?.status === "OK" && distance?.duration?.value != null && prices;

  const chooseVehicle = (option) => {
    setSelectedVehicle(option.id);
    setSelectedPrice(prices[option.id]);
    setConfirmRidePanel(true);
    setVehiclePanel(false);
  };

  return (
    <section className="vehicle-picker" aria-label="Choose your ride">
      <div className="vehicle-picker-head">
        <div><span>RIDE OPTIONS</span><h2>Choose your ride</h2></div>
        <button type="button" onClick={() => setVehiclePanel(false)} aria-label="Close ride options" className="ride-search-close">⌄</button>
      </div>

      {loading ? (
        <div className="vehicle-loading" role="status"><span className="vehicle-loader" />Calculating ride options…</div>
      ) : !routeReady ? (
        <div className="vehicle-error" role="status"><strong>We couldn’t calculate this route.</strong><span>Check the pickup and destination, then try again.</span></div>
      ) : (
        <div className="vehicle-options">
          {rideOptions.map((option) => (
            <button type="button" className="vehicle-option" key={option.id} onClick={() => chooseVehicle(option)}>
              <span className="vehicle-option-art" aria-hidden="true"><i className={option.symbol} /></span>
              <span className="vehicle-option-copy">
                <strong>{option.title}</strong>
                <span>{option.capacity} · {formatDuration(distance.duration.value)}</span>
                <small>{option.note}</small>
              </span>
              <span className="vehicle-option-price">₹{Math.ceil(Number(prices[option.id] || 0))}<small>estimated</small></span>
              <span className="vehicle-option-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default VehiclePanel;
