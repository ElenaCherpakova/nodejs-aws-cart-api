-- Fill the order table with data
INSERT INTO orders (
        user_id,
        cart_id,
        payment,
        delivery,
        comments,
        status,
        total
    )
VALUES (
        '17f87602-3c9f-4ac4-9368-0c169f5776b2',
        'bc56762b-c286-4ce3-a39a-8ccb3c7c1d21',
        '{"type": "credit card", "card": "1234-5678-9012-3456"}',
        '{"address": "1234 Main St, NY, USA"}',
        'Please deliver before 5pm',
        'ORDERED',
        40.00
    ),
    (
        '5433f7d9-824e-479d-b200-3f11b081aac2',
        'd3335d33-e531-4592-8244-c2e97c3d90bc',
        '{"type": "cash", "amount": 50.00}',
        '{"address": "567 Elm St, Chicago, USA"}',
        'Please deliver after 5pm',
        'ORDERED',
        50.00
    );