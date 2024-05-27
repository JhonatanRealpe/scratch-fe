const express = require('express');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, './')));
app.use(bodyParser.json());
app.use(cors());
app.get('/proxy', async (req, res) => {
    try {
        const { data } = await axios.get('https://test--scratchcards-realpe.furyapps.io/board', {
            headers: {
                'Content-Type': 'application/json',
                'H-Owner': 'test',
                'X-Tiger-Token': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmY2ZiZjEyLWY2ODUtNDI5NS1iOTIwLWFhMWNkMTUyYzI0NCIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsX2luZm8iOnsiZW1haWwiOiJqaG9uYXRhbi5yZWFscGVAbWVyY2Fkb2xpYnJlLmNvbS5jbyIsImVudmlyb25tZW50IjoiTWVyY2Fkb0xpYnJlIiwiZnVsbF9uYW1lIjoiSmhvbmF0YW4gUmVhbHBlIEJ1cmJhbm8iLCJ0eXBlIjoidXNlciIsInVzZXJuYW1lIjoianJlYWxwZSJ9LCJleHAiOjE3MTQxMTk4MjYsImlhdCI6MTcxNDA4NzQyNiwiaWRlbnRpdHkiOiJtcm46c2VnaW5mOmFkOnVzZXIvanJlYWxwZSIsImlzcyI6ImZ1cnlfdGlnZXIiLCJzdWIiOiJqcmVhbHBlIn0.she3lia-7ZzPt60HyrgOdiCnvLz_4rJ7l_Y5S3lKp9BBUp3m3jzD1NXGZsy-2KYGTQehv0ySEXwwl6Aj-JMuAT--dbgy9KEszoTE8A-qxDGHJQW6SPKGlMWJIalmY26-79_SZEfCwLLbmbTLR-qZt7qz46GEyhgkOLwQNgouY9oYkQlkvBXI_4shY84btvnrWKERtiUmoDV5f0xB9CfEvr4Tb-JLsGLpRLPllrE220RE2C7Pjoi77nhp0_JEX1UAYifQCWajMmKY_whsXOFfe8d8cRfglmaDkcPS0S4qzZcabBZkMEbERe60TI1i2cVstvTgqiUOGwGk-w_wRUiyzQ'
            }
        });
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(error.response.status || 500).json({ error: error.message });
    }
});

app.post('/proxypost', async (req, res) => {
    try {
        const { data } = await axios.post('https://test--scratchcards-realpe.furyapps.io/board', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'H-Owner': 'test',
                'X-Tiger-Token': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmY2ZiZjEyLWY2ODUtNDI5NS1iOTIwLWFhMWNkMTUyYzI0NCIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsX2luZm8iOnsiZW1haWwiOiJqaG9uYXRhbi5yZWFscGVAbWVyY2Fkb2xpYnJlLmNvbS5jbyIsImVudmlyb25tZW50IjoiTWVyY2Fkb0xpYnJlIiwiZnVsbF9uYW1lIjoiSmhvbmF0YW4gUmVhbHBlIEJ1cmJhbm8iLCJ0eXBlIjoidXNlciIsInVzZXJuYW1lIjoianJlYWxwZSJ9LCJleHAiOjE3MTQxMTk4MjYsImlhdCI6MTcxNDA4NzQyNiwiaWRlbnRpdHkiOiJtcm46c2VnaW5mOmFkOnVzZXIvanJlYWxwZSIsImlzcyI6ImZ1cnlfdGlnZXIiLCJzdWIiOiJqcmVhbHBlIn0.she3lia-7ZzPt60HyrgOdiCnvLz_4rJ7l_Y5S3lKp9BBUp3m3jzD1NXGZsy-2KYGTQehv0ySEXwwl6Aj-JMuAT--dbgy9KEszoTE8A-qxDGHJQW6SPKGlMWJIalmY26-79_SZEfCwLLbmbTLR-qZt7qz46GEyhgkOLwQNgouY9oYkQlkvBXI_4shY84btvnrWKERtiUmoDV5f0xB9CfEvr4Tb-JLsGLpRLPllrE220RE2C7Pjoi77nhp0_JEX1UAYifQCWajMmKY_whsXOFfe8d8cRfglmaDkcPS0S4qzZcabBZkMEbERe60TI1i2cVstvTgqiUOGwGk-w_wRUiyzQ'
            }
        });
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(error.response.status || 500).json({ error: error.message });
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});