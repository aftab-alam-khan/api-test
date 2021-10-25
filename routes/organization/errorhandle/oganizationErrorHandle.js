module.exports = class CreateOrganizationError extends Error{
    constructor(message) {
        super(message);
        this.name = "CreateOrganizationError";
    }
}

module.exports = class DeleteOrganizationError extends Error{
    constructor(message) {
        super(message);
        this.name = "DeleteOrganizationError";
    }
}

module.exports = class GetOrganizationError extends Error{
    constructor(message) {
        super(message);
        this.name = "GetOrganizationError";
    }
}

module.exports = class UpdateOrganizationError extends Error{
    constructor(message) {
        super(message);
        this.name = "UpdateOrganizationError";
    }
}
