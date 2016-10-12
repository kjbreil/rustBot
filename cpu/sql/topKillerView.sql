SELECT 
count(killer_name),
killer_name
FROM death
WHERE created_at > (now() - interval '12 hour')
AND killed = true
AND pvp is null
GROUP BY killer_name

