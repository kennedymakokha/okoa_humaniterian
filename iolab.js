
import { Server } from 'socket.io'
// import Shelf from './src/models/shelfmodel.js'
// import { publish } from './iofunctions.js/shelfFunctions.js'
// 

// import User from './src/models/patientModel.js'
const Lab = (http) => {
    const io = new Server(http, {
        cors: {
            origin: [
                "http://localhost:3000",
                "http://localhost:5173",
                "https://rent-space.onrender.com"]
        }
    })
    let users = []

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });

        socket.on('typing', () => {
            console.log('Typing: ');
        });

        socket.on('hello', (e) => {
            io.emit('update_patients', e);
        });
        // socket.on('publishing', async (msg) => {
        //     let result;

        //     await publish(msg)
        //     // include the offset with the message
        //     io.emit('publishing', msg);
        // });
    });
}
export default Lab


