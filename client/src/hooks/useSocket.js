import io from "socket.io-client";

const socket = io.connect("http://localhost:7999");

socket.on("connect", () => {
  console.log("Connection Successful!");
});

export const useStocket = () => {
  return socket;
};
