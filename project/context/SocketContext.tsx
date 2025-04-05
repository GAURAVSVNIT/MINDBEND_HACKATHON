import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInitializer = async () => {
      // First fetch to ensure the socket server is running
      await fetch('/api/socket');
      
      const socketInstance = io();
      
      socketInstance.on('connect', () => {
        console.log('Connected to socket');
        setIsConnected(true);
      });
      
      socketInstance.on('disconnect', () => {
        console.log('Disconnected from socket');
        setIsConnected(false);
      });
      
      setSocket(socketInstance);
    };

    socketInitializer();

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};