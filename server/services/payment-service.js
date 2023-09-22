const axios = require('axios').default;


class PaymentService {
    async CreateSession(paymentdata) {
        const options = {
            method: 'POST',
            url: 'https://uatcheckout.thawani.om/api/v1/checkout/session',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            },
            data: {
                client_reference_id: paymentdata.client_ref_id,
                mode: 'payment',
                products: [{ name: paymentdata.name, quantity: paymentdata.quantity, unit_amount: paymentdata.unitAmout }],
                success_url: `https://www.omanwhereto.com/${paymentdata.name}`,
                cancel_url: 'https://www.omanwhereto.com/',
                metadata: { 'Customer name': 'user01', 'order id': paymentdata.name }
            }
        };
        try {
            const { data } = await axios.request(options);
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }
}

module.exports = new PaymentService();