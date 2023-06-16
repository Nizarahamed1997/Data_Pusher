-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2023 at 01:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DataPusher`
--

-- --------------------------------------------------------

--
-- Table structure for table `Accounts`
--

CREATE TABLE `Accounts` (
  `Id` int(11) NOT NULL,
  `AccountId` binary(16) NOT NULL,
  `AppSecretId` binary(16) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Website` varchar(50) DEFAULT NULL,
  `IsActive` tinyint(4) NOT NULL,
  `InsertUtc` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdateUtc` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Accounts`
--

INSERT INTO `Accounts` (`Id`, `AccountId`, `AppSecretId`, `Name`, `Email`, `Website`, `IsActive`, `InsertUtc`, `UpdateUtc`) VALUES
(1, 0x3767122a0c3111ee855e28d244d1c460, 0x376712700c3111ee855e28d244d1c460, 'Sam\'s Account', 'sam.john@account1.com', 'https://www.account2.com', 1, '2023-06-16 16:03:23', '2023-06-16 16:03:23'),
(2, 0x449f7c2d0c3111ee855e28d244d1c460, 0x449f7c5d0c3111ee855e28d244d1c460, 'Doe\'s Account', 'doe.john@account1.com', 'https://www.account3.com', 1, '2023-06-16 16:03:46', '2023-06-16 16:03:46');

-- --------------------------------------------------------

--
-- Table structure for table `Datas`
--

CREATE TABLE `Datas` (
  `Id` int(11) NOT NULL,
  `Data` text NOT NULL,
  `FK_DestId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Datas`
--

INSERT INTO `Datas` (`Id`, `Data`, `FK_DestId`) VALUES
(1, '{\"name\":\"Doe\",\"age\":43}', 1),
(2, '{\"name\":\"Doe\",\"age\":43}', 2),
(5, '{\"name\":\"Sam\",\"age\":23}', 3),
(6, '{\"name\":\"Sam\",\"age\":23}', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Destinations`
--

CREATE TABLE `Destinations` (
  `Id` int(11) NOT NULL,
  `Url` varchar(100) NOT NULL,
  `Method` varchar(10) NOT NULL,
  `Headers` text NOT NULL,
  `FK_AccountId` binary(16) NOT NULL,
  `InsertUtc` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdateUtc` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Destinations`
--

INSERT INTO `Destinations` (`Id`, `Url`, `Method`, `Headers`, `FK_AccountId`, `InsertUtc`, `UpdateUtc`) VALUES
(1, 'http://localhost:9120/api/destinations/1', 'POST', '{\"APP_ID\":\"1234APPID1234\",\"APP_SECRET\":\"enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s\",\"ACTION\":\"user.update\",\"Content-Type\":\"application/json\",\"Accept\":\"*/*\"}', 0x449f7c2d0c3111ee855e28d244d1c460, '2023-06-16 16:04:31', '2023-06-16 16:04:31'),
(2, 'http://localhost:9120/api/destinations/2', 'POST', '{\"APP_ID\":\"1234APPID1234\",\"APP_SECRET\":\"enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s\",\"ACTION\":\"user.update\",\"Content-Type\":\"application/json\",\"Accept\":\"*/*\"}', 0x449f7c2d0c3111ee855e28d244d1c460, '2023-06-16 16:04:38', '2023-06-16 16:04:38'),
(3, 'http://localhost:9120/api/destinations/3', 'POST', '{\"APP_ID\":\"1234APPID1234\",\"APP_SECRET\":\"enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s\",\"ACTION\":\"user.update\",\"Content-Type\":\"application/json\",\"Accept\":\"*/*\"}', 0x3767122a0c3111ee855e28d244d1c460, '2023-06-16 16:07:48', '2023-06-16 16:07:48'),
(4, 'http://localhost:9120/api/destinations/4', 'POST', '{\"APP_ID\":\"1234APPID1234\",\"APP_SECRET\":\"enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s\",\"ACTION\":\"user.update\",\"Content-Type\":\"application/json\",\"Accept\":\"*/*\"}', 0x3767122a0c3111ee855e28d244d1c460, '2023-06-16 16:07:52', '2023-06-16 16:07:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Accounts`
--
ALTER TABLE `Accounts`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Datas`
--
ALTER TABLE `Datas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Destinations`
--
ALTER TABLE `Destinations`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Accounts`
--
ALTER TABLE `Accounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Datas`
--
ALTER TABLE `Datas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Destinations`
--
ALTER TABLE `Destinations`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
