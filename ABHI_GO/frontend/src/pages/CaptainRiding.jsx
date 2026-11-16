import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import FinishRide from "../../components/FinishRide";
import LiveTracking from "../../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const rideData = location.state?.ride;

  useEffect(() => {
    if (!rideData?._id) navigate("/captain-home", { replace: true });
  }, [rideData?._id, navigate]);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? "0%" : "100%",
      duration: 0.42,
      ease: "power3.out",
    });
  }, [finishRidePanel]);

  if (!rideData) return null;

  return (
    <main className="ride-app">
      <Link to="/" className="abhi-brand captain-app-brand" aria-label="Abhi Go home"><span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span></Link>
      <Link to="/captain-logout" className="app-icon-button" aria-label="Sign out"><i className="ri-logout-box-line ri-lg" aria-hidden="true" /></Link>
      <div className="absolute inset-0 z-20"><LiveTracking /></div>
      <div className="captain-trip-action">
        <div><span>RIDE IN PROGRESS</span><h1>Stay focused on the road.</h1><p>When you’ve reached the destination and received payment, close out this trip.</p></div>
        <button type="button" className="ride-confirm-button" onClick={() => setFinishRidePanel(true)}>Complete ride <span aria-hidden="true">→</span></button>
      </div>
      <div ref={finishRidePanelRef} className="fixed inset-0 z-50 translate-y-full ride-sheet overflow-y-auto">
        <FinishRide setFinishRidePanel={setFinishRidePanel} ride={rideData} />
      </div>
    </main>
  );
};

export default CaptainRiding;
