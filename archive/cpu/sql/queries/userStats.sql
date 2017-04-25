SELECT 
vls."steamid" as "steamid",
SUM(CASE WHEN tss."name" = 'harvest.wood' THEN tss."value" ELSE 0 END) as "wood",
SUM(CASE WHEN tss."name" = 'harvest.stones' THEN tss."value" ELSE 0 END) as "stones",
SUM(CASE WHEN tss."name" = 'harvest.cloth' THEN tss."value" ELSE 0 END) as "cloth",
SUM(CASE WHEN tss."name" like 'harvest.%' THEN tss."value" ELSE 0 END) as "harvest_total",
SUM(CASE WHEN tss."name" = 'item_drop' THEN tss."value" ELSE 0 END) as "items_dropped",
SUM(CASE WHEN tss."name" = 'bullet_fired' THEN tss."value" ELSE 0 END) as "bullet_fired",
SUM(CASE WHEN tss."name" like 'bullet_hit_%' THEN tss."value" ELSE 0 END) as "bullet_hit",
SUM(CASE WHEN tss."name" = 'arrow_fired' THEN tss."value" ELSE 0 END) as "arrow_fired",
SUM(CASE WHEN tss."name" like 'arrow_hit_%' THEN tss."value" ELSE 0 END) as "arrow_hit",
SUM(CASE WHEN tss."name" like 'deaths' THEN tss."value" ELSE 0 END) as "deaths",
SUM(CASE WHEN tss."name" like 'wounded' THEN tss."value" ELSE 0 END) as "wounded"

FROM "vLastStats" vls
JOIN "tempSteamStats24" tss ON vls.steamid = tss.steamid
WHERE vls.NAME NOTNULL
GROUP BY 1