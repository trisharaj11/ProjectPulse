const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, registerTeacher, loginTeacher, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/student/signup', registerStudent);
router.post('/student/login', loginStudent);
router.post('/teacher/signup', registerTeacher);
router.post('/teacher/login', loginTeacher);
router.get('/me', protect, getMe);

module.exports = router;
