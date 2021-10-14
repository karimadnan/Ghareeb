const express = require('express');
const app = express();
const http = require('http');
const DB = require('./mongo');
const url = process.env.MONGODB_URI
const dbname = process.env.DBName

const skt = require('./socket');

DB.connect(url, dbname).then(success => {
    console.log("Connected to DB - Server started!")
    skt.startConnection();
}, err => {
    console.log('Failed To connect DB', err);
    process.exit(1);
});