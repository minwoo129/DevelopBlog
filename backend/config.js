const isActiveInServer = process.env.ACTIVE_ENVIRONMENT == "active";

module.exports = {
  isActiveInServer,
};
