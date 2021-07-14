import axios from "axios";

const url = {
    details: "/shop/details",
    getDetails: "/shop/details?shopID=",
    applyOffer: "/shop/apply-offer",
    listOffer: "/shop/list-offer",
    getBanner: "/shop/banner",
};

export const shop = {
    details: async (data) => {
        return await axios.post(url.details, data);
    },
    getDetails: async (shopID) => {
        return await axios.get(url.getDetails + shopID);
    },
    applyOffer: async (data) => {
        const res = await axios.post(url.applyOffer, data);
        return res;
    },
    getBanner: async () => {
        const res = await axios.get(url.getBanner);
        return res;
    },
    listOffer: async () => {
        const res = await axios.get(url.listOffer);
        return res;
    },
};
