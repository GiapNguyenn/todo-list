const express = require('express');
const router= express.Router();
const controller = require("../../controllers/admin/task.controller")
router.get('/',controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.get('/create', controller.create);
router.post('/create', controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.update);
router.delete('/delete/:id', controller.delete);
router.get('/detail/:id', controller.detail);
module.exports = router