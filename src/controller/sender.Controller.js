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
                "Registered citizens can follow the provided url to login to their profile page. If you are using postman to, the request will be a post request",
            },
          },
        };
      }),
    });
  };
  
};

module.exports = senderActions;
