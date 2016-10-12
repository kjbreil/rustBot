SELECT DISTINCT ON (steamid) TO_CHAR(created_at, 'MM/DD/YY HH24:MI:SS'),
                             created_at,
                             steamid,
                             name,
                             ping,
                             health,
                             currentlevel,
                             unspentxp,
                             violationlevel,
                             ownersteamid,
                             ip
FROM playerlist
ORDER BY steamid,
         created_at DESC