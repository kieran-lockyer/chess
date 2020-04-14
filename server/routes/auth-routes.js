const router = require('express').Router();

// auth logout
router.get('logout', (req, res) => {
    res.send('logging out')
})

// auth with google
router/get('/google', (req, res) => {
    res.send('logging in with google');
});

module.exports = router;