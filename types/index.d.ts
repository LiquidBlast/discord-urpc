declare module 'discord-urpc' {
    import { Socket } from 'net';
    import { EventEmitter } from 'events';
    
    export class DiscordRPC extends EventEmitter {
        constructor(info: DiscordRPCInfo);

        public discordIPC: DiscordIPC;
        public send(command: string, args?: any): void;
        public on(event: 'ready', listener: () => void): this;
    }

    export class DiscordIPC extends EventEmitter {
        constructor(clientID: string);

        public clientID: string;
        public socket: Socket | null;
        public connect(): Promise<void>;
        public onClose(e: any): void;
        public send(pkt: any, op: number): void;
        public close(): void;
        public on(event: 'open', listener: () => void): this;
        public on(event: 'error', listener: (event: any) => void): this;
        public on(event: 'close', listener: (event: any) => void): this;
    }

    export interface DiscordRPCInfo {
        clientID: string;
        debug: boolean;
    }
}
