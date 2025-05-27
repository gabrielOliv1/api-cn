const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const validateStudent = require('../middleware/validateStudent');

router.post('/', validateStudent, async (req, res) => {
  try {
    const result = await Student.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'Username already exists' || error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    console.error('Error registering student:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 