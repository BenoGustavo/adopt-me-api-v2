import { app } from "./app";
import { env } from "./env";
import { globalErrorHandler } from "./errors/handlers/GlobalErrorHandler";
import { zodErrorHandler } from "./errors/handlers/ZodErrorHandler";
import { registerSwagger } from "./middleware/swagger";
import { registerRoutes } from "./routes";

registerSwagger(app);
registerRoutes(app);
app.setErrorHandler(zodErrorHandler);
app.setErrorHandler(globalErrorHandler);

app.listen({
	host: "0.0.0.0",
	port: env.PORT,
}).then(() =>
	console.log(
		`🛜 Pet Adoption Back-end app live on http://localhost:${env.PORT} 🛜`,
	),
);
