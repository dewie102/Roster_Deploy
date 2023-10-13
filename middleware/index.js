/*
This file could be used to store and export custom middleware
*/
function validateFields(req, res, next) {
    const { name, location } = req.body;

    if (!name || !location) {
        return res
            .status(400)
            .json({ error: "name and location are required" });
    }

    next();
}

module.exports = {
    validateFields,
};
