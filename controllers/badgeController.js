import Badge from '../models/Badge.js';
import Course from '../models/Course.js';
import UserBadge from '../models/UserBadges.js';
import UserCourse from '../models/UserCourse.js';
import { Op } from 'sequelize';

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
            const badges = await UserBadge.findAll({
                where: {
                    user_id: req.params.id
                },
                include: [{
                    model: Badge,
                    required: true
                }],
                order: [['earning_date', 'DESC'], ['id', 'DESC']]
            })
            res.json(badges)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    firstCourseBadge: async (req, res) => {
        const numberOfCourses = await UserCourse.count({
            where: {
                user_id: req.body.user_id,
                progress: {
                    [Op.gt]: 0
                }
            }
        })

        const badge = await Badge.findOne({
            where: {
                badge_name: 'First Course'
            }
        })

        const userBadge = await UserBadge.findOne({
            where: {
                user_id: req.body.user_id,
                badge_id: badge.id
            }
        })

        if(numberOfCourses == 1 && userBadge == null) {
            const userBadge = await UserBadge.create({
                user_id: req.body.user_id,
                badge_id: badge.id,
                earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
            })
        }
    },

    smartCookieBadge: async (req, res) => {
        try {
            const badge = await Badge.findOne({
                where: {
                    badge_name: 'Smart Cookie'
                }
            })

            const userBadge = await UserBadge.findOne({
                where: {
                    user_id: req.body.user_id,
                    badge_id: badge.id
                }
            })

            if(userBadge == null) {
                await UserBadge.create({
                    user_id: req.body.user_id,
                    badge_id: badge.id,
                    earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                })
            }

            res.json({message: 'You have earned the "Smart Cookie" badge!'});
        } catch(error) {
            throw error;
        }
    },

    finishLine: async (req, res) => {
        try {
            const numberOfCourses = await Course.count({
                where: {
                    deleted: 0
                }
            });

            const numberOfFinishedCourses = await UserCourse.count({
                where: {
                    progress: 1,
                    user_id: req.body.user_id
                }
            });

            if (numberOfCourses == numberOfFinishedCourses) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Finish Line'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch (error) {
            throw error;
        }
    },

    freshmenBadge: async (req, res) => {
        try {
            const numberOfFinishedCourses = await UserCourse.count({
                where: {
                    progress: 1,
                    user_id: req.body.user_id,
                }
            });

            if(numberOfFinishedCourses == 1) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Freshmen'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch (error) {
            throw error;
        }
    },

    seniorBadge: async (req, res) => {
        try {
            const numberOfCourses = await Course.count({
                where: {
                    deleted: 0
                }
            });

            const numberOfFinishedCourses = await UserCourse.count({
                where: {
                    progress: 1,
                    user_id: req.body.user_id
                }
            });

            if (numberOfCourses == numberOfFinishedCourses+1) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Senior'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }

        } catch (error) {
            throw error;
        }
    },

    frontendDeveloperBadge: async (req, res) => {
        try {
            const htmlCourse = await Course.findOne({
                where: {
                    course_title: 'HTML'
                }
            })

            const cssCourse = await Course.findOne({
                where: {
                    course_title: 'CSS'
                }
            })

            const jsCourse = await Course.findOne({
                where: {
                    course_title: 'JavaScript'
                }
            })

            if(htmlCourse == null || cssCourse == null || jsCourse == null) {
                return;
            }

            const htmlUserCourse = await UserCourse.findOne({
                where: {
                    course_id: htmlCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            });

            const cssUserCourse = await UserCourse.findOne({
                where: {
                    course_id: cssCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            })

            const jsUserCourse = await UserCourse.findOne({
                where: {
                    course_id: jsCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            })

            if(htmlUserCourse && cssUserCourse && jsUserCourse) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Frontend Dev'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch(error) {
            throw error;
        }
    },

    backendDeveloperBadge: async (req, res) => {
        try {
            const nodejsCourse = await Course.findOne({
                where: {
                    course_title: 'Node.js'
                }
            })

            const expressCourse = await Course.findOne({
                where: {
                    course_title: 'Express.js'
                }
            })

            const mongodbCourse = await Course.findOne({
                where: {
                    course_title: 'MongoDB'
                }
            })

            if(nodejsCourse == null || expressCourse == null || mongodbCourse == null) {
                return;
            }

            const nodejsUserCourse = await UserCourse.findOne({
                where: {
                    course_id: nodejsCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            });

            const expressUserCourse = await UserCourse.findOne({
                where: {
                    course_id: expressCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            })

            const mongodbUserCourse = await UserCourse.findOne({
                where: {
                    course_id: mongodbCourse.id,
                    user_id: req.body.user_id,
                    progress: 1
                }
            })

            if(nodejsUserCourse && expressUserCourse && mongodbUserCourse) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Backend Dev'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch(error) {
            throw error;
        }
    },

    fullStackDeveloperBadge: async (req, res) => {
        try {
            const frontendDeveloperBadge = await Badge.findOne({
                where: {
                    badge_name: 'Frontend Dev'
                }
            })

            const backendDeveloperBadge = await Badge.findOne({
                where: {
                    badge_name: 'Backend Dev'
                }
            })

            const frontendDeveloperUserBadge = await UserBadge.findOne({
                where: {
                    user_id: req.body.user_id,
                    badge_id: frontendDeveloperBadge.id
                }
            })

            const backendDeveloperUserBadge = await UserBadge.findOne({
                where: {
                    user_id: req.body.user_id,
                    badge_id: backendDeveloperBadge.id
                }
            })

            if(frontendDeveloperUserBadge && backendDeveloperUserBadge) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Full Stack Developer'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch(error) {
            throw error;
        }
    },

    overachieverBadge: async (req, res) => {
        try {
            const numberOfEarnedBadges = await UserBadge.count({
                where: {
                    user_id: req.body.user_id
                }
            });

            const numberOfBadges = await Badge.count();

            if(numberOfEarnedBadges == numberOfBadges) {
                const badge = await Badge.findOne({
                    where: {
                        badge_name: 'Overachiever'
                    }
                })

                const userBadge = await UserBadge.findOne({
                    where: {
                        user_id: req.body.user_id,
                        badge_id: badge.id
                    }
                })

                if(userBadge == null) {
                    await UserBadge.create({
                        user_id: req.body.user_id,
                        badge_id: badge.id,
                        earning_date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    })
                }
            }
        } catch(error) {
            throw error;
        }
    },


    assignBadge: async (req, res) => {
        try {
            BadgeController.firstCourseBadge(req, res)
            BadgeController.finishLine(req, res)
            BadgeController.freshmenBadge(req, res)
            BadgeController.seniorBadge(req, res)
            BadgeController.frontendDeveloperBadge(req, res)
            BadgeController.backendDeveloperBadge(req, res)
            BadgeController.fullStackDeveloperBadge(req, res)
            BadgeController.overachieverBadge(req, res)

            res.json({message: 'Badge assigned successfully!'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default BadgeController;