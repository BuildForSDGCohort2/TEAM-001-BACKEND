const agentActions = (Agents, bcrypt, secret, jwt, validationResult) => {
  /**
   * @param       GET /api/v1/agent
   * @desc        displays all the registered agents on the platform
   * @access      public( Every one can access)
   */
  const agents = async (req, res) => {
    const agents = await Agents.find({});
    res.status(200).json({
      totalAgents: agents.length,
      agents: agents.map((agent) => {
        return {
          agent,
          request: {
            "view Agent": {
              type: "GET",
              url: `http://localhost:3000/api/v1/agent/profile/${agent._id}`,
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
              url: `http://localhost:3000/api/v1/agent/delete/${agent._id}`,
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
   * @desc        route to register a agent
   * @access      public( Every one can access)
   */
  const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const user = await Agents.findOne({ email });

      if (user) return res.status(400).json(`${email} is already in use`);

      const agent = new Agents({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      agent.password = hash;

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

      res.json({
        msg: "you are a signed in",
        token,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       GET /api/v1/agent/profile/:id
   * @desc        displays agents dashboard
   * @access      public( only signed in agents can access)
   */
  const profile = async (req, res) => {
    try {
      const agent = await Agents.findOne({ _id: req.params.id });
      res.json(agent);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       POST /api/v1/sender/upload/
   * @desc        sender can upload picture
   * @access      protected( only logged in senders can access)
   */
  const upload = async (req, res) => {
    try {
      //checks if file is attached
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "You forgot to attach a picture" });
      }

      const { agent_id } = req.body;
      const picture = req.files.picture;

      //Checks if the attached file is a picture
      if (!picture.mimetype.includes("image"))
        return res
          .status(415)
          .json({ msg: "Sorry....!!! You can only upload pictures" });

      //uploads picture
      const agent = await Agents.findById(agent_id);
      agent.picture = picture.name;
      agent.save();
      picture.mv(
        `${path.join(__dirname, "./../../uploads/agents/pictures/")}` +
          picture.name,
        function (err) {
          if (err) throw err;
          res.json({
            success: true,
            msg: "Picture uploaded!",
            agent,
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /**
   * @param       PATCH /api/v1/agent/edit/:id
   * @desc        agent can logout of the platform
   * @access      protected( only logged in agent can access)
   */
  const update = async (req, res) => {
    const agent = await Agents.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      msg: "agent had been edited, your profile is now updated.",
      agent,
    });
  };

  /**
   * @param       DELETE /api/v1/agent/delete/:id
   * @desc        Gives agents the ability to delete their account from the platform
   * @access      protected( only signed in agents and kwauri admin can access this route)
   */
  const del = async (req, res) => {
    const agent = await Agentes.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: `${agent.name.first} ${agent.name.last} with the id ${agent._id} is successfully deleted from the database`,
      request: {
        Register: {
          type: "POST",
          url: "http://localhost:3000/api/v1/agent/register",
          description:
            "Follow the provided url to make a registration. If you are using postman to, the request will be a post request",
        },
        Login: {
          type: "POST",
          url: "http://localhost:3000/api/v1/agent/login",
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
    login,
    profile,
    register,
    agents,
    update,
    del,
    logout,
    upload,
  };
};

module.exports = agentActions;
