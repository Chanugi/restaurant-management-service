// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const {
    registerRestaurant,
    loginRestaurant,
    setRestaurantAvailability,
    viewOrders,
    updateOrderStatus,
    uploadRestaurantImage
} = require("../controllers/restaurantController");

router.post("/register", uploadRestaurantImage, registerRestaurant);
router.post("/login", loginRestaurant);
router.patch("/:id/status", setRestaurantAvailability);
router.get("/:restaurantId/orders", viewOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

module.exports = router;