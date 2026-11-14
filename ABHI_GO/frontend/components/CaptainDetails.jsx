import React from "react";
import { CaptainDataContext } from "./../src/context/CaptainDataContext";
import "remixicon/fonts/remixicon.css";

const CaptainDetails = () => {
  const { captain } = React.useContext(CaptainDataContext);
  const name = [captain?.fullname?.firstname, captain?.fullname?.lastname].filter(Boolean).join(" ") || "Captain";
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const vehicle = captain?.vehicle || {};

  return (
    <section className="captain-details-card">
      <div className="captain-details-top">
        <div className="captain-profile-mark" aria-hidden="true">{initials}</div>
        <div className="captain-profile-copy"><span>DRIVER DASHBOARD</span><h1>{name}</h1><p>{captain?.email || "Ready for your next ride"}</p></div>
        <span className="captain-online"><i /> Online</span>
      </div>
      <div className="captain-vehicle-info">
        <span className="captain-vehicle-icon" aria-hidden="true"><i className={vehicle.vehicleType === "motorcycle" ? "ri-motorbike-line" : vehicle.vehicleType === "auto" ? "ri-taxi-line" : "ri-car-line"} /></span>
        <div><small>YOUR VEHICLE</small><strong>{vehicle.color || "Vehicle"} {vehicle.vehicleType || ""}</strong></div>
        <b>{vehicle.plate || "Plate not set"}</b>
      </div>
    </section>
  );
};

export default CaptainDetails;
