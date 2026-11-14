import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../../components/CaptainDetails";
import RidePopup from "../../components/RidePopup";
import ConfirmRidePickup from "../../components/ConfirmRidePickup";
import { CaptainDataContext } from "../context/CaptainDataContext";
import { SocketContext } from "../context/SocketDataContext";
import axios from "axios";
import { toast } from "react-toastify";
import LiveTracking from "../../components/LiveTracking";

const CaptainHome = () => {
  const ridePopupRef = useRef(null);
  const confirmRidePickupRef = useRef(null);
  const { captain } = React.useContext(CaptainDataContext);
  const { socket } = React.useContext(SocketContext);
  const [ridePopup, setRidePopup] = useState(false);
  const [ride, setRide] = useState(null);
  const [confirmRidePickup, setConfirmRidePickup] = useState(false);

  useEffect(() => {
    if (!captain?._id) return undefined;

    socket.emit("join", { userId: captain._id, userType: "captain" });
    const handleNewRide = (rideData) => {
      setRide(rideData);
      setRidePopup(true);
    };
    socket.on("new-ride", handleNewRide);
    return () => socket.off("new-ride", handleNewRide);
  }, [captain?._id, socket]);

  useEffect(() => {
    if (!navigator.geolocation || !captain?._id) return undefined;

    const watchId = navigator.geolocation.watchPosition((position) => {
      socket.emit("update-location-captain", {
        userId: captain._id,
        location: { ltd: position.coords.latitude, lng: position.coords.longitude },
      });
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [captain?._id, socket]);

  const confirmRide = async () => {
    if (!ride?._id || !captain?._id) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id, captainId: captain._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRidePopup(false);
      setConfirmRidePickup(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "We couldn't accept this ride. Please try again.");
    }
  };

  useGSAP(() => {
    gsap.to(ridePopupRef.current, { y: ridePopup ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [ridePopup]);

  useGSAP(() => {
    gsap.to(confirmRidePickupRef.current, { y: confirmRidePickup ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [confirmRidePickup]);

  return (
    <div className="captain-app">
      <Link to="/" className="abhi-brand captain-app-brand" aria-label="Abhi Go home"><span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span></Link>
      <Link to="/captain-logout" className="app-icon-button" aria-label="Sign out"><i className="ri-logout-box-line ri-lg" aria-hidden="true" /></Link>

      <div className="absolute inset-0 z-20"><LiveTracking /></div>
      <div className="captain-summary"><CaptainDetails /></div>

      <div ref={ridePopupRef} className="fixed z-50 bottom-0 w-full translate-y-full ride-sheet overflow-auto">
        <RidePopup
          setConfirmRidePickup={setConfirmRidePickup}
          setRidePopup={setRidePopup}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePickupRef} className="fixed z-50 bottom-0 w-full h-screen translate-y-full ride-sheet overflow-auto">
        <ConfirmRidePickup setConfirmRidePickup={setConfirmRidePickup} setRidePopup={setRidePopup} ride={ride} />
      </div>
    </div>
  );
};

export default CaptainHome;
