import axios from "axios";
import Notification from "../Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TOKEN = localStorage.getItem("token");
const TRANSACTION_URL = `${BASE_URL}/transactions`;
const HEADERS = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
};

async function addTransaction(toast) {
    try {
        const response = await axios.post(TRANSACTION_URL, {}, HEADERS);
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

function createQuery(queries) {
    // start_date, end_date, order_by, order, page=1, limit=10
    if (!queries["page"]) queries["page"] = 1;
    if (!queries["limit"]) queries["limit"] = 10;
    let query = "";
    for (const key in queries) {
        query += `${key}=${queries[key]}&`;
    }
    return query.replace(/&$/, "");
}

async function getTransactions(queries) {
    try {
        const query = createQuery(queries);
        const response = await axios.get(
            `${TRANSACTION_URL}?${query}`,
            HEADERS
        );
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
    }
}

async function getTotalTransactions(queries) {
    try {
        const query = createQuery(queries);
        const response = await axios.get(
            `${TRANSACTION_URL}/total?${query}`,
            HEADERS
        );
        return response.data;
    } catch (error) {
        console.error(error.response.data.message);
    }
}

export { addTransaction, getTransactions, getTotalTransactions };
