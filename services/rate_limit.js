import rateLimit from 'express-rate-limit';

/**
 * Configures and applies rate limiting middleware for different routes.
 * @param {object} app - The Express app instance.
 */
function runningRateLimit(app) {
  // General rate limiter for most routes
  const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per 10 minutes
    message: 'You have exceeded the 100 requests in 10 minutes limit!',
    standardHeaders: true, // Enables `RateLimit-*` headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers
  });

  // Rate limiter for a specific route (/auth/signup)
  const signupLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests for signup per 10 minutes
    message: 'You have exceeded creating 5 accounts in 10 minutes limit!',
    standardHeaders: true, // Enables `RateLimit-*` headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers
  });

  // Apply the rate limiting middleware to different routes
  // Here, process.env.CHANNEL refers to the channel endpoint

  // Apply general rate limiter to the main channel
  app.use(process.env.CHANNEL, generalLimiter); // max 100 requests per 10 minutes

  // Apply signup rate limiter specifically to the signup endpoint under the channel
  app.use(process.env.CHANNEL + '/auth/signup', signupLimiter); // max 5 requests per 10 minutes for signup
}

export default runningRateLimit;
