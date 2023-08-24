import axios from "axios";
import Notification from "../Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TOKEN = localStorage.getItem("token");
const CART_URL = `${BASE_URL}/cart`;
const HEADERS = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
};

async function addCartItem(toast, id_product) {
    try {
        const response = await axios.post(
            CART_URL,
            {
                id_product,
            },
            HEADERS
        );
        Notification(toast, {
            title: response.data.message,
            status: response.status,
        });
        return response.data;
    } catch (error) {
        Notification(toast, {
            title: error.response.data.message,
            status: error.response.status,
        });
    }
}

async function getCartItems() {
    try {
        const response = await axios.get(CART_URL, HEADERS);
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
    }
}

async function editCartItem(toast, id_cart_item, id_product, qty) {
    try {
        const response = await axios.patch(
            CART_URL,
            {
                id_cart_item,
                id_product,
                qty,
            },
            HEADERS
        );
        Notification(toast, {
            title: response.data.message,
            status: response.status,
        });
        return response.data;
    } catch (error) {
        Notification(toast, {
            title: error.response.data.message,
            status: error.response.status,
        });
    }
}

async function deleteCartItem(toast, id_cart_item) {
    try {
        const response = await axios.delete(
            `${CART_URL}/${id_cart_item}`,
            HEADERS
        );
        Notification(toast, {
            title: response.data.message,
            status: response.status,
        });
        return response.data;
    } catch (error) {
        Notification(toast, {
            title: error.response.data.message,
            status: error.response.status,
        });
    }
}

async function resetCart(toast) {
    try {
        const response = await axios.delete(CART_URL, HEADERS);
        Notification(toast, {
            title: response.data.message,
            status: response.status,
        });
        return response.data;
    } catch (error) {
        Notification(toast, {
            title: error.response.data.message,
            status: error.response.status,
        });
    }
}

async function getCartTotal() {
    try {
        const response = await axios.get(`${CART_URL}/total`, HEADERS);
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
    }
}

export {
    addCartItem,
    getCartItems,
    editCartItem,
    deleteCartItem,
    resetCart,
    getCartTotal,
};
