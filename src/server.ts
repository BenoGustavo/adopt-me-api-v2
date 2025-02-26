import { app } from "./app";
import { env } from "./env";
import { registerRoutes } from "./routes";

registerRoutes(app);

app.listen({
    host: "0.0.0.0",
    port: env.PORT,
}).then(
    (_url) => console.log(`🛜 Pet Adoption Back-end app live on http://localhost:${env.PORT} 🛜`)
);

/**
 * VALIDAR ERRORS DO ZOD
 * CRIAR UM MIDDLEWARE PARA TRATAR OS ERROS
 * CRIAR UM MIDDLEWARE PARA TRATAR OS ERROS DE VALIDAÇÃO
 * FAZER INTERFACES PARA OS REPOSITORIES
 * FAZER FACTORIES PARA OS SERVICES
 */