module.exports = function isLoggedIn(req, res, next) {
    if (!req.session.user) {

        if (req.originalUrl.startsWith("/api")) {
            return res.status(401).json({ message: "Login required" });
        }

        return res.json({ message: "Login required" });
    }

    next();
};