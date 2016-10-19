

DECLARE
	summation int;

BEGIN


SELECT SUM(ch."Change")


FROM (SELECT
CASE WHEN (
(lag(connect = FALSE) OVER (ORDER BY data_time))
AND
((data_time - interval '15 minutes') > lag(data_time) OVER (ORDER BY data_time))
) THEN 0 ELSE (value - lag(value) OVER (ORDER BY data_time)) END AS "Change"
FROM view_stats_audit
WHERE stat = pstat
AND steamid = psteamid
ORDER BY stat, steamid, data_time) ch into summation;

IF (summation ISNULL) THEN 
	RETURN 0;
ELSE 
	RETURN summation;
END IF;



END;



--VIEW
 SELECT ssa.created_at AS data_time,
    ssa.connect,
    ssa.steamid,
    st.name AS stat,
    st.value
   FROM steamstats_audit ssa,
    LATERAL jsonb_populate_recordset(NULL::death_type, (ssa.stats -> 'stats'::text)) st(name, value)
  ORDER BY ssa.steamid, st.name, ssa.created_at;


--WORKING BELOW

select stats_extract(date '10/13/2016', date '10/16/2016');
SELECT * FROM STATS;

select stats_add(76561197986861802, date '2016-10-14 17:32:11.244969-07');

SELECT SUM(value)
	FROM stats
	WHERE steamid = 76561197986861802
	AND data_time = date '2016-10-14 17:32:11.244969-07';


CREATE OR REPLACE FUNCTION stats_add(psteamid int8, pstat varchar(32))
RETURNS int AS $summation$

DECLARE
	summation int;

BEGIN


SELECT SUM(ch."Change")


FROM (SELECT
CASE WHEN (
(lag(stats.connect = FALSE) OVER (ORDER BY data_time))
AND
((data_time - interval '15 minutes') > lag(stats.data_time) OVER (ORDER BY data_time))
) THEN 0 ELSE (value - lag(value) OVER (ORDER BY data_time)) END AS "Change"
FROM stats
WHERE stat = pstat
AND steamid = psteamid
ORDER BY stat, steamid, data_time) ch into summation;

IF (summation ISNULL) THEN 
	RETURN 0;
ELSE 
	RETURN summation;
END IF;



END;
$summation$ LANGUAGE plpgsql;

 DROP FUNCTION stats_add(bigint,date) ;


 INSERT INTO stats (data_time, connect, steamid, stat, value, running)

SELECT
	ssa.created_at,
	ssa.connect,
	ssa.steamid,
	st.name,
	st.value,
	0 as running
FROM
	steamstats_audit ssa,
	LATERAL jsonb_populate_recordset (NULL :: death_type, ssa.stats->'stats'::text) st
	WHERE created_at BETWEEN date '10/13/2016' AND date '10/14/2016'
	ORDER BY ssa.steamid, st.name, ssa.created_at
	

SELECT
	ssa.steamid,
	ssa.created_at,
	st.name,
	st.value

FROM
	steamstats_audit ssa,
	LATERAL jsonb_populate_recordset (NULL :: death_type, ssa.stats->'stats'::text) st
	WHERE created_at BETWEEN date '10/13/2016' AND date '10/14/2016'





DROP TABLE "public"."stats" CASCADE;
	CREATE TABLE "public"."stats" (
	"id" integer DEFAULT nextval('connect_id_seq'::regclass) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data_time" timestamp with time zone NOT NULL,
	"connect" boolean NOT NULL,
	"steamid" int8 NOT NULL,
	"stat" varchar(32) COLLATE "default" NOT NULL,
	"value" integer NOT NULL,
	"running" integer NOT NULL,
PRIMARY KEY ("id")
)
WITH (OIDS=FALSE)
;

ALTER TABLE "public"."stats" OWNER TO "rustbot";




CREATE OR REPLACE FUNCTION stats_extract(starttime date, endtime date) 
RETURNS void AS $$
BEGIN

DELETE FROM STATS
WHERE data_time BETWEEN starttime AND endtime;

INSERT INTO stats (data_time, connect, steamid, stat, value, running)

SELECT
	ssa.created_at,
	ssa.connect,
	ssa.steamid,
	st.name,
	st.value,
	0 as running
FROM
	steamstats_audit ssa,
	LATERAL jsonb_populate_recordset (NULL :: death_type, ssa.stats->'stats'::text) st
	WHERE created_at BETWEEN starttime AND endtime
	ORDER BY ssa.steamid, st.name, ssa.created_at;
	





    END;
    $$ LANGUAGE plpgsql;