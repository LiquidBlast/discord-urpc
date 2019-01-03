const EventEmitter = require('events');
const DiscordIPC   = require('./DiscordIPC.js');
 
//UUID function originally taken from https://github.com/discordjs/RPC/blob/master/src/util.js (MIT LICENSE)
const uuid = () => {
    let uuid = '';
    for (let i = 0; i < 32; i += 1) {
        if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-';
        let n;
        if (i === 12) n = 4;
        else {
            const random = Math.random() * 16 | 0;
            if (i === 16) n = (random & 3) | 0;
            else n = random;
        }
        uuid += n.toString(16);
    }
    return uuid;
};

module.exports = class DiscordRPC extends EventEmitter {
    constructor({ clientID, debug }) {
        super();
        this.debug = debug;
        this.discordIPC = new DiscordIPC(clientID);

        this.discordIPC.on('open', () =>       { if (this.debug) console.log('[Discord IPC] Status: Opened'); });
        this.discordIPC.on('close', (event) => { if (this.debug) console.log('[Discord IPC] Status: Closed', event); });
        this.discordIPC.on('error', (event) => { if (this.debug) console.log('[Discord IPC] Error', event); });
        
        this.discordIPC.on('message', (event) => {
            switch (event.evt) {
                case 'READY':
                    if (this.debug) console.log('[Discord RPC] Status: Ready');
                    this.emit('ready');
                    break;
                default:
                    if (this.debug) console.log('[Discord IPC] Message: ', event);
                    break;
            }
        });
        this.discordIPC.connect();
    }

    send(cmd, args) { this.discordIPC.send({ cmd, args, nonce: uuid() }); }
}
