import {
    makeWASocket,
    useMultiFileAuthState,
    jidDecode
} from "@itsukichan/baileys";
import pino from "pino";
import readline from "readline";
import chalk from "chalk";
import handler from "./handler.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = text => new Promise(resolve => rl.question(text, resolve));

async function startConnection() {
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const bot = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });
    if (!bot.authState.creds.registered) {
        const phoneNumber = await question(
            chalk.magenta.bold("mana nomor wa mu: +")
        );
        const code = await bot.requestPairingCode(phoneNumber);
        console.log(chalk.green.bold(`kode mu adalah ${code}`));
    }
    bot.ev.on("creds.update", saveCreds);
    bot.ev.on("connection.update", ({ connection }) => {
        if (connection === "close") {
            console.log(
                chalk.red.bold(
                    "waduh!, koneksi mu error nih kak😅, mencoba memuat ulang🔄"
                )
            );
            startConnection();
        } else if (connection === "open") {
            console.log(
                chalk.green.bold(
                    "yey, koneksi mu berhasil terhubung dengan bot🥳🤩"
                )
            );
        }
    });
    bot.ev.on("messages.upsert", ({ messages }) => {
        handler(bot, messages[0]);
    });
    bot.decodeJid = jid => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (
                (decode.user &&
                    decode.server &&
                    decode.user + "@" + decode.server) ||
                jid
            );
        } else return jid;
    };
}
startConnection();
