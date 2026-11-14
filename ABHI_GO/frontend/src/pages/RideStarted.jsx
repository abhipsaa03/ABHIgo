import { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketDataContext";
import LiveTracking from "../../components/LiveTracking";

const addressParts = (address = "") => {
  const [primary, ...rest] = address.split(",");
  return { primary: primary.trim(), detail: rest.join(",").trim() };
};

const RideStarted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const ride = location.state?.ride;

  useEffect(() => {
    if (!ride?.user?._id) {
      navigate("/home", { replace: true });
      return undefined;
    }

    socket.emit("join", { userType: "user", userId: ride.user._id });
    const handleRideEnded = () => navigate("/home", { replace: true });
    socket.on("ride-ended", handleRideEnded);
    return () => socket.off("ride-ended", handleRideEnded);
  }, [ride?.user?._id, socket, navigate]);

  if (!ride) return null;

  const destination = addressParts(ride.destination);
  const captain = ride.captain || {};
  const captainName = [captain.fullname?.firstname, captain.fullname?.lastname].filter(Boolean).join(" ") || "Your Captain";

  return (
    <main className="ride-status-page">
      <Link to="/home" className="app-icon-button" aria-label="Back to home"><i className="ri-home-line ri-lg" aria-hidden="true" /></Link>
      <div className="absolute inset-0 z-20"><LiveTracking /></div>
      <section className="ride-status-card">
        <div className="ride-status-captain"><div className="captain-profile-mark" aria-hidden="true">{captainName[0]?.toUpperCase() || "C"}</div><div><small>YOUR CAPTAIN</small><h1>{captainName}</h1><span>{captain.vehicle?.color || "Vehicle"} · {captain.vehicle?.plate || "Details loading"}</span></div><b>★ 4.9</b></div>
        <div className="ride-status-detail"><span className="ride-status-icon"><i className="ri-map-pin-2-line" aria-hidden="true" /></span><div><small>DESTINATION</small><strong>{destination.primary || ride.destination}</strong><span>{destination.detail}</span></div></div>
        <div className="ride-status-detail"><span className="ride-status-icon"><i className="ri-bank-card-line" aria-hidden="true" /></span><div><small>FARE · CASH</small><strong>₹{Math.ceil(Number(ride.fare || 0))}</strong><span>Pay your Captain at the end of the ride.</span></div></div>
        <div className="ride-status-note"><i className="ri-shield-check-line" aria-hidden="true" /><span>Your ride is in progress. You’ll return to the ride page when it ends.</span></div>
      </section>
    </main>
  );
};

export default RideStarted;
