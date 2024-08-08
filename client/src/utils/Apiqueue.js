let apiQueue = [];

export const enqueueApiRequest = (requestFn) => {
    apiQueue.push(requestFn);
};

export const processApiQueue = async () => {
    while (apiQueue.length) {
        const requestFn = apiQueue.shift();
        try {
            await requestFn();
        } catch (error) {
            console.error("Failed to process queued request", error);
            // Optionally, re-enqueue the request if needed
        }
    }
};
