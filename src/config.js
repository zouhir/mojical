let config;

if (MOJICAL_ENV === "production") {
  config = require("./keys.prd.json");
} else {
  config = require("./keys.dev.json");
}

export default config;
