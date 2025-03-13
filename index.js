import app from "./src/app.js";
import { setupSwagger } from "./swagger.js";
import { PORT } from "./src/config/env.js";

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
