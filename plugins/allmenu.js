 import "../database/config.js"
let handler = async(m, { bot }) => {
   const textMenu = `
╭─┴─❍「 *BOT INFO* 」
├ *Nama Bot*: ${global.bot.botName}
├ *Powered*: Baileys
├ *Owner*: ${global.owner.number}
├ *Prefix*: ${global.bot.prefix}
├ *Version*: 1.0.0
╰─┬────❍
╭─┴─❍「 *ALL MENU* 」
├ .kaguyaAi
├ .claudeai
├ .spotifydl
├ .runtime
├ .iqc
├ .mf
╰──────❍`

await bot.sendMessage(
    m.chat, 
    { 
        image: {
            url: global.thumb
        },
        caption: textMenu
    }
)
}
handler.command = ["allmenu", "menu", "menuall"]
export default handler
