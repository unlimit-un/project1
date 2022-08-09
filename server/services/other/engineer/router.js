const router = require('express').Router();
router.use(require('./route/user'))
router.use(require('./route/leave'))
router.use(require('./route/material'))
router.use(require('./route/urgent'))

module.exports = router;