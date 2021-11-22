const Organization = require('../../model/Organization');
const ErrorHandle = require('../../error/errorHandler')

const createOrganization = async (organization) => {
  try {
    const newOrganization = new Organization(organization);
    await newOrganization.save();
    return newOrganization;
  }
  catch (error) {
    throw new ErrorHandle('Create an Organization Error','Failed to create an Organization')
  }
}

const deleteOrganizationByID = async (_id) => {
  try {
    const deletedOrganization = await Organization.findByIdAndRemove({ _id });
    return deletedOrganization;
  } catch (error) {
  throw new ErrorHandle('Delete an Organization Error','Failed to delete an Organization')
}
}

const getOrganization = async (filter) => {
  try {
    const organizationQuery = await Organization.find({}).select(filter);
    return organizationQuery;
  } catch (error) {
    throw new ErrorHandle('Get an Organization Error', 'Failed to get an Organization')
  }
};

const getOrganizationByID = async (_id, payload) => {
  try {
    const organizationQuery = await Organization.updateOne({ _id },
      { $set: payload });
    const { modifiedCount, matchedCount } = organizationQuery;
    if (modifiedCount === 1 && matchedCount === 1) {
      return `Successuful updated ${_id}`
    }
    else if (modifiedCount === 0 && matchedCount === 1) {
      return `Please update some filed value for update an organization ${_id}`
    } else {
      return `Failed to updated an orgainzation ${_id}`
    };
      
  } catch (error) {
    throw new ErrorHandle('Update an Organization Error', `Failed to get an Organization ${_id}`)
  }
};

const getOrganizationByName = async (name, filter) => {
  try {
    
      const organizationQuery = await Organization.find({ name }).select(filter);
      return organizationQuery;
  } catch (error) {
    throw new ErrorHandle('Get an Organization by Name Error', `Failed to get an Organization by Name: ${name}`)
  }
};

const getOrganizationByCode = async (code) => {
    try {
        const organizationQuery = await Organization.find({ code });
        return organizationQuery;
  } catch (error) {
    throw new ErrorHandle('Get an Organization by Code Error', `Failed to get an Organization by Code: ${code}`)
  }
};

module.exports = {
  createOrganization,
  deleteOrganizationByID,
  getOrganization,
  getOrganizationByID,
  getOrganizationByName,
  getOrganizationByCode
}