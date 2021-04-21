const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const client = global.client;

client.komutlar = [
  {isim: "painter", rol: "801030582892625930"},
  {isim: "lovers", rol: "798440675934863371"},
  {isim: "ekip", rol: "792032897048510472"},
  {isim: "rehber", rol: "792032897066074148"},
  {isim: "uyarı1", rol: "824919610331627530"},
  {isim: "uyarı2", rol: "824919620397432842"},
  {isim: "uyarı3", rol: "824919621324374026"},
  {isim: "streamer", rol: "792032897048510470"},
  {isim: "yetkilial1", rol: "792032897048510473"},
  {isim: "yetkilial2", rol: "792032897066074143"},
  {isim: "yetkilial3", rol: "792032897066074145"},
];

module.exports = (message) => {
  if (!message.content.startsWith(conf.prefix)) return;
  let ayar = db.get('ayar') || {};
  let args = message.content.substring(conf.prefix.length).split(" ");
  let command = args[0];
  args = args.splice(1);
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return;
  let komut = client.komutlar.find(k => k.isim === command);
  if (komut && (komut.isim === "yetkilial1" || komut.isim === "yetkilial2" || komut.isim === "yetkilial3")) {
    if (!message.member.roles.cache.has("792032897082589206") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.add([komut.rol, "792032897048510473", "792032897066074143", "792032897066074145"]);
    return message.react(client.emojiler.onay);
  };

  if (komut && (komut.isim === "rehber" || komut.isim === "uyarı1" || komut.isim === "uyarı2" || komut.isim === "uyarı3")) {
  if (!message.member.roles.cache.has("792032897082589206") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };
  if (komut && (komut.isim === "streamer" || komut.isim === "youtuber" || komut.isim === "coder" || komut.isim === "famous")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };

  if (komut && (komut.isim === "elite")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };
  if (!message.member.roles.cache.has("603665487662153738") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
  if (!uye || !komut) return;
  uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol).catch() : uye.roles.add(komut.rol).catch();
  return message.react(client.emojiler.onay);
};

module.exports.configuration = {
  name: "message"
};