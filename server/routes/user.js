const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// @route  GET /api/users/:id
// @desc   Get user profile
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('createdProjects') // Populate created projects
            .populate('backedProjects'); // Populate backed projects

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT /api/users/:id
// @desc   Update user profile
// @access Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, profileImage } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (profileImage) updateFields.profileImage = profileImage;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Ensure the user is updating their own profile
        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update the user profile
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
