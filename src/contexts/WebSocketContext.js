"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {Toast} from "../utils/funcs";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  let socket;
  const url = "wss://echo.websocket.events";

  useEffect(() => {
    socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("WebSocket connected");
      setInterval(() => {
        socket.send("Ping!");
      }, 5000);
    };

    socket.onmessage = (event) => {
      setUnreadCount((prevCount) => {
        const newCount = prevCount + 1;
        Toast.success(`${newCount} پیغام خوانده نشده دارید`);
        return newCount;
      });
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, unreadCount }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
