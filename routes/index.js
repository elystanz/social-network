const router = require('express').Router();

// require all api routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// respond with error if route is incorrect or broken
router.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1>');
});

module.exports = router;