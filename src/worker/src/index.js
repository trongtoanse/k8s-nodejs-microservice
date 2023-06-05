require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongodb = require('mongodb');
const logger = require('./utils/logger');
const ip = require("ip");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const DBCOLLECTION = process.env.DBCOLLECTION;
const VERSION = process.env.VERSION || "v1";

function startServer(app) {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, err => {
            if (err) {
                reject(err);
            } else {
                logger.info(`[${VERSION}] Server started and running on http://${HOST}:${PORT}`);
                resolve();
            }
        });
    });
}

async function main() {

    const client = await mongodb.MongoClient.connect(DBHOST, {useUnifiedTopology: true});
    const db = client.db(DBNAME);

    const app = express();
    app.use(cors());

    app.get("/", (req, res) => {
        logger.info(`[${VERSION}] Server Sent Worker!`);
        res.send(`[${VERSION}] Hello Worker!\n`);
    });

    app.get("/api/data", async (req, res) => {
        logger.info(`[${VERSION}] RemoteIP : ${req.ip} - ${req.originalUrl} - ${req.method}`);
        const collection = db.collection(DBCOLLECTION);
        const documents = await collection.find().toArray();
        const data = {
            "ip": ip.address(),
            "version": VERSION,
            "data": documents
        }
        res.json(data);
    });

    await startServer(app);
}

main()
    .then(() => {
    })
    .catch(err => {
        logger.error(err && err.stack || err);
    });
