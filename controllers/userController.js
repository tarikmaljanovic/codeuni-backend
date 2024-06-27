import User from '../models/User.js'
import UserCourse from '../models/UserCourse.js'
import UserBadge from '../models/UserBadges.js'
import CryptoJS from 'crypto-js'
import { generateToken } from '../jwt.js'
import sequelize from '../sequelize.js'
import puppeteer from 'puppeteer'
import bodyParser from 'body-parser'
import { verifyToken } from '../jwt.js'

User.belongsTo(UserBadge, {foreignKey: 'id', targetKey: 'user_id'})
User.belongsTo(UserCourse, {foreignKey: 'id', targetKey: 'user_id'})

const UserController = {
    getAllStudents: async (req, res) => {
        try { 
            const users = await User.findAll({
                where: {
                    admin: false
                }
            })
            res.json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

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
            if(user.disabled) {
                return res.status(403).json({error: 'User is disabled'})
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
    },

    editUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id)
            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.email = req.body.email
            user.password_hash = CryptoJS.SHA256(req.body.password).toString()
            await user.save()
            res.json(user)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    sendEmail: async (req, res) => {
        nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        }).sendMail({
            from: 'codeuni23@gmail.com',
            to: 'tarikmaljanovic123@gmail.com',
            subject: 'CodeUni Certificate',
            html: '<p>Congratulations! You have earned a certificate from CodeUni.</p>'
        }).then(() => {
            res.json({message: 'Email sent'})
        }).catch((error) => {
            res.status(500).json({error: error.message})
        })
    },

    downloadCertificate: async (req, res) => {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setContent(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <style type='text/css'>
                                body, html {
                                    margin: 0;
                                    padding: 0;
                                }
                                body {
                                    color: black;
                                    display: table;
                                    font-family: Georgia, serif;
                                    font-size: 24px;
                                    text-align: center;
                                    width: 100%;
                                    height: 100vh;
                                    overflow: hidden;
                                }
                                .container {
                                    border: 20px solid #5186db;
                                    width: calc(297mm - 40px);
                                    height: calc(210mm - 40px);
                                    display: table-cell;
                                    vertical-align: middle;
                                }
                                .logo {
                                    color: #5186db;
                                }
                                .marquee {
                                    color: #5186db;
                                    font-size: 48px;
                                    margin: 20px;
                                }
                                .assignment {
                                    margin: 20px;
                                }
                                .person {
                                    border-bottom: 2px solid black;
                                    font-size: 32px;
                                    font-style: italic;
                                    margin: 20px auto;
                                    width: 400px;
                                }
                                .reason {
                                    margin: 20px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="logo">
                                    CodeUni
                                </div>

                                <div class="marquee">
                                    Certificate of Completion
                                </div>

                                <div class="assignment">
                                    This certificate is presented to
                                </div>

                                <div class="person">
                                    ${req.body.first_name} ${req.body.last_name}
                                </div>

                                <div class="reason">
                                    For deftly completing the ${req.body.course_title} course<br/>
                                </div>
                            </div>
                        </body>
                    </html>
                `)
                const pdfBuffer = await page.pdf({
                    format: 'A4',
                    printBackground: true,
                    landscape: true
                })

                await browser.close()

                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=generated.pdf',
                    'Content-Length': pdfBuffer.length,
                });
        
                res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    disableAccount: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }

            const user = await User.findByPk(req.body.user_id)

            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }

            user.disabled = true

            await user.save()

            res.json(user)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    enableAccount: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }

            const user = await User.findByPk(req.body.user_id)

            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }

            user.disabled = false

            await user.save()

            res.json(user)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default UserController