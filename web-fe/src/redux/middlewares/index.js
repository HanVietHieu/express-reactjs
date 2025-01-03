const serviceMiddleware = () => (next) => async (action) => {
    next(action)
}

export { serviceMiddleware };