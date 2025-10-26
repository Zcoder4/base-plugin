import { runtime } from "../lib/myfunc.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = join(__dirname, "../package.json");
const date = new Date();

const { version } = JSON.parse(await readFile(pkg, "utf8"));
// Format dengan nama bulan dan hari
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

const tanggalFormat = date.toLocaleDateString("id-ID", options);

let uptime = await runtime(process.uptime());
let handler = async (m, { bot }) => {
    const informationBot = `
├ *nama bot* : *${global.bot.botName}* 
├ *runtime* : *${runtime(process.uptime())}*
├ *versi* : *${version}*
├ *tanggal* : *${tanggalFormat}*`;
    await bot.sendMessage(
        m.chat,
        {
            text: informationBot
        },
        { quoted: m }
    );
};
handler.command = ["ping", "runtime"];
export default handler;
