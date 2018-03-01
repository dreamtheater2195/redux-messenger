export const createSocketMiddleware = io => config => {
    const socket = io();
    return store => next => action => {
        for (const key in config) {
            socket.on(key, (data) => {
                store.dispatch(config[key](data));
            })
        }
        let result = next(action);
        return result;
    };
}