import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

interface SocketServer extends HTTPServer {
  io?: SocketIOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
      
      socket.on('crime-report', async (data) => {
        console.log('New crime report:', data);
        
        // Save to MongoDB
        const mongoClient = await clientPromise;
        const db = mongoClient.db();
        const collection = db.collection('crime-reports');
        await collection.insertOne({
          ...data,
          timestamp: new Date()
        });
        
        // Broadcast to police clients
        io.emit('new-crime-report', data);
      });

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
  res.end();
};

export default SocketHandler;