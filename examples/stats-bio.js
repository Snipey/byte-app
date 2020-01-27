require("isomorphic-fetch");
const Byte = require("../lib").default;

const actualBio = "*yeet dab*";

const updateBioStats = async () => {
    const client = new Byte(process.env.BYTE_TOKEN);
    const me = await client.me();

    await client.settings({ bio: `${me.data.followerCount.toLocaleString("en-US")} followers      ${me.data.followingCount.toLocaleString("en-US")} following\n\n${actualBio}` });
    console.log("Updated bio");
};

setInterval(updateBioStats, 30000);
updateBioStats();
