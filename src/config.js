let config;

if (MOJICAL_ENV === "development") {
  config = require("./keys.dev.json");
} else {
  config = require("./keys.prd.json");
}

export default config;
