const mongoose = require('mongoose');

const rewardTierSchema = new mongoose.Schema({
  tier: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  requiredContributions: {
    type: Number,
    required: true,
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  createdProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  backedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  rewardTiers: [rewardTierSchema], // Added reward tiers
  totalContributions: {
    type: Number,
    default: 0, // Track the total contributions
  }
});

module.exports = mongoose.model('User', userSchema);
