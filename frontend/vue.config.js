module.exports = {
    //...
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8000"
            },
            "/socket.io": {
                target: "http://localhost:8000",
                ws: true
            }
        }
    }
};
