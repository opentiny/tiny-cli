INSERT INTO registeruser
VALUES (
        null,
        'admin@example.com',
        '$2b$10$W2NoJWWldrv4ksIalH7po.4vsczt3TlP8SepiEVNEanXzYTIxnIVu',
        'email'
    );

INSERT INTO userinfo
VALUES (
        null,
        (SELECT id
        FROM registeruser
        WHERE
            user_name = 'admin@example.com')

,
'admin@example.com',
'Tiny-Vue-Pro',
'social recruitment',
'admin',
'2023-06-01',
'2023-09-30',
'90',
'2023-06-01',
'2026-06-01',
'beijing',
'1',
'Front end'
)