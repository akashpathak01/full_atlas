const authService = require('./auth.service');
const { logAction } = require('../../utils/auditLogger');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await authService.validateCredentials(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = authService.generateToken(user);

        // Log Login Action
        await logAction({
            actionType: 'LOGIN',
            entityType: 'USER',
            entityId: user.id,
            user: { userId: user.id, role: user.role.name },
            metadata: { email: user.email }
        });

        res.json({ token, user: { id: user.id, name: user.name, role: user.role.name } });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login
};
