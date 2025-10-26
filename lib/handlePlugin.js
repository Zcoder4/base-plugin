import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadPlugins = async () => {
  const direktori = path.join(__dirname, '../plugins');
  const plugins = [];

  try {
    // Cek apakah folder Plugins exists
    await fs.access(direktori);
  } catch {
    console.warn("❌ Folder 'Plugins' tidak ditemukan.");
    return plugins;
  }

  try {
    const files = await fs.readdir(direktori);
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(direktori, file);
        
        try {
          // Dynamic import untuk ESM
          const pluginUrl = new URL(`file://${filePath}`).href;
          const pluginModule = await import(pluginUrl);
          const plugin = pluginModule.default || pluginModule;

          // Validasi plugin harus function dan punya .command array
          if (
            typeof plugin === 'function' &&
            Array.isArray(plugin.command)
          ) {
            plugins.push(plugin);
          } else {
            console.warn(`❌ Plugin '${file}' tidak valid. Harus function + .command array.`);
          }
        } catch (err) {
          console.error(`💥 Gagal memuat plugin di ${filePath}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error('💥 Error reading Plugins directory:', err.message);
  }

  return plugins;
};

const handleMessage = async (m, commandText, Obj) => {
  const plugins = await loadPlugins();

  for (const plugin of plugins) {
    const commandMatch = plugin.command
      .map(c => c.toLowerCase())
      .includes(commandText.toLowerCase());

    if (commandMatch) {
      try {
        await plugin(m, Obj);
      } catch (err) {
        console.error(`💥 Error saat menjalankan plugin '${commandText}':`, err);
      }
      break;
    }
  }
};

export default handleMessage;
