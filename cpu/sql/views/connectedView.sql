-- connectedView.sql

SELECT ct.created_at,
       lc.steamid AS SteamId,
       ct.name
FROM CONNECT ct
JOIN
  (SELECT steamid,
          max(id) AS id
   FROM CONNECT
   GROUP BY steamid) lc ON lc.id = ct.id
WHERE CONNECT IS TRUE
ORDER BY created_at DESC