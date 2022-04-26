import { Client } from 'discord.js';

declare class DiscordActivity<T extends {
    [x: string]: string;
}> {
    client: string;
    applications: {
        youtube: string;
        youtubedev: string;
        poker: string;
        betrayal: string;
        fishing: string;
        chess: string;
        chessdev: string;
        lettertile: string;
        wordsnack: string;
        doodlecrew: string;
        awkword: string;
        spellcast: string;
        checkers: string;
        puttparty: string;
        sketchheads: string;
        ocho: string;
    } & T;
    createActivityCode(voiceChannelId: string, option: keyof ({
        youtube: string;
        youtubedev: string;
        poker: string;
        betrayal: string;
        fishing: string;
        chess: string;
        chessdev: string;
        lettertile: string;
        wordsnack: string;
        doodlecrew: string;
        awkword: string;
        spellcast: string;
        checkers: string;
        puttparty: string;
        sketchheads: string;
        ocho: string;
    } & T)): Promise<{
        code: string;
    }>;
}