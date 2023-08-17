import { useEffect, useState } from "react";

let globalStore = {
  username: null,
  room: null,
  token: null,
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
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalStore, setStore];
};
