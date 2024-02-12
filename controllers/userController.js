import User from '../models/User.js'
import UserCourse from '../models/UserCourse.js'
import UserBadge from '../models/UserBadges.js'
import CryptoJS from 'crypto-js'
import { generateToken } from '../jwt.js'
import sequelize from '../sequelize.js'

User.belongsTo(UserBadge, {foreignKey: 'id', targetKey: 'user_id'})
User.belongsTo(UserCourse, {foreignKey: 'id', targetKey: 'user_id'})

const UserController = {
    getById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)
            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }
            res.json(user)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                    password_hash: CryptoJS.SHA256(req.body.password).toString()
                }
            })
            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }
            user.password_hash = undefined

            res.json({
                user,
                token: generateToken({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    admin: user.admin
                })
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    signup: async (req, res) => {
        try {
            const user = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password_hash: CryptoJS.SHA256(req.body.password).toString(),
                admin: false
            })
            
            res.json({
                user,
                token: generateToken({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    admin: user.admin
                })
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    leaderboard: async (req, res) => {
        try{
            const leaderboard = await User.findAll({
                attributes: [
                    'id',
                    [sequelize.literal("CONCAT(first_name, ' ', last_name)"), 'user'],
                    [sequelize.fn('COUNT', sequelize.literal('DISTINCT badge_id')), 'badges'],
                    [sequelize.fn('COUNT', sequelize.literal('DISTINCT course_id')), 'courses'],
                  ],
                  include: [
                    {
                      model: UserBadge,
                      attributes: [],
                      where: {
                        user_id: sequelize.literal('`User`.`id`'), // Equivalent to ub.user_id = u.id
                      },
                      required: true, // INNER JOIN
                    },
                    {
                      model: UserCourse,
                      attributes: [],
                      where: {
                        user_id: sequelize.literal('`User`.`id`'), // Equivalent to uc.user_id = u.id
                        certificate: 1,
                      },
                      required: true, // INNER JOIN
                    },
                  ],
                  group: ['User.id'],
                  order: [
                    [sequelize.literal('courses'), 'DESC'],
                    [sequelize.literal('badges'), 'DESC'],
                  ],
                  limit: 10,
            })
            res.json(leaderboard)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default UserController