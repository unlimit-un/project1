const router = require('express').Router();
router.use(require('./route/user'))
router.use(require('./route/calendar'))
router.use(require('./route/repair'))
router.use(require('./route/leave'))
router.use(require('./route/order_material'))
router.use(require('./route/engineer'))
router.use(require('./route/engineer_dept'))
router.use(require('./route/maid'))
router.use(require('./route/location'))
router.use(require('./route/outside_engineer'))
router.use(require('./route/days_of_week'))
router.use(require('./route/maid_duty'))

module.exports = router;