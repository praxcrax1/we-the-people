const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const User = require('../models/user');
const router = express.Router();

// @route  POST /api/projects
// @desc   Create a new project
// @access Private
router.post('/create', auth, async (req, res) => {
    const { title, description, goal } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            goal,
            creator: req.user.id
        });

        const project = await newProject.save();

        // Add this project to the user's createdProjects list
        const user = await User.findById(req.user.id);
        user.createdProjects.push(project.id);
        await user.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/list', async (req, res) => {
    try {
        const projects = await Project.find().populate('creator', ['name']);
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('creator', ['name']);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/updates', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // Ensure the user is the creator of the project
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        project.updates.unshift({ content: req.body.content });
        await project.save();

        res.json(project.updates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const updateUserContributions = async (userId) => {
    try {
      // Update the user's total contributions
      const user = await User.findById(userId);
      user.totalContributions += 1;
  
      // Define reward tiers (can also be stored in a config or database)
      const tiers = [
        { tier: 'Bronze', requiredContributions: 10 },
        { tier: 'Silver', requiredContributions: 20 },
        { tier: 'Gold', requiredContributions: 30 }
      ];
  
      // Update reward tiers based on total contributions
      user.rewardTiers = tiers.filter(tier => user.totalContributions >= tier.requiredContributions);
  
      await user.save();
    } catch (err) {
      console.error(err.message);
      throw new Error('Error updating user contributions');
    }
};


router.post('/:id/contribute', auth, async (req, res) => {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
        return res.status(400).json({ msg: 'Contribution amount must be greater than zero' });
    }

    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Check if user has already contributed
        const existingContribution = project.backers.find(backer => backer.user.toString() === req.user.id);
        
        if (existingContribution) {
            // Update existing contribution
            existingContribution.amount += amount;
        } else {
            // Add new contribution
            project.backers.push({ user: req.user.id, amount });
            if (!user.backedProjects.includes(project.id)) {
                user.backedProjects.push(project.id);
            }
        }

        // Update project’s amount raised
        project.amountRaised += amount;
        await updateUserContributions(req.user.id, amount);

        await project.save();
        await user.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
