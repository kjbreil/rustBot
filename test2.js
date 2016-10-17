#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');
global.knex = require('knex')(config.knex)

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

global.playersOnline = []

const fs = require('fs')


global.cpu = require('auto-loader').load(__dirname +'/cpu')
global.discord = require('auto-loader').load(__dirname +'/discord')
global.rust = require('auto-loader').load(__dirname +'/rust')

global.log = cpu.logger.rustBotLog
global.logFile = config.logFiles[0]
global.discordRoom = config.discordRooms[0]


var SteamApi = require('steam-api')
var userStats = new SteamApi.UserStats(config.steamApiKey)


var user = new SteamApi.User(config.steamApiKey, config.ownerSteamId);
var userStats = new SteamApi.UserStats(config.steamApiKey, config.ownerSteamId);
var news = new SteamApi.News(config.steamApiKey);
var app = new SteamApi.App(config.steamApiKey);
var player = new SteamApi.Player(config.steamApiKey, config.ownerSteamId);
var inventory = new SteamApi.Inventory(config.steamApiKey, config.ownerSteamId);
var items = new SteamApi.Items(config.steamApiKey, config.ownerSteamId);




// Steam API Backpack
// items.GetPlayerItems(config.rustAppId, config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// // Inventory
// inventory.GetAppItems(config.rustAppId, config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// // User methods
// user.GetPlayerBans(config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// user.GetFriendList(optionalRelationship = 'all', config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// user.GetUserGroupList(config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// //// e.g. vanityUrl = "pr00fgames";
// // user.ResolveVanityUrl(vanityUrl).done(function(result){
// //   log(result, 'lc', logFile.info, discordRoom.bot);
// // });
 
 
// // UserStats methods
// //// e.g. config.rustAppId = 17740;
// //// e.g. statsName = ['global.map.emp_isle'];
// // userStats.GetGlobalStatsForGame(config.rustAppId, statsName).done(function(result){
// //   log(result, 'lc', logFile.info, discordRoom.bot);
// // });
 
// //// e.g. config.rustAppId = 620;
// userStats.GetNumberOfCurrentPlayers(config.rustAppId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
userStats.GetSchemaForGame(config.rustAppId).done(function(result){
  log(result.availableGameStats.stats, 'lc', logFile.info, discordRoom.bot);
});
 
// userStats.GetPlayerAchievements(config.rustAppId, config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// userStats.GetGlobalAchievementPercentagesForApp(config.rustAppId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// userStats.GetUserStatsForGame(config.rustAppId, config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
 
// // News Methods
// news.GetNewsForApp(
//                     config.rustAppId,
//                     optionalCount = 5,
//                     optionalMaxLength = null
//                   )
//     .done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
 
// // App Methods
// app.appDetails(config.rustAppId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// app.GetAppList().done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// app.GetServersAtAddress('107.191.112.62').done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// app.UpToDateCheck(config.rustAppId, '1803').done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
 
// // Player Methods
// player.GetSteamLevel(config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// player.GetPlayerLevelDetails(config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// player.GetBadges(config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// player.GetCommunityBadgeProgress(null, config.ownerSteamId).done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
 
// player.GetOwnedGames(
//                       config.ownerSteamId, 
//                       optionalIncludeAppInfo = true, 
//                       optionalIncludePlayedFreeGames = false 
//                       // optionalconfig.rustAppIdsFilter = []
//                     )
//       .done(function(result){
//   log(result, 'lc', logFile.info, discordRoom.bot);
// });
