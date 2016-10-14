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
//   console.log(result);
// });
 
// // Inventory
// inventory.GetAppItems(config.rustAppId, config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// // User methods
// user.GetPlayerBans(config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// user.GetFriendList(optionalRelationship = 'all', config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// user.GetUserGroupList(config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// //// e.g. vanityUrl = "pr00fgames";
// // user.ResolveVanityUrl(vanityUrl).done(function(result){
// //   console.log(result);
// // });
 
 
// // UserStats methods
// //// e.g. config.rustAppId = 17740;
// //// e.g. statsName = ['global.map.emp_isle'];
// // userStats.GetGlobalStatsForGame(config.rustAppId, statsName).done(function(result){
// //   console.log(result);
// // });
 
// //// e.g. config.rustAppId = 620;
// userStats.GetNumberOfCurrentPlayers(config.rustAppId).done(function(result){
//   console.log(result);
// });
 
userStats.GetSchemaForGame(config.rustAppId).done(function(result){
  console.log(result.availableGameStats.stats);
});
 
// userStats.GetPlayerAchievements(config.rustAppId, config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// userStats.GetGlobalAchievementPercentagesForApp(config.rustAppId).done(function(result){
//   console.log(result);
// });
 
// userStats.GetUserStatsForGame(config.rustAppId, config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
 
// // News Methods
// news.GetNewsForApp(
//                     config.rustAppId,
//                     optionalCount = 5,
//                     optionalMaxLength = null
//                   )
//     .done(function(result){
//   console.log(result);
// });
 
 
// // App Methods
// app.appDetails(config.rustAppId).done(function(result){
//   console.log(result);
// });
 
// app.GetAppList().done(function(result){
//   console.log(result);
// });
 
// app.GetServersAtAddress('107.191.112.62').done(function(result){
//   console.log(result);
// });
 
// app.UpToDateCheck(config.rustAppId, '1803').done(function(result){
//   console.log(result);
// });
 
 
// // Player Methods
// player.GetSteamLevel(config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// player.GetPlayerLevelDetails(config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// player.GetBadges(config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// player.GetCommunityBadgeProgress(null, config.ownerSteamId).done(function(result){
//   console.log(result);
// });
 
// player.GetOwnedGames(
//                       config.ownerSteamId, 
//                       optionalIncludeAppInfo = true, 
//                       optionalIncludePlayedFreeGames = false 
//                       // optionalconfig.rustAppIdsFilter = []
//                     )
//       .done(function(result){
//   console.log(result);
// });
