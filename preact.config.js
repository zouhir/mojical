module.exports = (config, env, helpers) => {
  let definePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  let nodeEnvPrd = process.env.NODE_ENV === "production";
  console.log(nodeEnv);
  definePlugin.plugin["definitions"]["MOJICAL_ENV"] = nodeEnvPrd
    ? `"production"`
    : `"staging"`;
};
