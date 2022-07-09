const router = require('express').Router();
router.use(require('./route/user'))
router.use(require('./route/calendar'))

module.exports = router;