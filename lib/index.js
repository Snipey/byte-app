"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Byte {
    constructor(token) {
        this.accountOrMe = (id) => (id ? `id/${id}` : "me");
        this.me = async () => await this.request("GET", "/account/me");
        this.following = async () => await this.request("GET", "/account/me/following");
        this.liked = async () => await this.request("GET", "/account/me/feedback/like");
        this.settings = async (body) => await this.request("PUT", "/account/me", body);
        this.colours = async () => await this.request("GET", `/account/me/colors`);
        this.color = this.colours;
        this.account = async (user = null) => await this.request("GET", `/account/${this.accountOrMe(user)}`);
        this.follow = async (user) => await this.request("PUT", `/account/id/${user}/follow`);
        this.unfollow = async (user) => await this.request("DELETE", `/account/id/${user}/follow`);
        this.like = async (post) => await this.request("PUT", `/post/id/${post}/feedback/like`);
        this.unlike = async (post) => await this.request("DELETE", `/post/id/${post}/feedback/like`);
        this.search = async (user) => await this.request("GET", `/prefix/${user}`);
        this.explore = {
            popular: async () => await this.request("GET", `/feed/popular`),
            category: async (category, filter = "popular") => await this.request("GET", `/categories/${category}/${filter}`)
        };
        this.timeline = async (mode = null) => await this.request("GET", `/timeline${mode ? `/${mode}` : ""}`);
        this._token = token;
    }
    async request(method = "GET", uri, body = null) {
        return await fetch(`https://api.byte.co/${uri}`, {
            method,
            body: JSON.stringify(body),
            headers: {
                authorization: this._token,
                host: "api.byte.co",
                "user-agent": "byte/0.2 (co.byte.video; build:145; iOS 13.2.0) Alamofire/4.9.1"
            }
        }).then(d => d.json());
    }
}
exports.default = Byte;
//# sourceMappingURL=index.js.map