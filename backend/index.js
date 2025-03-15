const { createServer } = require('node:http');
const express = require('express');
const cors = require('cors');
const app = express();
const socketInit = require('./socket')
const routes = require('./routes')
const connectMongoDb = require('./config/database')
const setupAndStartServer = async () => {
    await connectMongoDb()
    app.use(cors());
    app.use(express.json());
    const server = createServer(app);
    socketInit(server);
    app.use("/api", routes)
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
setupAndStartServer()



