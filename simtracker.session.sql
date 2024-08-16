--Data dev
-- Premier vol
INSERT INTO flight_log_content (
        flight_log_id,
        date,
        flight_number,
        departure,
        arrival,
        alt,
        flight_time,
        aircraft_name
    )
VALUES (
        (
            SELECT id
            FROM flight_log
            WHERE user_id = (
                    SELECT id
                    FROM users
                    WHERE email = 'admin@admin.fr'
                )
        ),
        '2024-08-14 00:00:00',
        'AF68KA',
        'LFPO',
        'LFMN',
        NULL,
        65,
        'A320 - F-GKXS'
    );
-- Deuxième vol
INSERT INTO flight_log_content (
        flight_log_id,
        date,
        flight_number,
        departure,
        arrival,
        alt,
        flight_time,
        aircraft_name
    )
VALUES (
        (
            SELECT id
            FROM flight_log
            WHERE user_id = (
                    SELECT id
                    FROM users
                    WHERE email = 'admin@admin.fr'
                )
        ),
        '2024-08-15 00:00:00',
        'AF85FQ',
        'LFMN',
        'LFPO',
        NULL,
        75,
        'A320 - F-GKXS'
    );