const log = console.log

const express = require('express');
const router = express.Router(); 
const path = require('path');

router.get("*", (req, res) => {
    const goodPageRoutes = ["/", "/login", "/register" ,"/dashboard/practice", "/dashboard/game", "/admin", "/admin/gamerank", "/admin/updatemaze","/admin/editmaze","/admin/editmaze/:id" ];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router