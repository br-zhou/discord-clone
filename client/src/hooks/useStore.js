import { useEffect, useState } from "react";

let globalStore = {
  username: "Guest",
  room: "General",
};

let listeners = [];

export const useStore = () => {
  const setState = useState(globalStore)[1];

  const setStore = (name, value) => {
    const newStore = { [name]: value };
    globalStore = { ...globalStore, ...newStore };

    for (const listener of listeners) {
      listener(globalStore);
    }

    console.log(globalStore, listeners.length);
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalStore, setStore];
};
