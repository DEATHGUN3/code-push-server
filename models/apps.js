"use strict";

module.exports = function(sequelize, DataTypes) {
  var Apps = sequelize.define("Apps", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    uid: DataTypes.BIGINT(20),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: 'apps',
    underscored: true,
    paranoid: true,
  });
  Apps.findAppInfo = function (appName) {
    var sql = "SELECT a.NAME,p.label,d.NAME deploymentName,dv.app_version,pm.active,pm.downloaded,pm.failed,pm.installed FROM `apps` as a LEFT JOIN `packages` as p ON a.uid = p.released_by LEFT JOIN `deployments` as d ON p.deployment_id = d.id LEFT JOIN `deployments_versions` as dv ON dv.deployment_id = d.id LEFT JOIN `packages_metrics` pm ON p.id = pm.package_id WHERE a.NAME = :appName AND d.name = 'Production' order by p.id";
    return sequelize.query(sql, { replacements: { appName: appName },model: Apps});
  };
  return Apps;
};
