import express from 'express';
import BadgeController from '../controllers/badgeController.js'

const router = express.Router();

router.get('/', BadgeController.getAll);
router.get('/:id', BadgeController.getById);
router.get('/userBadges/:id', BadgeController.getByUserId);
router.post('/smartCookieBadge',  BadgeController.smartCookieBadge);
router.post('/assignBadge', BadgeController.assignBadge);

export default router;