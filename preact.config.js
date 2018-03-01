const Jarvis = require("webpack-jarvis");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (config, env, helpers) => {
  let definePlugin = helpers.getPluginsByName(config, "DefinePlugin")[0];
  let nodeEnvPrd = process.env.NODE_ENV === "production";
  definePlugin.plugin["definitions"]["MOJICAL_ENV"] = nodeEnvPrd
    ? `"production"`
    : `"staging"`;

  config.plugins.push(new Jarvis());
  if( env.isPrd ) {
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }
};
