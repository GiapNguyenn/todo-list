const express = require('express');
const router= express.Router();
const controller = require("../../controllers/admin/task.controller")
router.get('/',controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.get('/edit/:id', controller.create);
module.exports = router