import { isJidGroup, isJidUser, getContentType } from "@itsukichan/baileys";
import "./database/config.js";
import loadPluginsCommand from "./lib/handlePlugin.js";
import chalk from "chalk";

export default async function handler(bot, m) {
    if (!m.message) return;
    m.chat = m.key.remoteJid;
    const isGroup = isJidGroup(m.chat);
    const isPrivate = isJidUser(m.chat);
    const isNewsletter = m.chat.endsWith("@newsletter");
    const isStory = m.chat.endsWith("status@broadcast");
    const senderId = isNewsletter
        ? ""
        : isGroup || isStory
        ? m.key.participantAlt || "No Jid"
        : m.key.remoteJid;
    const botNumber = await bot.decodeJid(bot.user.id);
    m.type = getContentType(m.message); // m.message[m.type].text ||
        const body =
        m.type === "conversation"
            ? m.message.conversation
            : m.message[m.type].text ||
   m.message[m.type].singleSelectReply?.selectedRowId ||
              m.message[m.type].selectedButtonId ||
              (m.message[m.type].nativeFlowResponseMessage?.paramsJson
                  ? JSON.parse(
                        m.message[m.type].nativeFlowResponseMessage.paramsJson
                    ).id
                  : "") ||
              "";
    const isCmd = body.trim().startsWith(global.bot.prefix);
    const cmd = body
        .replace(global.bot.prefix, "")
        .trim()
        .split(/ +/)
        .shift()
        .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const text = args.join(" ");
    const groupMetadata = await bot.groupMetadata(m.chat);
    const groupOwner = isGroup ? groupMetadata.owner : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupAdmins = isGroup
        ? await participants.filter(v => v.admin !== null).map(v => v.id)
        : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const isGroupAdmins = isGroup ? groupAdmins.includes(senderId) : false;
    const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = isGroup ? groupAdmins.includes(senderId) : false;
    const reply2 = teks => {
        bot.sendMessage(m.chat, { text: teks }, { quoted: m });
    };
    const isOwner = global.db.owner
    const handleData = {
        bot,
        text,
        args,
        isCmd,
        cmd,
        reply2,
        participants,
        isGroup,
        isOwner
    };
    if (isCmd) {
        await loadPluginsCommand(m, cmd, handleData);
    }
    m.groupName = groupName
    console.log(m);
}
