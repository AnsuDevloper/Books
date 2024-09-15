const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const userIp = body.ip || 'Unknown';

        // Create the 'user' folder if it doesn't exist
        const userDir = path.join(__dirname, '..', 'user');
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }

        // Create a log entry
        const timestamp = new Date().toISOString();
        const logData = {
            timestamp,
            ip: userIp,
            wifiName: body.wifiName || 'Not Available'
        };

        // Save the log entry to a file
        const logFile = path.join(userDir, `user_${Date.now()}.json`);
        fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'IP address logged successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to log IP address' })
        };
    }
};
