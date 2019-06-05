const EventEmitter = require('events');
const DiscordIPC   = require('./DiscordIPC.js');

module.exports = class DiscordRPC extends EventEmitter {
    constructor({clientID, debug}) {
        super();
        this.discordIPC = new DiscordIPC(clientID);

        if (debug) {
            this.discordIPC.on('open', () => console.log('[Discord RPC] Status: Opened'));
            this.discordIPC.on('close', (event) => console.log('[Discord RPC] Status: Closed', event));
            this.discordIPC.on('error', (event) => console.log('[Discord RPC] Error: ', event));
        }
        
        this.discordIPC.on('message', (event) => {
            switch (event.evt) {
                case 'READY':
                    if (debug) console.log('[Discord RPC] Status: Ready');
                    this.emit('ready');
                    break;
                default:
                    if (debug) console.log('[Discord RPC] Message: ', event);
                    break;
            }
        });
        this.discordIPC.connect();
    }

    send(cmd, args) { this.discordIPC.send({ cmd, args, nonce: require('./util.js').uuid() }); }
};
