const validation = (check) => {
  //validates form registration iputs
  const regForm = [
    check("name").not().isEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 5 }),
  ];

  //validates form login iputs
  const loginForm = [
    check("email").isEmail().normalizeEmail(),
    check("password").notEmpty(),
  ];
  //validates form inputs for adding a new package
  const newPackage = [
    check("email").isEmail().normalizeEmail(),
    check("password").notEmpty(),
  ];

  //validates form inputs for fetching a single package
  const findPackage = [
    check("email").isEmail().normalizeEmail(),
    check("password").notEmpty(),
  ];

  return {
    regForm,
    loginForm,
    newPackage,
    findPackage,
  };
};

module.exports = validation;
