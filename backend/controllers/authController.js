const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/student/signup
const registerStudent = asyncHandler(async (req, res) => {
  const { name, regNumber, section, branch, year, email, password } = req.body;
  if (!name || !regNumber || !email || !password) {
    res.status(400); throw new Error('Please add all fields');
  }
  const studentExists = await Student.findOne({ email });
  if (studentExists) { res.status(400); throw new Error('Student already exists'); }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    name, regNumber, section, branch, year, email, password: hashedPassword, role: 'student'
  });
  if (student) {
    res.status(201).json({
      _id: student.id, name: student.name, email: student.email, role: student.role,
      token: generateToken(student._id, student.role)
    });
  } else {
    res.status(400); throw new Error('Invalid student data');
  }
});

// @desc    Authenticate a student
// @route   POST /api/auth/student/login
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student && (await bcrypt.compare(password, student.password))) {
    res.json({
      _id: student.id, name: student.name, email: student.email, role: student.role,
      token: generateToken(student._id, student.role)
    });
  } else {
    res.status(400); throw new Error('Invalid credentials');
  }
});

// @desc    Register a new teacher
// @route   POST /api/auth/teacher/signup
const registerTeacher = asyncHandler(async (req, res) => {
  const { name, teacherId, department, email, password } = req.body;
  if (!name || !teacherId || !email || !password) {
    res.status(400); throw new Error('Please add all fields');
  }
  const teacherExists = await Teacher.findOne({ email });
  if (teacherExists) { res.status(400); throw new Error('Teacher already exists'); }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const teacher = await Teacher.create({
    name, teacherId, department, email, password: hashedPassword, role: 'teacher'
  });
  if (teacher) {
    res.status(201).json({
      _id: teacher.id, name: teacher.name, email: teacher.email, role: teacher.role,
      token: generateToken(teacher._id, teacher.role)
    });
  } else {
    res.status(400); throw new Error('Invalid teacher data');
  }
});

// @desc    Authenticate a teacher
// @route   POST /api/auth/teacher/login
const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    res.json({
      _id: teacher.id, name: teacher.name, email: teacher.email, role: teacher.role,
      token: generateToken(teacher._id, teacher.role)
    });
  } else {
    res.status(400); throw new Error('Invalid credentials');
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerStudent, loginStudent, registerTeacher, loginTeacher, getMe };
