-- rustBotSqlViews.sql
 -- psql -f './rustBotSqlViews.sql' "postgresql://rustbot:xxxxxx@localhost/rustbot"

CREATE OR REPLACE VIEW public."vConnectedPlayers" AS
SELECT to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
       pl.steamid,
       pl.name,
       pl.ping,
       pl.ip,
       age(now(), cn.lcon) AS onlinetime,
       pl.violationlevel,
       pl.unspentxp,
       pl.health,
       pl.currentlevel
FROM playerlist pl
JOIN
  (SELECT max(connect.created_at) AS lcon,
          connect.steamid,
          connect.name
   FROM CONNECT
   WHERE CONNECT.CONNECT = TRUE
   GROUP BY CONNECT.steamid,
                    CONNECT.name) cn ON cn.steamid = pl.steamid
WHERE to_char(pl.created_at, 'MM/DD/YY HH24:MI:SS'::text) = (
                                                               (SELECT to_char(playerlist.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char
                                                                FROM playerlist
                                                                ORDER BY playerlist.created_at DESC LIMIT 1));


ALTER TABLE public."vConnectedPlayers" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."vLastStats" AS
SELECT DISTINCT ON (playerlist.steamid) to_char(playerlist.created_at, 'MM/DD/YY HH24:MI:SS'::text) AS to_char,
                                        playerlist.created_at,
                                        playerlist.steamid,
                                        playerlist.name,
                                        playerlist.ping,
                                        playerlist.health,
                                        playerlist.currentlevel,
                                        playerlist.unspentxp,
                                        playerlist.violationlevel,
                                        playerlist.ownersteamid,
                                        playerlist.ip
FROM playerlist
ORDER BY playerlist.steamid,
         playerlist.created_at DESC;


ALTER TABLE public."vLastStats" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."vRecentlyConnected" AS
SELECT max(ct.created_at) AS lcon,
       ct.steamid,
       ct.name,
       vls.ping,
       vls.health,
       vls.currentlevel,
       vls.unspentxp,
       vls.violationlevel,
       vls.ip,
       vls.ownersteamid
FROM CONNECT ct
JOIN "vLastStats" vls ON ct.steamid = vls.steamid
WHERE ct.disconnect = TRUE
  AND ct.steamid NOT IN
    (SELECT steamid
     FROM "vConnectedPlayers")
  AND ct.created_at > (now() - interval '24 hour')
GROUP BY ct.steamid,
         ct.name,
         vls.ping,
         vls.health,
         vls.currentlevel,
         vls.unspentxp,
         vls.violationlevel,
         vls.ip,
         vls.ownersteamid,
         vls.created_at
ORDER BY vls.created_at DESC;


ALTER TABLE public."vRecentlyConnected" OWNER TO rustbot;



CREATE OR REPLACE VIEW public."vKillerStats" AS
SELECT killer_steamid,
       killer_name,
       COUNT(CASE WHEN pvp THEN 1 END) AS pvp,
       COUNT(CASE WHEN sleeper THEN 1 END) AS sleeper,
       COUNT(CASE WHEN died THEN 1 END) AS died,
       COUNT(CASE WHEN killed THEN 1 END) AS killed
FROM death
WHERE created_at > (now() - '24:00:00'::interval)
GROUP BY killer_steamid,
         killer_name;


ALTER TABLE public."vKillerStats" OWNER TO rustbot;


CREATE OR REPLACE VIEW public."vDeathStats" AS
SELECT victim_steamid,
       victim_name,
       COUNT(pvp) AS pvp,
       COUNT(sleeper) AS sleeper,
       COUNT(died) + COUNT(killed) AS died,
       COUNT(suicide) AS suicided
FROM death
WHERE created_at > (now() - '24:00:00'::interval)
GROUP BY victim_steamid,
         victim_name;


ALTER TABLE public."vDeathStats" OWNER TO rustbot;

