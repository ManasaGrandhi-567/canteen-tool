const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu items' });
    }
});

// Get single menu item
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({ message: 'Menu item not found' });
    }
});

// Add menu item
router.post('/', async (req, res) => {
    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add menu item' });
    }
});

// Update menu item
router.put('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update menu item' });
    }
});

// Patch (toggle available)
router.patch('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update menu item' });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete menu item' });
    }
});

module.exports = router;