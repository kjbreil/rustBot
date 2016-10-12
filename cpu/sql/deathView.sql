SELECT count(victim_steamid),
       victim_name,
       killer_name
FROM death
WHERE created_at > (now() - interval '36 hour')
  AND died = TRUE
GROUP BY victim_name,
         killer_name