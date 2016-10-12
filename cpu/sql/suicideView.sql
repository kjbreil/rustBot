SELECT 
COUNT(victim_steamid),
victim_steamid,
victim_name
FROM death
WHERE created_at > (now() - interval '12 hour')
GROUP BY victim_steamid, victim_name
ORDER BY COUNT(victim_steamid) DESC

