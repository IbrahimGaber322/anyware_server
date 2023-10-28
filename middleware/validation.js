const dataMethods = ["body", "params", "query"];

/**
 * Middleware function for request validation based on the provided schema.
 * @param {object} schema - Validation schema for request parameters (body, params, query)
 * @returns {function} Middleware function for validating requests
 */
const validation = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];

    dataMethods.forEach((key) => {
      if (schema[key]) {
        // Validate request data against the schema
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });

        // Handle validation errors if any
        if (validationResult?.error?.details) {
          validationResult.error.details.forEach((detail) => {
            const msg = detail.message.replace(/\"/g, "");

            // Prepare error messages with proper formatting
            validationErrors.push({
              msg: msg.charAt(0).toUpperCase() + msg.slice(1),
              type: detail.type,
            });
          });
        }
      }
    });

    // If there are validation errors, return a 422 status code with the error messages
    if (validationErrors.length) {
      return res
        .status(422)
        .json({ message: "Validation error", err: validationErrors }); // 422: Unprocessable Entity
    }

    // Continue to the next middleware or route handler if no validation errors
    next();
  };
};

export default validation;
