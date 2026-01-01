<?php
require_once __DIR__ . '/../config/db.php';

try {
    // Clear existing data (optional, but good for idempotent runs)
    // Disable foreign key checks to allow truncation
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    $pdo->exec("TRUNCATE TABLE order_items");
    $pdo->exec("TRUNCATE TABLE orders");
    $pdo->exec("TRUNCATE TABLE cart_items");
    $pdo->exec("TRUNCATE TABLE reviews");
    $pdo->exec("TRUNCATE TABLE product_images");
    $pdo->exec("TRUNCATE TABLE products");
    $pdo->exec("TRUNCATE TABLE sellers");
    $pdo->exec("TRUNCATE TABLE categories");
    $pdo->exec("TRUNCATE TABLE users");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    echo "Tables cleared.\n";

    // 1. Users
    // Password is 'password' hashed
    $password_hash = password_hash('password', PASSWORD_DEFAULT);
    
    $users = [
        ['john_doe', 'john@example.com', $password_hash, 0],
        ['jane_seller', 'jane@example.com', $password_hash, 1],
        ['bob_builder', 'bob@example.com', $password_hash, 1],
    ];

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, is_seller) VALUES (?, ?, ?, ?)");
    foreach ($users as $user) {
        $stmt->execute($user);
    }
    echo "Users seeded.\n";

    // Get User IDs
    $stmt = $pdo->query("SELECT username, id FROM users");
    $user_map = $stmt->fetchAll(PDO::FETCH_KEY_PAIR); // username => id
    
    // 2. Sellers
    $sellers = [
        [$user_map['jane_seller'], 'I make lovely handmade jewelry.', 4.5],
        [$user_map['bob_builder'], 'Woodworking expert.', 4.8],
    ];

    $stmt = $pdo->prepare("INSERT INTO sellers (user_id, bio, rating) VALUES (?, ?, ?)");
    foreach ($sellers as $seller) {
        $stmt->execute($seller);
    }
    echo "Sellers seeded.\n";
    
    // Get Seller IDs
    $stmt = $pdo->query("SELECT user_id, seller_id FROM sellers");
    $seller_map = $stmt->fetchAll(PDO::FETCH_KEY_PAIR); // user_id => seller_id

    // 3. Categories
    $categories = [
        ['Jewelry', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', 'Handcrafted rings, necklaces, and more'],
        ['Home Decor', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500', 'Beautiful items for your home'],
        ['Art', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500', 'Paintings, prints, and digital art'],
        ['Clothing', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500', 'Unique fashion pieces'],
    ];

    $stmt = $pdo->prepare("INSERT INTO categories (name, image, subtitle) VALUES (?, ?, ?)");
    foreach ($categories as $cat) {
        $stmt->execute($cat);
    }
    echo "Categories seeded.\n";

    // Get Category IDs
    $stmt = $pdo->query("SELECT name, id FROM categories");
    $cat_map = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    // 4. Products
    $products = [
        [
            'seller_id' => $seller_map[$user_map['jane_seller']],
            'category_id' => $cat_map['Jewelry'],
            'title' => 'Silver Moon Necklace',
            'description' => 'A delicate silver chain with a crescent moon pendant.',
            'price' => 45.00,
            'stock_quantity' => 10,
            'image' => 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=500'
        ],
        [
            'seller_id' => $seller_map[$user_map['jane_seller']],
            'category_id' => $cat_map['Jewelry'],
            'title' => 'Gold Hoop Earrings',
            'description' => 'Classic 14k gold plated hoops.',
            'price' => 30.00,
            'stock_quantity' => 25,
            'image' => 'https://images.unsplash.com/photo-1635767798638-3e2523c01e39?w=500'
        ],
        [
            'seller_id' => $seller_map[$user_map['bob_builder']],
            'category_id' => $cat_map['Home Decor'],
            'title' => 'Oak Coffee Table',
            'description' => 'Handcrafted solid oak coffee table with rustic finish.',
            'price' => 250.00,
            'stock_quantity' => 2,
            'image' => 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500'
        ],
        [
            'seller_id' => $seller_map[$user_map['bob_builder']],
            'category_id' => $cat_map['Art'],
            'title' => 'Abstract Canvas Print',
            'description' => 'Colorful abstract art for your living room.',
            'price' => 85.00,
            'stock_quantity' => 50,
            'image' => 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500'
        ]
    ];

    $stmt_prod = $pdo->prepare("INSERT INTO products (seller_id, category_id, title, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt_img = $pdo->prepare("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)");

    foreach ($products as $prod) {
        $stmt_prod->execute([
            $prod['seller_id'],
            $prod['category_id'],
            $prod['title'],
            $prod['description'],
            $prod['price'],
            $prod['stock_quantity']
        ]);
        $product_id = $pdo->lastInsertId();
        
        $stmt_img->execute([$product_id, $prod['image']]);
    }
    echo "Products seeded.\n";
    
    echo "Database seeded successfully!\n";

} catch (PDOException $e) {
    die("Seeding Error: " . $e->getMessage());
}
