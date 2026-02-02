const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const authorizeRoles = (...allowedRoles) => {
    const roles = allowedRoles.flat();
    return (req, res, next) => {
        const userRole = typeof req.user?.role === 'object' ? req.user.role.name : req.user?.role;

        console.log(`[auth] User Role: ${userRole}, Allowed Roles: ${roles.join(', ')}`);

        if (!req.user || !roles.includes(userRole)) {
            console.log(`[auth] Access DENIED for role: ${userRole}`);
            return res.status(403).json({
                message: 'Forbidden: You do not have permission to access this resource',
                debug: {
                    userRole: userRole,
                    allowed: roles
                }
            });
        }

        console.log(`[auth] Access GRANTED for role: ${userRole}`);
        next();
    };
};




module.exports = { verifyToken, authorizeRoles };
