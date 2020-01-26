import { ISettings } from "./interfaces/index";
export default class Byte {
    private _token;
    constructor(token: string);
    private request;
    private accountOrMe;
    me: () => Promise<any>;
    following: () => Promise<any>;
    liked: () => Promise<any>;
    settings: (body: ISettings) => Promise<any>;
    colours: () => Promise<any>;
    color: () => Promise<any>;
    account: (user?: string) => Promise<any>;
    follow: (user: string) => Promise<any>;
    unfollow: (user: string) => Promise<any>;
    like: (post: string) => Promise<any>;
    unlike: (post: string) => Promise<any>;
    search: (user: string) => Promise<any>;
    explore: {
        popular: () => Promise<any>;
        category: (category: string, filter?: string) => Promise<any>;
    };
    timeline: (mode?: string) => Promise<any>;
}
