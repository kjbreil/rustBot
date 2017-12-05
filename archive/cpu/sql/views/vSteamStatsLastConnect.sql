CREATE OR REPLACE VIEW public."vSteamStatsLastConnect" AS

SELECT 
       steamid,
       deaths,
       bulletfired,
       arrowfired,
       itemdrop,
       blueprintstudied,
       deathsuicide,
       deathfall,
       deathselfinflicted,
       killplayer,
       bullethitplayer,
       arrowhitentity,
       harvestfatanimal,
       harveststones,
       bullethitentity,
       harvestcloth,
       harvestwood,
       arrowhitbuilding,
       killbear,
       killboar,
       killstag,
       killchicken,
       killhorse,
       killwolf,
       harvestmetalore,
       headshot,
       harvestsulfurore,
       harvestbonefragments,
       harvesthumanmeatraw,
       arrowhitboar,
       arrowhitbear,
       arrowhitwolf,
       arrowhitstag,
       arrowhitchicke,
       bullethitbuilding,
       harvestwolfmeatraw,
       harvestskullhuma,
       harvestskullwolf,
       arrowhithorse,
       arrowhitplayer,
       deathentity,
       deathwolf,
       deathbear,
       shotgunfired,
       shotgunhitbuildin,
       bullethitbear,
       bullethithorse,
       bullethitstag,
       bullethitwolf,
       bullethitboar,
       bullethitsign,
       wounded,
       woundedassiste,
       woundedheale,
       bullethitplayercorpse,
       bullethitcorpse,
       created_at
FROM steamstats_audit
WHERE created_at < (now() - '24 hour'::interval)
ALTER TABLE public."vSteamStatsLastConnect" OWNER TO rustbot;

