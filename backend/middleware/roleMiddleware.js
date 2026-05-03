const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as student');
  }
};

const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as teacher');
  }
};

module.exports = { studentOnly, teacherOnly };
