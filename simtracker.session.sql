-- Premier vol
INSERT INTO flight_log_content (
                date,
                flight_number,
                departure,
                arrival,
                flight_time,
                aircraft_name,
                flight_log_id
        )
VALUES (
                '2024-08-14 00:00:00',
                'AF68KA',
                'LFPO',
                'LFMN',
                65,
                'A320 - F-GKXS',
                (
                        SELECT id
                        FROM flight_log
                        WHERE user_id = (
                                        SELECT id
                                        FROM users
                                        WHERE email = 'admin@admin.fr'
                                )
                )
        );
-- Deuxième vol
INSERT INTO flight_log_content (
                date,
                flight_number,
                departure,
                arrival,
                flight_time,
                aircraft_name,
                flight_log_id
        )
VALUES (
                '2024-08-15 00:00:00',
                'AF85FQ',
                'LFMN',
                'LFPO',
                75,
                'A320 - F-GKXS',
                (
                        SELECT id
                        FROM flight_log
                        WHERE user_id = (
                                        SELECT id
                                        FROM users
                                        WHERE email = 'admin@admin.fr'
                                )
                )
        );