const senderActions = (Senders, bcrypt, secret, jwt, validationResult) => {
  /**
   * @param       GET /api/v1/sender
   * @desc        displays all the registered senders on the platform
   * @access      public( Every one can access)
   */
  const senders = async (req, res) => {
    const senders = await Senders.find({});
    res.status(200).json({
      totalSenders: senders.length,
      senders: senders.map((sender) => {
        return {
          sender,
          request: {
            "view Sender": {
              type: "GET",
              url: `http://localhost:3000/api/v1/sender/profile/${sender._id}`,
              description:
                "Click on the url to view all the detail about this sender",
            },
            "Register New Sender": {
              type: "POST",
              url: "http://localhost:3000/api/v1/sender/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
            Login: {
              type: "POST",
              url: "http://localhost:3000/api/v1/sender/login",
              description:
                "Registered senders can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
            "Delete Sender": {
              type: "DELETE",
              url: `http://localhost:3000/api/v1/sender/delete/${sender._id}`,
              description:
                "Registered senders can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
          },
        };
      }),
    });
  };

  /**
   * @param       POST /api/v1/sender/register
   * @desc        route to register a sender
   * @access      public( Every one can access)
   */
  const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const user = await Senders.findOne({ email });

      if (user) return res.status(400).json(`${email} is already in use`);

      const sender = new Senders({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      sender.password = hash;

      await sender.save();

      res.status(201).json({
        msg: `${sender.name.first} ${sender.name.last} is successfully registered`,
        request: {
          Login: {
            type: "POST",
            url: "http://localhost:3000/api/v1/sender/login",
            description:
              "Registered senders can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
          },
        },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       POST /api/v1/sender/login
   * @desc        route for senders to signin on the platform
   * @access      public( Every one can access)
   */
  const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await Senders.findOne({ email });

      if (!user)
        return res.status(401).json({
          msg: `Invalid Credentials`,
          request: {
            Register: {
              type: "POST",
              url: "http://localhost:3000/api/v1/sender/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
          },
        });

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);

      if (!isMatch)
        return res.status(401).json({
          msg: `Invalid Credentials`,
          request: {
            Register: {
              type: "POST",
              url: "http://localhost:3000/api/v1/sender/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
          },
        });

      const payload = {
        user: user._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1hr" });
      const heads = await res.setHeader("x-auth-header", token);

      res.json({
        msg: "you are a signed in",
        token,
        heads,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       GET /api/v1/sender/profile/:id
   * @desc        displays senders dashboard
   * @access      public( only signed in senders can access)
   */
  const profile = async (req, res) => {
    try {
      const sender = await Senders.findOne({ _id: req.params.id });
      res.json(sender);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       PATCH /api/v1/sender/edit/:id
   * @desc        sender can logout of the platform
   * @access      protected( only logged in sender can access)
   */
  const update = async (req, res) => {
    const sender = await Senders.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      msg: "sender had been edited, your profile is now updated.",
      sender,
    });
  };

  /**
   * @param       DELETE /api/v1/sender/delete/:id
   * @desc        Gives senders the ability to delete their account from the platform
   * @access      protected( only signed in senders and kwauri admin can access this route)
   */
  const del = async (req, res) => {
    const sender = await Senders.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: `${sender.name.first} ${sender.name.last} with the id ${sender._id} is successfully deleted from the database`,
      request: {
        Register: {
          type: "POST",
          url: "http://localhost:3000/api/v1/sender/register",
          description:
            "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
        },
        Login: {
          type: "POST",
          url: "http://localhost:3000/api/v1/sender/login",
          description:
            "Registered senders can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
        },
      },
    });
  };

  /**
   * @param       POST /api/v1/agent/logout
   * @desc        agent can logout of the platform
   * @access      protected( only logged in agent can access)
   */
  const logout = async (req, res) => {
    res.json("agent can logout");
  };

  return {
    del,
    senders,
    register,
    login,
    logout,
    profile,
    update,
  };
};

module.exports = senderActions;
