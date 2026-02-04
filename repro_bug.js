
const axios = require('axios');
const jwt = require('jsonwebtoken');

const secret = 'your_secret_key'; // from .env
const token = jwt.sign({ id: 15, role: 'DELIVERY_AGENT' }, secret, { expiresIn: '1h' });

async function main() {
    try {
        console.log("Hitting http://localhost:5000/api/orders/delivery");
        const res = await axios.get('http://localhost:5000/api/orders/delivery', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Success:", res.data);
    } catch (error) {
        console.log("Error Status:", error.response?.status);
        console.log("Error Data:", error.response?.data);
    }
}

main();
