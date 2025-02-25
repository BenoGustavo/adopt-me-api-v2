import { app } from "./app";
import { env } from "./env";
import { helloWorldRoutes } from "./http/routes/hello-world.router";

app.register(helloWorldRoutes);

app.listen({
    host: "0.0.0.0",
    port: env.PORT,
}).then(
    (_url) => console.log(`🛜 GymPass Back-end app live on http://localhost:${env.PORT} 🛜`)
);