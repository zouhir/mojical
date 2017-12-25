module.exports = (config, env, helpers) => {
  let definePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  definePlugin.plugin["definitions"]["MOJICAL_ENV"] = env.production
    ? `"production"`
    : `"development"`;
};
