import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const vendorLogin = (data) => api.post("auth/vendor/login", data);
export const VendorRegister = (data) => api.post("auth/vendor/register", data)
export const VendorHomeApi = (data) => api.get("vendor/home", data)
export const VendorHostedEventsApi = (data) => api.get("vendor/events", data)
export const getEventDataApi = (data) => api.get(`event/${data}`, data)
export const getVendorNotification = (data) => api.get('notification')
export const vendorProfileApi = (data) => api.get('vendor/profile', data)
export const VendorUpdateProfileApi = (data) => api.patch('vendor/update-profile', data)
export const VendorBookedTicketApi = (data) => api.get(`vendor/${data}/tickets`, data)
export const VendorCreateOffer = (data) => api.post("vendor/create-offer", data)
export const VendorCreateEvent = (data) => api.post("/vendor/create-event", data)

export const ClientRegister = (data) => api.post("auth/user/register", data)
export const ClientLogin = (data) => api.post("auth/user/login", data)
export const ClientProfileApi = (data) => api.get("user/profile", data)
export const ClientUpdateProfileApi = (data) => api.patch("user/update-profile", data)
export const ClientEventDetailsApi = (data) => api.get(`user/eventDetails/${data}`, data)
export const ClientFavEventApi = (data) => api.get("user/favorites", data)
export const ClientPastPurchaseApi = (data) => api.get("/user/pastpurchased", data)
export const ClientContactUs = (data) => api.post("user/write-contactmsg", data)
export const getCategoryEvents = (data) => api.get(`category/${data}`, data)
export const ClientBookTicket = (data) => api.post("ticket/bookticket", data)
export const ClientTicketStatusApi = (data) => api.get(`ticket/${data}`, data)
export const clientLogout = (data) => api.post("auth/user/logout", data)
export const vendorLogout = (data) => api.post("auth/vendor/logout", data)

export const GetAllCategory = (data) => api.get("category/", data)
export const ClientUpcomingEvents = (data) => api.get(`events/upcoming-events${data}`, data)
export const ClientGetOffers = (data) => api.get("/offers/", data)


api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 && originalRequest &&
            !originalRequest._isretry
        ) {
            originalRequest.isRetry = true;
            try {
                // Create a new axios instance for the refresh request
                const refreshApi = axios.create({
                    baseURL: "http://localhost:5000/api/v1/",
                    withCredentials: true, // Set withCredentials here
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                const response = await refreshApi.post("auth/refresh");

                console.log(response);
                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;
