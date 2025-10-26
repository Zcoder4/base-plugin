import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, readFile } from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


global.bot = {
   prefix: ".",
   autoread: false,
   autotyping: false,
   botName: "ZENITSU-KUN"
}

global.owner = {
   name: "k1nk zome", // nama owner nya di isi
   number: "" // wa owner
}

global.db = {
   premium: join(__dirname, "../database/premium.json"),
   owner: join(__dirname, "../database/owner.json")
}

global.thumb = "https://files.catbox.moe/40b9z2.jpeg"