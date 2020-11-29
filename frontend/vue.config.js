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
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "Play Mancala online!";
            args[0].meta = { viewport: "width=device-width,initial-scale=1,user-scalable=no" };
            args[0].meta = { name: "description", content: "Play Mancala online! Play with friends, or play against a random player. No signup needed!" };
            return args;
        });
    }
};
