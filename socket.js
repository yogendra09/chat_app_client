import { io } from 'socket.io-client';

const URL = 'https://chat-app-server-059e.onrender.com/';

export const socket = io(URL);


