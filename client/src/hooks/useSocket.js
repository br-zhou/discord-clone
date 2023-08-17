import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

socket.on("connect", () => {
  console.log("Connection Successful!");
});

export const useStocket = () => {
  return socket;
};
