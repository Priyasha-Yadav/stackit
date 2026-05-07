const Notification = require('../models/notification.model');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler')

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ user_id: req.user.id });
    return res.status(200).json({
        message: 'Notifications fetched successfully',
        notifications
    });
});
const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid notification id');
        err.status = 400;
        throw err;
    }

    const notification = await Notification.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        { is_read: true },
        { new: true }
    );

    if (!notification) {
        const err = new Error('Notification not found');
        err.status = 404;
        throw err;
    }

    return res.status(200).json({
        message: 'Notification marked as read',
        notification
    });

});

const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
    const result = await Notification.updateMany({
        user_id: req.user.id, is_read: false
    }, { is_read: true });
    return res.status(200).json({
        message: 'All notifications marked as read',
        updatedCount: result.modifiedCount
    });
});


const notificationController = { getAllNotifications, markNotificationAsRead, markAllNotificationsAsRead };
module.exports = notificationController;