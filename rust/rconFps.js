// fps.js

const base = require('./../lib/base')
const config = require('./../config.js')
const discordDeleteMessageType = require('./../discord/discordMessage').discordDeleteMessageType

exports.fpsIF = (msg) => {
  msg = msg.Message
  let dfpsRE = (/^\[.+\] \[\*fps\*\:\*\*\*f\*\*\*\] (\d{1,3}) FPS/)
  discordDeleteMessageType(config.discordRooms.rcon, dfpsRE).then(function (z) {
    base.log('[*fps*:***f***] ' + msg, 'lcd', null, config.discordRooms.rcon)
  })
}
