-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2025 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `billing_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(7, 'Men Products'),
(8, 'Women\'s Purfume'),
(9, 'Soft Drinks'),
(10, 'NNNNNN'),
(11, 'ggggggg');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`) VALUES
(1, 'sujoy garai', 'sujoygaraikolkata@gmail.com', '123456789', 'Town school\r\n12/1 A'),
(3, 'Uday Garai', 'test@test.com', '9874892645', 'eeee'),
(4, 'Sujoy Chand Garai ', 'sujoygaraikolkata@gmail.com', '9874892612', 'Shyambazer'),
(5, 'Udat ff', 'Uday@ttttt.com', '66666', NULL),
(6, 'gggg', 'fff@fff.com', '4567', NULL),
(7, 'fffffff', 'f@gmail.com', '77899', NULL),
(8, 'ggg', 'gg@test.com', '333333', NULL),
(10, 'test', 'test@gmail.com', '56787', 'USA'),
(13, 'Sanjoy garai', 'sanjoy@gmail.com', '1234567890', 'rrrrr'),
(14, 'Amit ', 'amit@gmail.com', '897564523', 'Howrah'),
(15, 'Susama Garai', 'susamagaraikolkata@gmail.com', '9874821458', '12/1 A Ganendro Mitro Lane');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `category_id`, `image`) VALUES
(1, 'test ggg', 342.00, 23, 7, '1753166294205-img-3.jpg'),
(2, 'sujoy garai', 120.00, 0, 8, '1753166237020-img-1.png'),
(3, 'Sport Goods', 12.00, 0, 7, '1753166226930-img-2.png'),
(4, 'ggggg', 344.00, 0, 8, '1753166501061-img-3.jpg'),
(5, 'product', 65.00, 49, 8, '1753166178459-img-5.jpg'),
(6, 'dddd', 33.00, 875, 8, '1753166170041-img-1.png'),
(7, 'ddd', 234.00, 0, 7, '1753166162880-img-4.jpg'),
(8, 'New Product', 34.00, 3424, 7, '1753178547273-img-3.jpg'),
(9, 'Fruites', 66.00, NULL, 9, '1753181534728-img-2.png'),
(10, 'vvv', 55.00, NULL, 8, '1753181527430-img-3.jpg'),
(11, 'admin', 666.00, NULL, 7, '1753181519375-img-5.jpg'),
(12, 'jjjjj1', 89.00, NULL, 7, '1755072375931-avatar7.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_suppliers`
--

CREATE TABLE `product_suppliers` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `invoice_image` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT curdate(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `supplier_id`, `invoice_number`, `invoice_image`, `purchase_date`, `created_at`) VALUES
(2, 5, '66', NULL, '2025-07-22', '2025-07-22 10:32:52'),
(3, 5, ' 67', NULL, '2025-07-22', '2025-07-22 10:38:52'),
(4, 5, '9900', '1753181803990-img-5.jpg', '2025-07-22', '2025-07-22 10:56:44'),
(5, 5, '1223', NULL, '2025-08-08', '2025-08-08 12:38:05');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_items`
--

CREATE TABLE `purchase_items` (
  `id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `purchase_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_items`
--

INSERT INTO `purchase_items` (`id`, `purchase_id`, `product_id`, `quantity`, `purchase_price`) VALUES
(4, 3, 1, 23, 65.00),
(5, 3, 5, 55, 45.00),
(6, 3, 6, 777, 88.00),
(7, 4, 6, 99, 89.00),
(8, 5, 8, 3424, 78.00);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `total_qty` int(11) NOT NULL,
  `payment_mode` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `date`, `customer_id`, `total`, `total_qty`, `payment_mode`) VALUES
(10, '2025-07-16 15:36:31', 3, 476.00, 3, NULL),
(11, '2025-07-16 16:27:01', 4, 1624.00, 7, NULL),
(12, '2025-07-16 19:06:45', 3, 33.00, 1, NULL),
(13, '2025-07-16 19:09:18', 4, 1406.00, 16, NULL),
(14, '2025-07-17 09:07:06', 14, 1007.00, 9, NULL),
(15, '2025-07-17 09:28:57', 4, 555.00, 11, NULL),
(16, '2025-07-17 09:31:31', 3, 2517.00, 53, NULL),
(17, '2025-07-17 10:06:43', 5, 65.00, 1, NULL),
(18, '2025-07-17 12:50:11', 3, 33.00, 1, NULL),
(19, '2025-07-17 12:53:44', 3, 98.00, 2, NULL),
(20, '2025-07-17 12:56:19', 5, 33.00, 1, NULL),
(21, '2025-07-17 13:08:57', 4, 98.00, 2, NULL),
(22, '2025-07-17 13:18:04', 5, 33.00, 1, NULL),
(23, '2025-07-17 13:24:02', 6, 98.00, 2, NULL),
(24, '2025-07-17 13:41:27', 5, 916.00, 6, NULL),
(25, '2025-07-17 13:54:22', 3, 33.00, 1, NULL),
(26, '2025-07-17 14:10:37', 4, 442.00, 3, NULL),
(27, '2025-07-17 14:40:59', 3, 688.00, 2, NULL),
(28, '2025-07-17 14:58:50', 3, 132.00, 2, NULL),
(29, '2025-07-17 15:22:44', 4, 0.00, 0, NULL),
(30, '2025-07-17 15:23:37', 3, 0.00, 0, NULL),
(31, '2025-07-18 15:27:40', 4, 462.00, 2, NULL),
(32, '2025-07-19 11:08:29', 4, 3973.00, 26, NULL),
(33, '2025-07-19 11:10:46', 5, 551.00, 5, NULL),
(34, '2025-07-20 17:54:05', 6, 77.00, 2, NULL),
(35, '2025-07-22 22:27:01', 6, 98.00, 2, NULL),
(36, '2025-08-06 18:34:38', 3, 325.00, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale_items`
--

INSERT INTO `sale_items` (`id`, `sale_id`, `product_id`, `quantity`, `price`) VALUES
(30, 10, 2, 1, 120.00),
(31, 10, 3, 1, 12.00),
(32, 10, 4, 1, 344.00),
(33, 11, 1, 2, 342.00),
(34, 11, 2, 2, 120.00),
(35, 11, 3, 1, 12.00),
(36, 11, 4, 2, 344.00),
(37, 12, 6, 1, 33.00),
(38, 13, 1, 1, 342.00),
(39, 13, 2, 1, 120.00),
(40, 13, 3, 1, 12.00),
(41, 13, 4, 1, 344.00),
(42, 13, 5, 6, 65.00),
(43, 13, 6, 6, 33.00),
(44, 14, 2, 1, 120.00),
(45, 14, 3, 3, 12.00),
(46, 14, 4, 2, 344.00),
(47, 14, 5, 2, 65.00),
(48, 14, 6, 1, 33.00),
(49, 15, 5, 6, 65.00),
(50, 15, 6, 5, 33.00),
(51, 16, 5, 24, 65.00),
(52, 16, 6, 29, 33.00),
(53, 17, 5, 1, 65.00),
(54, 18, 6, 1, 33.00),
(55, 19, 5, 1, 65.00),
(56, 19, 6, 1, 33.00),
(57, 20, 6, 1, 33.00),
(58, 21, 5, 1, 65.00),
(59, 21, 6, 1, 33.00),
(60, 22, 6, 1, 33.00),
(61, 23, 5, 1, 65.00),
(62, 23, 6, 1, 33.00),
(63, 24, 1, 1, 342.00),
(64, 24, 2, 1, 120.00),
(65, 24, 3, 1, 12.00),
(66, 24, 4, 1, 344.00),
(67, 24, 5, 1, 65.00),
(68, 24, 6, 1, 33.00),
(69, 25, 6, 1, 33.00),
(70, 26, 4, 1, 344.00),
(71, 26, 5, 1, 65.00),
(72, 26, 6, 1, 33.00),
(73, 27, 4, 2, 344.00),
(74, 28, 2, 1, 120.00),
(75, 28, 3, 1, 12.00),
(76, 31, 1, 1, 342.00),
(77, 31, 2, 1, 120.00),
(78, 32, 1, 8, 342.00),
(79, 32, 2, 7, 120.00),
(80, 32, 3, 6, 12.00),
(81, 32, 5, 5, 65.00),
(82, 33, 1, 1, 342.00),
(83, 33, 2, 1, 120.00),
(84, 33, 3, 2, 12.00),
(85, 33, 5, 1, 65.00),
(86, 34, 3, 1, 12.00),
(87, 34, 5, 1, 65.00),
(88, 35, 5, 1, 65.00),
(89, 35, 6, 1, 33.00),
(90, 36, 5, 5, 65.00);

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `site_name` varchar(255) DEFAULT NULL,
  `site_email` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `site_name`, `site_email`, `logo`) VALUES
(1, 'POS System', 'admin@admin.com', '1755073785526_avatar7.png');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `phone`, `address`, `created_at`) VALUES
(5, 'Uday Garai', 'uday@gmail.com', '34567', 'sadsd', '2025-07-18 08:47:43'),
(6, 'Amit', 'amit@gmail.com', '123456789', 'Toen school\r\n12/1 A', '2025-07-22 11:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','cashier','accountant') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Admin', 'admin@admin.com', '$2b$10$SWVY03.u42i1XxHleHl82e28zr4EsPIBbXofsxmSH7m5uapzODNU.', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_suppliers`
--
ALTER TABLE `product_suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_suppliers`
--
ALTER TABLE `product_suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_suppliers`
--
ALTER TABLE `product_suppliers`
  ADD CONSTRAINT `product_suppliers_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_suppliers_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
