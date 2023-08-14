import io from "socket.io-client";

const socket = io.connect("http://localhost:7999");

socket.on("connect", () => {
  console.log("Connection Successful!")
});

socket.on("new-message", (data) => {
  console.log(data);
});

export const useStocket = () => {
  return socket;
};