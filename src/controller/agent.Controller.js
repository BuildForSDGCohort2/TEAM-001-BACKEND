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

  return {
      agents
  }
}

module.exports = agentActins