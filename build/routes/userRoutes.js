"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post('/', userControllers_1.createUser);
router.post('/login', userControllers_1.loginUser);
router.get('/:id', userControllers_1.getUser);
exports.default = router;
