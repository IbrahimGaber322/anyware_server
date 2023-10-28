import swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
dotenv.config();

const DOMAIN = process.env.DOMAIN;
// Data used in Swagger documentation
const usedData = {
  domain: DOMAIN, // Domain for server
  title: "Anyware Coligo API", // Title of the API documentation
  channel: process.env.CHANNEL, // Channel for the API
  version: "1.0.0", // Version of the API
};

/**
 * Generates Swagger documentation and sets up routes in the provided Express application
 * @param {object} app - The Express application
 * @param {Array} apis - Array of paths to API endpoints
 */
function swaggerDocs(app, apis) {
  const swaggerSpecOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: usedData.title,
        version: usedData.version,
      },
      servers: [
        {
          // Configuring the global server URL for Swagger documentation
          url: `${usedData.domain}${usedData.channel}`,
        },
      ],
    },
    apis,
  };

  // Generate the Swagger specification
  const swaggerSpec = swaggerJsDoc(swaggerSpecOptions);

  // Route for the root of the API
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the API",
      docs: `${req.protocol}://${req.headers.host}/docs`, // Link to Swagger UI
      docs_json: `${req.protocol}://${req.headers.host}/docs.json`, // Link to JSON documentation
    });
  });

  // Swagger UI options
  const swaggerUIOptions = {
    customCss: ".swagger-ui .topbar, .title span { display: none }", // Custom CSS for UI
    customSiteTitle: usedData.title, // Custom title for Swagger UI
  };

  // Endpoint for serving the Swagger UI
  app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, swaggerUIOptions)
  );

  // Endpoint to retrieve API documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
