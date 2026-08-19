CREATE TABLE `products` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`price` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sale_items` (
	`id` text PRIMARY KEY,
	`sale_id` text NOT NULL,
	`product_id` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	CONSTRAINT `fk_sale_items_sale_id_sales_id_fk` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_sale_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` text PRIMARY KEY,
	`total` real NOT NULL,
	`created_at` text NOT NULL
);
