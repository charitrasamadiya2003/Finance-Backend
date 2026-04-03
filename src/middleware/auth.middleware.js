const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers.role;

        if(!userRole){
            return res.status(401).json({message : "Role is required"});
        }
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({message : "Access denied"});
        }
        next();
    };
};
module.exports = authorize;