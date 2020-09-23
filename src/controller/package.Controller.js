const packageActions = () => {
    const packages = async (req, res) => {
        res.json('all packages are declared here')
    }

    return {
        packages
    }
}

module.exports = packageActions