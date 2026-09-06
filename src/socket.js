import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || window.location.origin;
const socket = io(API_URL, { transports: ['websocket', 'polling'], autoConnect: false });
export default socket;
