/*
// controllers/restaurantController.js
const Restaurant = require("../models/restaurantModel");
const axios = require("axios");
const multer = require("multer");
const { restaurantStorage } = require("../utils/cloudinaryConfig");
const upload = multer({ storage: restaurantStorage });

const registerRestaurant = async (req, res) => {
    try {
        const { name, email, phone, password, address, cuisineType } = req.body;
        const role = 'restaurant';

        const existingRestaurant = await Restaurant.findOne({ email });
        if (existingRestaurant) {
            return res.status(400).json({ message: "Restaurant already exists" });
        }

        const image = req.file?.path || "";

        const newRestaurant = new Restaurant({
            name, email, phone, password, address, cuisineType, role, image
        });
        await newRestaurant.save();

        const authResponse = await axios.post("http://auth-service:5000/api/auth/register", { email, password, role });

        if (authResponse.status === 201) {
            res.status(201).json({ message: "Restaurant registered successfully, awaiting admin approval" });
        } else {
            res.status(500).json({ message: "Restaurant registered, but authentication failed" });
        }
    } catch (error) {
        console.error("Error during restaurant registration:", error); // Log the full error
        if (error.response) {
            // Axios error
            console.error("Axios Error:", error.response.data); // Log the detailed Axios error response
            res.status(error.response.status).json({
                message: "Error during restaurant registration",
                error: error.response.data || error.response.statusText
            });
        } else if (error.request) {
            // If there was no response from the server
            console.error("Request Error:", error.request); 
            res.status(500).json({
                message: "Error during restaurant registration",
                error: "No response received from the server"
            });
        } else {
            // General error
            console.error("General Error:", error.message);
            res.status(500).json({
                message: "Error during restaurant registration",
                error: error.message || "Unknown error"
            });
        }
    }
};


const loginRestaurant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authResponse = await axios.post("http://auth-service:5000/api/auth/login", { email, password });
        res.json({ message: "Login successful", token: authResponse.data.token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const setRestaurantAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['open', 'closed'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(id, { status }, { new: true });
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json({ message: `Restaurant marked as ${status}`, restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error: error.message });
    }
};

const viewOrders = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const response = await axios.get(`http://order-service:5002/api/orders/restaurant/${restaurantId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const response = await axios.patch(`http://order-service:5002/api/orders/${orderId}/status`, { status });
        res.json({ message: "Order status updated", data: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

module.exports = {
    registerRestaurant,
    loginRestaurant,
    setRestaurantAvailability,
    viewOrders,
    updateOrderStatus,
    uploadRestaurantImage: upload.single("image")
};
*/

// controllers/restaurantController.js
const Restaurant = require("../models/restaurantModel");
const axios = require("axios");
const multer = require("multer");
const { restaurantStorage } = require("../utils/cloudinaryConfig");
const upload = multer({ storage: restaurantStorage });

const registerRestaurant = async (req, res) => {
    try {
        const { name, email, phone, password, address, cuisineType } = req.body;
        const role = 'restaurant';

        const existingRestaurant = await Restaurant.findOne({ email });
        if (existingRestaurant) {
            return res.status(400).json({ message: "Restaurant already exists" });
        }

        const image = req.file?.path || "";

        const newRestaurant = new Restaurant({
            name, email, phone, password, address, cuisineType, role, image
        });
        await newRestaurant.save();

        const authResponse = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/register`, { email, password, role });


        if (authResponse.status === 201) {
            res.status(201).json({ message: "Restaurant registered successfully, awaiting admin approval" });
        } else {
            res.status(500).json({ message: "Restaurant registered, but authentication failed" });
        }
    } catch (error) {
        console.error("Error during restaurant registration:", error); // Log the full error
        if (error.response) {
            // Axios error
            console.error("Axios Error:", error.response.data); // Log the detailed Axios error response
            res.status(error.response.status).json({
                message: "Error during restaurant registration",
                error: error.response.data || error.response.statusText
            });
        } else if (error.request) {
            // If there was no response from the server
            console.error("Request Error:", error.request); 
            res.status(500).json({
                message: "Error during restaurant registration",
                error: "No response received from the server"
            });
        } else {
            // General error
            console.error("General Error:", error.message);
            res.status(500).json({
                message: "Error during restaurant registration",
                error: error.message || "Unknown error"
            });
        }
    }
};


const loginRestaurant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authResponse = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/login`, { email, password });
        res.json({ message: "Login successful", token: authResponse.data.token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const setRestaurantAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['open', 'closed'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(id, { status }, { new: true });
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json({ message: `Restaurant marked as ${status}`, restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error: error.message });
    }
};

const viewOrders = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const response = await axios.get(`http://order-service:5002/api/orders/restaurant/${restaurantId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const response = await axios.patch(`http://order-service:5002/api/orders/${orderId}/status`, { status });
        res.json({ message: "Order status updated", data: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

module.exports = {
    registerRestaurant,
    loginRestaurant,
    setRestaurantAvailability,
    viewOrders,
    updateOrderStatus,
    uploadRestaurantImage: upload.single("image")
};


