const Axios = require("axios");

const emptyFileCache = async (files = null) => {
    try {
        const identifier = "a64be5f59a7b50ed4b674b213bc81aa1";

        const { data } = await Axios({
            method: "POST",
            url: `https://api.cloudflare.com/client/v4/zones/${identifier}/purge_cache`,
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                "Content-Type": "application/json",
            },
            data: { files: Array.isArray(files) ? files : [files] },
        });

        return data.success;
    } catch (error) {
        console.log(error.response.data.errors);
        return false;
    }
};

const getZones = async () => {
    try {
        const { data } = await Axios({
            method: "GET",
            url: `https://api.cloudflare.com/client/v4/zones`,
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const health = async () => {
    try {
        const { data } = await Axios({
            method: "GET",
            url: `https://api.cloudflare.com/client/v4/user/tokens/verify`,
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (data.success === true && data.result.status === "active") {
            return "ok";
        } else {
            return "connected but errored";
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    emptyFileCache,
    health,
};
