
const {
  getOrganization,
  getOrganizationByName,
  getOrganizationByCode
} = require('../organization/services');

const getOrganizationInstanceByNameOrCode = (name, code, filter) => {
  let funArgs = {}
  if (name) {
      funArgs = { args: [name, filter], fun: getOrganizationByName }
  } else if (code) {
      funArgs = { args: [code], fun: getOrganizationByCode }
  } else {
      funArgs = { args: [], fun: getOrganization }
  }
  return funArgs;
}

module.exports = { getOrganizationInstanceByNameOrCode }