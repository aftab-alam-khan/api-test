const routes = [
    {// GET Tasks Route
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.response('Updated');
        }
    },
]

module.exports = routes