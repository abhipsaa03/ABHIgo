import React, { useContext, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmedRide from "../../components/ConfirmedRide";
import FindingDriver from "../../components/FindingDriver";
import DriverSelected from "../../components/DriverSelected";
import axios from "axios";
import { SocketContext } from "../context/SocketDataContext";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [driverSelected, setDriverSelected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [prices, setPrices] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [ride, setRide] = useState(null);

  const vehicleRef = React.useRef(null);
  const vehicleFoundRef = React.useRef(null);
  const driverSelectedRef = React.useRef(null);
  const confirmRidePanelRef = React.useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return undefined;

    socket.emit("join", { userType: "user", userId: user._id });
    const handleRideStarted = (rideData) => {
      setDriverSelected(false);
      navigate("/riding", { state: { ride: rideData } });
    };
    const handleRideConfirmed = (rideData) => {
      setVehicleFound(false);
      setDriverSelected(true);
      setRide(rideData);
    };

    socket.on("ride-started", handleRideStarted);
    socket.on("ride-confirmed", handleRideConfirmed);
    return () => {
      socket.off("ride-started", handleRideStarted);
      socket.off("ride-confirmed", handleRideConfirmed);
    };
  }, [socket, user?._id, navigate]);

  useEffect(() => {
    const query = activeInput === "pickup" ? pickup : destination;
    if (!activeInput || query.trim().length < 3) {
      setSuggestions([]);
      return undefined;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { address: query.trim() },
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        setSuggestions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") setSuggestions([]);
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [pickup, destination, activeInput]);

  useEffect(() => {
    if (!vehiclePanel || !pickup.trim() || !destination.trim()) return undefined;

    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const requestOptions = {
      params: { origin: pickup, destination },
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    };

    setRouteLoading(true);
    setPrices(null);
    setDistance(null);
    Promise.all([
      axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-prices`, requestOptions),
      axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance`, requestOptions),
    ])
      .then(([priceResponse, distanceResponse]) => {
        setPrices(priceResponse.data || null);
        setDistance(distanceResponse.data || null);
      })
      .catch((error) => {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          setPrices(null);
          setDistance(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setRouteLoading(false);
      });

    return () => controller.abort();
  }, [vehiclePanel, pickup, destination]);

  useEffect(() => {
    if (!navigator.geolocation || !user?._id) return undefined;

    const watchId = navigator.geolocation.watchPosition((position) => {
      socket.emit("update-location-user", {
        userId: user._id,
        location: { ltd: position.coords.latitude, lng: position.coords.longitude },
      });
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user?._id, socket]);

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const inputBeingEdited = activeInput;
    if (inputBeingEdited === "pickup") setPickup(suggestion);
    if (inputBeingEdited === "destination") setDestination(suggestion);
    setSuggestions([]);
    setActiveInput(null);
    setPanelOpen(false);

    if ((inputBeingEdited === "pickup" && destination) || (inputBeingEdited === "destination" && pickup)) {
      setVehiclePanel(true);
    }
  };

  const createRide = async () => {
    if (!pickup.trim() || !destination.trim() || !selectedVehicle) {
      throw new Error("Choose a pickup, destination and ride type first.");
    }

    const token = localStorage.getItem("token");
    return axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicle: selectedVehicle },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  useGSAP(() => {
    gsap.to(vehicleRef.current, { y: vehiclePanel ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(driverSelectedRef.current, { y: driverSelected ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [driverSelected]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { y: vehicleFound ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { y: confirmRidePanel ? "0%" : "100%", duration: 0.42, ease: "power3.out" });
  }, [confirmRidePanel]);

  const closeSearchPanels = () => {
    setVehiclePanel(false);
    setPanelOpen(false);
    setActiveInput(null);
  };

  return (
    <div className="ride-app">
      <div className="abhi-brand"><span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span></div>
      <button type="button" onClick={logoutUser} aria-label="Sign out" className="app-icon-button">
        <i className="ri-logout-box-line ri-lg" aria-hidden="true"></i>
      </button>

      <div className="absolute inset-0 z-20" onClick={closeSearchPanels}>
        <LiveTracking />
      </div>

      <section className="ride-search-shell" aria-label="Book a ride">
        <div className="ride-search-head">
          <div><h1>Find a ride</h1><p>Set your route and choose how you want to go.</p></div>
          {panelOpen && <button type="button" onClick={() => { setPanelOpen(false); setActiveInput(null); }} className="ride-search-close" aria-label="Close location suggestions">⌄</button>}
        </div>
        <form className="ride-search-form" onSubmit={(event) => event.preventDefault()}>
          <div className="ride-route-line" aria-hidden="true" />
          <input
            value={pickup}
            onFocus={() => { setPanelOpen(true); setActiveInput("pickup"); }}
            onChange={(event) => { setPickup(event.target.value); setActiveInput("pickup"); setPanelOpen(true); }}
            className="ride-location-input pickup"
            type="text"
            aria-label="Pickup location"
            autoComplete="off"
            placeholder="Add a pickup location"
          />
          <input
            value={destination}
            onFocus={() => { setPanelOpen(true); setActiveInput("destination"); }}
            onChange={(event) => { setDestination(event.target.value); setActiveInput("destination"); setPanelOpen(true); }}
            className="ride-location-input destination"
            type="text"
            aria-label="Destination"
            autoComplete="off"
            placeholder="Enter your destination"
          />
        </form>
        {!panelOpen && <div className="ride-search-foot">Bike · Auto · Car <span aria-hidden="true">·</span> Estimated fares before you confirm</div>}
        <div className={`ride-suggestion-panel${panelOpen ? " is-open" : ""}`} aria-hidden={!panelOpen}>
          {panelOpen && (
            <LocationSearchPanel
              suggestions={suggestions}
              onSuggestionSelect={handleSuggestionSelect}
            />
          )}
        </div>
      </section>

      <div ref={vehicleRef} className="fixed min-h-[35%] bottom-0 w-full translate-y-full max-h-[54%] ride-sheet overflow-auto z-50">
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          prices={prices}
          distance={distance}
          loading={routeLoading}
          setSelectedPrice={setSelectedPrice}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 w-full translate-y-full ride-sheet overflow-hidden z-50">
        <ConfirmedRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleFound={vehicleFound}
          selectedPrice={selectedPrice}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
          createRide={createRide}
        />
      </div>

      <div ref={vehicleFoundRef} className="fixed z-50 bottom-0 w-full translate-y-full ride-sheet overflow-hidden">
        <FindingDriver
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleFound={vehicleFound}
          selectedPrice={selectedPrice}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
        />
      </div>

      <div ref={driverSelectedRef} className="fixed z-50 bottom-0 w-full translate-y-full ride-sheet overflow-hidden">
        <DriverSelected ride={ride} />
      </div>
    </div>
  );
};

export default Home;
