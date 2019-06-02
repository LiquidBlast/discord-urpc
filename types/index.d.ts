import { Socket } from 'net';

declare module 'discord-urpc' {
    export class DiscordRPC {
        constructor(info: DiscordRPCInfo);

        public discordIPC: DiscordIPC;
        public send(command: string, args?: any): void;
    }

    export class DiscordIPC {
        constructor(clientID: string);

        public clientID: string;
        public socket: Socket | null;
        public connect(): Promise<void>;
        public onClise(e: any): void;
        public send(pkt: any, op: number): void;
        public close(): void;

    }

    export interface DiscordRPCInfo {
        clientID: string;
        debug?: boolean;
    }
}
