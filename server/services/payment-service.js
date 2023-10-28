const axios = require('axios').default;
const userService = require('./user-service')

class PaymentService {
    async createCustomer(userid, email) {
        console.log(userid, email)
        const options = {
            method: 'POST',
            url: 'https://uatcheckout.thawani.om/api/v1/customers',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            },
            data: { client_customer_id: "customer@example.com" }
        };

        try {
            const { data } = await axios.request(options);
            if (data.success == true) {
                const userdata = {
                    _id: userid.userid,
                    payment_customer_id: data.data.id
                }
                console.log("userdata --> ", userdata)
                await userService.updateUser(userdata)
            }
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }

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
                customer_id: paymentdata.customerId,
                save_card_on_success: true,
                mode: 'payment',
                products: [{ name: paymentdata.name, quantity: paymentdata.quantity, unit_amount: paymentdata.unitAmout * 1000 }],
                success_url: `https://www.omanwhereto.com/ticketstatus/${paymentdata.ticketid}`,
                cancel_url: 'https://www.omanwhereto.com/',
                // success_url: `http://localhost:3000/ticketstatus/${paymentdata.ticketid}`,
                // cancel_url: 'http://localhost:3000',

                metadata: { 'Customer name': 'user01', 'order id': '1' }
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

    async createPaymentIntent(paymentdata) {
        const options = {
            method: 'POST',
            url: 'https://uatcheckout.thawani.om/api/v1/payment_intents',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            },
            data: {
                payment_method_id: paymentdata.cardid,
                amount: paymentdata.amount * 1000,
                client_reference_id: paymentdata.email,
                return_url: `https://www.omanwhereto.com/ticketstatus/${paymentdata.ticketid}`,
                metadata: { customer: 'thawani developers' }
            }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }

    async confirmPaymentIntent(paymentdata) {
        const options = {
            method: 'POST',
            url: `https://uatcheckout.thawani.om/api/v1/payment_intents/${paymentdata.paymet_intent_id}/confirm`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            },
            data: { '// send empty request to confirm the payment intent': null }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }

    async getSessionInfo(sessionId) {
        const options = {
            method: 'GET',
            url: `https://uatcheckout.thawani.om/api/v1/checkout/session/${sessionId}`,
            headers: {
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }

    async refundPayment(sessionId) {

    }

    async listCustomerPaymentMethods(customerid) {
        const options = {
            method: 'GET',
            url: `https://uatcheckout.thawani.om/api/v1/payment_methods?customer_id=${customerid}`,
            headers: {
                Accept: 'application/json',
                'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'
            }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
            return error
        }
    }
}

module.exports = new PaymentService();