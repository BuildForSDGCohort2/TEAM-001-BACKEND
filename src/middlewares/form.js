const validation = (check) => {
  const regForm = [
    check("name").not().isEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 5 }),
  ];

  const loginForm = [
    check("email").isEmail().normalizeEmail(),
    check("password").notEmpty(),
  ];
  return {
    regForm,
    loginForm,
  };
};

module.exports = validation;
