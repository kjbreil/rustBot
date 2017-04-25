
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