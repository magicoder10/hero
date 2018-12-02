const pluginName = 'HotReload';
const WebSocketServer = require('ws').Server;
const {ConcatSource} = require('webpack-sources');

module.exports = class HotReload {
    constructor(config = {}) {
        const port = config.port || 9000;

        this._wss = new WebSocketServer({
            port: port
        });

        this._wss.on('connection', (ws) => {
            this._ws.push(ws);
            console.log('Accept connection');
        });

        this._ws = [];

        this._fileReloadScript = `
const ws = new WebSocket('ws://127.0.0.1:${port}');
ws.onmessage = (event) => {
    location.reload();
};`
    }

    apply(compiler) {

        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.optimizeChunkAssets.tap(pluginName, chunks => {
                for (const chunk of chunks) {
                    if (!chunk.canBeInitial()) {
                        continue;
                    }

                    for (const file of chunk.files) {
                        if(!file.endsWith('.js')) {
                            continue;
                        }
                        compilation.assets[file] = new ConcatSource(
                            this._fileReloadScript,
                            '\n',
                            compilation.assets[file],
                        );
                    }
                }
            });
        });

        compiler.hooks.afterEmit.tap(pluginName, compilation => {
            if (this._ws.length > 0 ){
                this._ws = this._ws.filter(ws => ws.readyState === ws.OPEN);
                this._ws.forEach(ws => ws.send());
            }
        });
    }
};
