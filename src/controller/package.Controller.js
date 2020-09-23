const packageActions = () => {
    const packages = async (req, res) => {

        res.json('all packages are declared here')
    }

    const addPackage = async (req, res) => {
        res.json('new package added')
    }
    return {
        packages,
        addPackage
    }
}

module.exports = packageActions