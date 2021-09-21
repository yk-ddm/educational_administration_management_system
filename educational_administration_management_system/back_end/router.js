const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.post('/api/login', service.login)

router.post('/api/updatePwd', service.updatePwd)

router.get('/api/queryProfile', service.queryProfile)

module.exports = router