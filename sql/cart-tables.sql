DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TYPE IF EXISTS cartStatus;
CREATE TYPE cartStatus AS ENUM ('OPEN', 'ORDERED');
-- Create the carts and cart_items tables
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status cartStatus NOT NULL DEFAULT 'OPEN', 
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    count INTEGER NOT NULL CHECK (count > 0),
    CONSTRAINT pk_cart_items PRIMARY KEY(cart_id, product_id),
    CONSTRAINT fk_carts FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);