import * as cheerio from "cheerio"
import { basename, extname } from "path"
import mime from "mime-types"

async function mediafire(url) {
    const $ = cheerio.load(await (await fetch(url.trim())).text())
    const title = $("meta[property='og:title']").attr("content")?.trim() || "Unknown"
    const size = /Download\s*\(([\d.]+\s*[KMGT]?B)\)/i.exec($.html())?.[1] || "Unknown"
    const dl = $("a.popsok[href^='https://download']").attr("href")?.trim() || $("a.popsok:not([href^='javascript'])").attr("href")?.trim() || (() => { throw new Error("Download URL not found.") })()
    return { name: title, filename: basename(dl), type: extname(dl), size, download: dl, link: url.trim() }
}

let handler = async (m, { bot, args, reply2 }) => {
    try {
        if (!args[0]) return reply2("gimana mau download njir lu aja gak ngasih link?")
        let data = await mediafire(args[0])
        let mimetype = mime.lookup(data.filename) || 'application/octet-stream'
        await bot.sendMessage(m.chat, { document: { url: data.download }, mimetype, fileName: data.filename }, { quoted: m })
    } catch (e) {
        reply2(e.message)
    }
}

handler.command = ['mediafire', 'mf']
handler.tags = ['downloader']

export default handler