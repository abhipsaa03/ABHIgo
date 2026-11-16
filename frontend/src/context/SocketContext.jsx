import { io } from "socket.io-client";
import { SocketContext } from "./SocketDataContext";

const socket = io(import.meta.env.VITE_BASE_URL || "http://localhost:4000");

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
