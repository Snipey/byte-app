import { expect } from "chai";
import { describe, it } from "mocha";

import "isomorphic-fetch";
import Byte from "../src/index";

const client = new Byte(process.env.TOKEN);

describe("Create a client", () => {
  it("should work", async () => {
    const me = await client.me();
    console.log(await client.account("A7B3O6MD3RHLTAAE4JVSTB2TOQ"));
    client.settings({ colorScheme: 9 });
    expect(me).to.not.be.undefined;
  });
});
