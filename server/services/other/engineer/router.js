const router = require('express').Router();
router.use(require('./route/user'))
router.use(require('./route/leave'))
router.use(require('./route/material'))
router.use(require('./route/urgent'))
router.use(require('./route/work'))
router.use(require('./route/spacial_event'))

module.exports = router;