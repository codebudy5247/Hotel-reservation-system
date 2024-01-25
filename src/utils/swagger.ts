import { Express,Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "BookIt REST API Docs",
        version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  function swaggerDocs(app: Express, port: any) {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
    // Docs in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  
    console.log(`Api Docs available at http://localhost:${port}/docs`);
  }
  
  export default swaggerDocs;
  