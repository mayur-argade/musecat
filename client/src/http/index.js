import axios from "axios";


const api = axios.create({
    baseURL: "https://omanwhereto.com/api/v1/",
    // baseURL: "http://localhost:5000/api/v1/",
    withCredentials: true,
    credentials: "include",
    headers: {
        headers: { 'Content-Type': 'application/json' },
        Accept: "application/json",
    },
});

export const vendorLogin = (data) => api.post("auth/vendor/login", data);
export const VendorRegister = (data) => api.post("auth/vendor/register", data)
export const vendorProfileApi = (data) => api.get('vendor/profile', data)
export const VendorUpdateProfileApi = (data) => api.patch('vendor/update-profile', data)
export const vendorLogout = (data) => api.post("auth/vendor/logout", data)
export const VedorDetails = (data) => api.get(`vendor/details/${data}`, data)
export const ClientRegister = (data) => api.post("auth/user/register", data)
export const ClientLogin = (data) => api.post("auth/user/login", data)
export const ClientGoogleLogin = (data) => api.post("auth/user/googlelogin", data)
export const vendorGoogleLogin = (data) => api.post("auth/vendor/googlelogin", data)
export const ClienVerify = (data) => api.patch(`auth/user/verify/${data}`, data)
export const VendorVerify = (data) => api.patch(`auth/vendor/verify/${data}`, data)
export const ClientProfileApi = (data) => api.get("user/profile", data)
export const ClientUpdateProfileApi = (data) => api.patch("user/update-profile", data)
export const clientLogout = (data) => api.post("auth/user/logout", data)
export const SendVerificationLink = (data) => api.patch('auth/user/forget-password/send-mail', data)
export const SendForgetPasswordMail = (data) => api.patch('auth/vendor/forget-password/send-mail', data)
export const resetUserPassword = (data) => api.patch('auth/user/reset-password', data)
export const resetVendorPassword = (data) => api.patch(`auth/vendor/reset-password/${data}`, data)
export const getCustomersSavedCards = (data) => api.get('user/get-payment-methods', data)
export const googleLogin = (data) => api.post('auth/google/callback', data)
export const facebookLogin = (data) => api.post('auth/user/facebook/login', data)
export const vendorFacebookLogin = (data) => api.post('auth/vendor/facebook/login', data)
export const addToCalender = (data) => api.post('auth/google/addToCalender', data)

export const VendorHomeApi = (data) => api.get("vendor/home", data)
export const VendorHostedEventsApi = (data) => api.get("vendor/events", data)
export const getEventDataApi = (data) => api.get(`event/${data}`, data)
export const VendorBookedTicketApi = (data) => api.get(`vendor/${data}/tickets`, data)
export const VendorCreateOffer = (data) => api.post("vendor/create-offer", data)
export const VendorCreateEvent = (data) => api.post("/vendor/create-event", data)
export const getAllVenues = (data) => api.get('venue/venues/all', data)
export const VendorUpdateEvent = (data) => api.patch(`vendor/event/update-event`, data)
export const GetVendorNotification = (data) => api.get(`notification/all`, data)
export const GetUserNotification = (data) => api.patch(`user/notification/all`, data)
export const GetNotificationCount = (data) => api.get('notification/count', data)
export const DeleteVendorNotification = (data) => api.delete('notification/delete', data)
export const DeleteUserNotification = (data) => api.delete('user/notification/delete', data)
export const VendorUpdateTicketStatus = (data) => api.patch(`ticket/update-payment-status`, data)
export const VendorCreateVenue = (data) => api.post('venue/create-venue', data)
export const vendorUpdateTicketStatus = (data) => api.patch('update-ticket-status', data)
export const ClientContactUs = (data) => api.post("user/write-contactmsg", data)
export const VendorUnverifiedEvents = (data) => api.get("/vendor/listing/unverified", data)

export const ClientEventDetailsApi = (data) => api.get(`user/eventDetails/${data}`, data)
export const ClientFavEventApi = (data) => api.get("user/favorites", data)
export const ClientPastPurchaseApi = (data) => api.get("/user/pastpurchased", data)
export const getCategoryEvents = (data, query) => api.get(`category/${data.category}${query}`, { params: data })
export const ClientBookTicket = (data) => api.post("ticket/bookticket", data)
export const ClientTicketStatusApi = (data) => api.get(`ticket/${data}`, data)
export const addToFavorites = (data) => api.put(`event/like`, data)
export const UpdateTicketStatusPayment = (data) => api.patch('ticket/update-payment-status', data)
export const ClientVenueDetails = (data) => api.get(`venue/${data}`, data)
export const GetTrendingEvents = (data) => api.get('/trending-events', data)
export const GetAllCategory = (data) => api.get("category/all", data)
export const ClientUpcomingEvents = (data) => api.get(`events/upcoming-events${data}`, data)
export const ClientGetOffers = (data) => api.get("/offers/", data)
export const CategoryCount = (data) => api.get(`category/eventcounts${data}`, data)

export const AdminGetVendorEvents = (data) => api.get(`admin/${data}/allevents`, data)
export const getEventsForAdmin = (data) => api.get('admin/getAllEvents', data)
export const getOffersForAdmin = (data) => api.get('admin/getAllOffers', data)
export const getAllVenuesAdmin = (data) => api.get('venue/admin/getAllVenues', data)
export const AdminCreateEvent = (data) => api.post("/admin/create-event", data)
export const AdminCreateOffer = (data) => api.post("/admin/create-offer", data)
export const AdminCreateVendor = (data) => api.post("/admin/create-vendor", data)
export const AdminCreateVenue = (data) => api.post("/admin/create-venue", data)
export const AdminCreateCategory = (data) => api.post("/category/create-category", data)
export const AdminGetAllEvents = (data) => api.get("/admin/getAllEvents", data)
export const AdminDeleteEvent = (data) => api.delete("/admin/delete-event", { data: data })
export const AdminVerifyEvent = (data) => api.patch("/admin/verify-event", { data: data })
export const AdminEditEvent = (data) => api.patch("/admin/edit-event", data)
export const AdminVerifyVenue = (data) => api.patch(`venue/admin/verify-venue`, data)
export const AdminGetAllOffers = (data) => api.get("/admin/getAllOffers", data)
export const AdminDeleteOffer = (data) => api.delete("/admin/delete-offer", data)
export const AdminEditOffer = (data) => api.patch("/admin/edit-offer", data)
export const AdminStats = (data) => api.get('/admin/stats', data)
export const AdminDeleteVenue = (data) => api.delete("venue/admin/delete-venue", { data: data })
export const AdminEditCategory = (data) => api.put('category/update-category', data)

export const AdminVerifyVendor = (data) => api.patch(`/admin/verify-vendor`, data)
export const AdminGetAllVendors = (data) => api.get("/admin/getUnverifiedVendors", data)
export const AdminDeleteCategory = (data) => api.delete("/category/delete-category", { data: data })
export const GetVendorData = (data) => api.get(`admin/get-vendor-profile/${data}`, data)
export const AdminGetAllUsers = (data) => api.get("/admin/getAllUsers", data)
export const AdminGetUnverifiedVendors = (data) => api.get("admin/get-unverified-vendors", data)
export const AdminListUsers = (data) => api.get('/admin/list-all-users', data)
export const AdminDeleteUser = (data) => api.delete('/admin/delete-user', { data: data })
export const AdminListVendors = (data) => api.get('/admin/list-all-vendors', data)
export const AdminDeleteVendor = (data) => api.delete(`/admin/delete-vendor`, { data: data })
export const AdminEditVenue = (data) => api.patch('venue/admin/edit-venue', data)

export const handleUpload = (formData) => {
    return axios.post('https://omanwhereto.com/api/v1/upload', formData)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error; // Rethrow the error to be caught by the caller
        });
};

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 && originalRequest &&
            !originalRequest.isretry
        ) {
            originalRequest.isRetry = true;
            try {
                // Create a new axios instance for the refresh request
                const refreshApi = axios.create({
                    baseURL: "https://omanwhereto.com/api/v1/",
                    // baseURL: "http://localhost:5000/api/v1/",
                    withCredentials: true, // Set withCredentials here
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                const response = await refreshApi.post("auth/refresh");
                console.log("this is axios response -> ", response)
                console.log(response);
                return api.request(originalRequest);
            } catch (err) {
                console.log(err);
                if (err.response.status == 401) {
                    // window.location.href = '/login'
                }
            }
        } else {
            window.location.href = "/login"
        }
        throw error;
    }
);


export default api;
