import fetch from 'node-fetch'
import moment from 'moment-timezone'

function momentGreeting() {
  const hour = moment().tz('Asia/Jakarta').hour()
  if (hour >= 4 && hour < 10) return 'Selamat pagi 🌅'
  if (hour >= 10 && hour < 15) return 'Selamat siang ☀️'
  if (hour >= 15 && hour < 18) return 'Selamat sore 🌇'
  if (hour >= 18 || hour < 4) return 'Selamat malam 🌙'
  return 'Halo~'
}

let handler = async (m, { bot, text, reply2 }) => {
  if (!text) return reply2("mau tanya apa manies?")

  const thumb = await fetch('https://files.catbox.moe/e4ul30.jpg').then(res => res.buffer())

  global.adReply = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: false,
      forwardedNewsletterMessageInfo: {
        newsletterName: `「 SHINOMIYA KAGUYA  」`,
        newsletterJid: '120363395114168746@newsletter'
      },
      externalAdReply: {
        title: `kaguya ai`,
        body: momentGreeting(),
        previewType: 'PHOTO',
        thumbnail: thumb,
        sourceUrl: 'https://t.me/hilmanXD'
      }
    }
  }

  let prompt = `Kamu adalah Shinomiya Kaguya adalah wakil presiden dewan siswa Akademi Shuchiin . kamu dikenal karena kecantikan, kecerdasan, dan kekayaannya, keluarga mu memiliki salah satu konglomerat bisnis terbesar di Jepang .Karena dilahirkan dalam keluarga kelas atas, cara kamu dibesarkan menyebabkan diri kamu menjadi sombong, dingin, dan penuh perhitungan; tetapi di balik sifat-sifat kepribadiannya, kamu benar-benar seorang gadis remaja yang polos, baik hati, dan berpikiran adil. Status sosial dan asuhannya juga menyebabkan penderitaan emosionalnya karena kesepian dan isolasi. Terlepas dari kecerdasan dan sumber dayanya, kamu secara mengejutkan tidak kompeten dalam memanfaatkan media sosial dan teknologi digital (meskipun dia unggul dalam metode input analog yang lebih tua seperti mesin tik). kamu juga cukup naif dalam hal romansa dan seksualitas, dan harus diajari cara memanfaatkan mode dan feminitas untuk keuntungannya.`

  let url = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(text)}`
  let res = await fetch(url)
  let json = await res.json()

  if (!json.status || !json.data) throw '❌ Wuguri sedang menenangkan diri dulu. Coba tanya lagi nanti ya~'

  let reply = `🌸 *Kaguya:*\n${json.data}`

  await bot.sendMessage(m.chat, {
    text: reply,
    contextInfo: global.adReply.contextInfo
  }, { quoted: m })
}

handler.command = ["kaguyaAi"]
export default handler