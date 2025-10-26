let handler = async (m, { bot, args, reply2 }) => {
  try {
    if (!args[0]) return reply2("mana woi text nya?")
    let d = new Date()
    let t = new Date(d.getTime() + 7*3600000).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',hour12:false})
    await bot.sendMessage(m.chat, { image:{ url:`https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(t)}&messageText=${encodeURIComponent(args.join(' '))}&carrierName=INDOSAT%20OORE...&batteryPercentage=${Math.floor(Math.random()*100)+1}&signalStrength=4&emojiStyle=apple`} }, { quoted:m })
  } catch(e){ reply2(e.message) }
}

handler.command = ['iqc']
handler.tags = ['maker']

export default handler