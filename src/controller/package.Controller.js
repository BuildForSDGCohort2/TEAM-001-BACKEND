const packageActions = (Packages, Agents, Senders) => {
  const packages = async (req, res) => {
    res.json("all packages are declared here");
  };

  const addPackage = async (req, res) => {

    try {
      
      const { packageName, destination, size, description } = req.body;

      const agent = await Agent.find(req.params.agentId)
      const sender = await Senders.find(req.params.senderId)
  
      const package = new Packages({
        packageName,
        destination,
        description,
        agent: 
        size,
      });
  
      console.log(package);
  
      res.json("new package added");
    } catch (err) {
      res.status(500).json(err)
      
    }
  };
  return {
    packages,
    addPackage,
  };
};

module.exports = packageActions;
