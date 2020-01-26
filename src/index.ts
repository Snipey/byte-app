import { ISettings } from "./interfaces/index";

export default class Byte {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  private async request(
    method: string = "GET",
    uri: string,
    body: null | any = null
  ): Promise<any> {
    return await fetch(`https://api.byte.co/${uri}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        authorization: this._token,
        host: "api.byte.co",
        "user-agent":
          "byte/0.2 (co.byte.video; build:145; iOS 13.2.0) Alamofire/4.9.1"
      }
    }).then(d => d.json());
  }

  private accountOrMe = (id: string): string => (id ? `id/${id}` : "me");

  public me = async (): Promise<any> =>
    await this.request("GET", "/account/me");

  public following = async (cursor: string = ""): Promise<any> =>
    await this.request("GET", `/account/me/following?cursor=${cursor}`);

  public liked = async (cursor: string = ""): Promise<any> =>
    await this.request("GET", `/account/me/feedback/like?cursor=${cursor}`);

  public settings = async (body: ISettings): Promise<any> =>
    await this.request("PUT", "/account/me", body);

  public colours = async (): Promise<any> =>
    await this.request("GET", `/account/me/colors`);
  public color = this.colours;

  public account = async (user: null | string = null): Promise<any> =>
    await this.request("GET", `/account/${this.accountOrMe(user)}`);

  public follow = async (user: string): Promise<any> =>
    await this.request("PUT", `/account/id/${user}/follow`);

  public unfollow = async (user: string): Promise<any> =>
    await this.request("DELETE", `/account/id/${user}/follow`);

  public like = async (post: string): Promise<any> =>
    await this.request("PUT", `/post/id/${post}/feedback/like`);

  public unlike = async (post: string): Promise<any> =>
    await this.request("DELETE", `/post/id/${post}/feedback/like`);

  public loop = async (post: string): Promise<any> =>
    await this.request("POST", `/post/id/${post}/loop`);

  public comment = async (post: string, body: string): Promise<any> =>
    await this.request("POST", `/post/id/${post}/feedback/comment`, { body });

  public search = async (user: string): Promise<any> =>
    await this.request("GET", `/prefix/${user}`);

  public explore = {
    popular: async (cursor: string = ""): Promise<any> =>
      await this.request("GET", `/feed/popular?cursor=${cursor}`),
    latest: async (cursor: string = ""): Promise<any> =>
      await this.request("GET", `/feed/global?cursor=${cursor}`),
    category: async (
      category: string,
      cursor: string = "",
      filter: string = "popular"
    ): Promise<any> =>
      await this.request(
        "GET",
        `/categories/${category}/${filter}?cursor=${cursor}`
      )
  };

  public timeline = async (
    mode: null | string = null,
    cursor: string = ""
  ): Promise<any> =>
    await this.request(
      "GET",
      `/timeline${mode ? `/${mode}` : ""}?cursor=${cursor}`
    );
}
