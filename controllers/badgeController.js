import Badge from '../models/Badge.js';
import UserBadge from '../models/UserBadges.js';

UserBadge.belongsTo(Badge, {foreignKey: 'badge_id', targetKey: 'id'})
Badge.belongsTo(UserBadge, {foreignKey: 'id', targetKey: 'badge_id'})

const BadgeController = {
    getAll: async (req, res) => {
        try {
            const badges = await Badge.findAll()
            res.json(badges)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getById: async (req, res) => {
        try {
            const badge = await Badge.findByPk(req.params.id)
            if(!badge) {
                return res.status(404).json({error: 'Badge not found'})
            }
            res.json(badge)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getByUserId: async (req, res) => {
        try {
            const badges = await Badge.findAll({
                include: {
                    model: UserBadge,
                    required: false,
                    where: {
                        user_id: req.params.id
                    }
                }
            })
            res.json(badges)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default BadgeController;