DROP TABLE IF EXISTS orders CASCADE;
-- Create the order table 
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    cart_id UUID NOT NULL,
    payment JSON NOT NULL,
    delivery JSON NOT NULL,
    comments TEXT,
    status cartStatus NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_carts FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);