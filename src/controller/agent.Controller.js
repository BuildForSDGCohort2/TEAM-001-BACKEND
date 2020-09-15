const agentActins = (Agents, bcrypt, secret, jwt, validationResult) => {
  /**
   * @param       GET /api/v1/agent
   * @desc        displays all the registered agents on the platform
   * @access      public( Every one can access)
   */
  const agents = async (req, res) => {
    const agents = await Agents.find({});
    res.status(200).json({
      totalAgents: agents.length,
      senders: agents.map((agent) => {
        return {
          agent,
          request: {
            "view Agent": {
              type: "GET",
              url: `http://localhost:3000/api/v1/agent/profile/${sender._id}`,
              description:
                "Click on the url to view all the detail about this agent",
            },
            "Register New Agent": {
              type: "POST",
              url: "http://localhost:3000/api/v1/agent/register",
              description:
                "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
            },
            Login: {
              type: "POST",
              url: "http://localhost:3000/api/v1/agent/login",
              description:
                "Registered agents can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
            "Delete Agent": {
              type: "DELETE",
              url: `http://localhost:3000/api/v1/agent/delete/${sender._id}`,
              description:
                "Registered agents can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
          },
        };
      }),
    });
  };

  /**
   * @param       POST /api/v1/agent/register
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

      const agent = new Agents({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      sender.password = hash;

      await agent.save();

      res.status(201).json({
        msg: `${agent.name.first} ${agent.name.last} is successfully registered`,
        request: {
          Login: {
            type: "POST",
            url: "http://localhost:3000/api/v1/agent/login",
            description:
              "Registered agents can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
          },
        },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

   /**
   * @param       POST /api/v1/agent/login
   * @desc        route for agents to signin on the platform
   * @access      public( Every one can access)
   */
  const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await Agents.findOne({ email });

      if (!user)
        return res.status(401).json({
          msg: `Invalid Credentials`,
          request: {
            Register: {
              type: "POST",
              url: "http://localhost:3000/api/v1/agent/register",
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
              url: "http://localhost:3000/api/v1/agent/register",
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

  return {
      login,
    register,
    agents,
  };
};

module.exports = agentActins;
