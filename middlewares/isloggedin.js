module.exports = function isLoggedIn(req,res,next){
    if(!req.session.user){
        // For API requests, return 401
        if(req.headers.accept && req.headers.accept.includes("application/json")){
            return res.status(401).json({ message: "Login required" });
            
        }
        // Normal browser request
        return res.redirect("/login");
    }
    next();
}
