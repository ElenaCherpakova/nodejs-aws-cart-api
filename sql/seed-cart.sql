-- Fill the carts and cart_items tables with data

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
    ('bc56762b-c286-4ce3-a39a-8ccb3c7c1d21', '17f87602-3c9f-4ac4-9368-0c169f5776b2', '2024-07-24', '2024-07-25', 'OPEN'),
    ('d3335d33-e531-4592-8244-c2e97c3d90bc', '5433f7d9-824e-479d-b200-3f11b081aac2', '2024-06-24', '2024-06-25', 'OPEN');


INSERT INTO cart_items (cart_id, product_id, count)
VALUES 
    ('bc56762b-c286-4ce3-a39a-8ccb3c7c1d21', uuid_generate_v4(), 2),
    ('d3335d33-e531-4592-8244-c2e97c3d90bc', uuid_generate_v4(), 3);
