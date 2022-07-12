-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2022 at 05:04 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentsForm`
--

-- --------------------------------------------------------

--
-- Table structure for table `students_table`
--

CREATE TABLE `students_table` (
  `id` int NOT NULL,
  `fullName` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `department` text NOT NULL,
  `dateOfBirth` text NOT NULL,
  `projectName` text NOT NULL,
  `projectSubmit` text NOT NULL,
  `vaccinationFirstDose` text,
  `vaccinationSecondDose` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students_table`
--

INSERT INTO `students_table` (`id`, `fullName`, `email`, `phone`, `department`, `dateOfBirth`, `projectName`, `projectSubmit`, `vaccinationFirstDose`, `vaccinationSecondDose`) VALUES
(73, 'Thornton ', 'tharbage2@dailymotion.com', '3622431222', 'Research and Development', '2021-03-21 23:38:18', 'Alphazap', 'yes', '0', '1'),
(74, 'Myca Santoro', 'msantoro3@smh.com.au', '1753674454', 'Sales', '2020-11-05 19:32:16', 'Sonair', 'yes', '1', '1'),
(75, 'Tonya Montrose', 'tmontrose4@tmall.com', '6537919546', 'Accounting', '2021-08-12 05:23:42', 'Solarbreeze', 'yes', '0', '1'),
(76, 'Heloise Clell', 'hclell5@europa.eu', '3716036618', 'Sales', '2021-10-31 01:36:26', 'Quo Lux', 'yes', '0', '1'),
(77, 'Holli Arends', 'harends6@newyorker.com', '2111726283', 'Support', '2021-06-26 19:50:32', 'Cardguard', 'yes', '0', '1'),
(78, 'Norby Penny', 'npenny7@arstechnica.com', '8154865217', 'Marketing', '2021-12-06 09:18:51', 'Tampflex', 'yes', '1', '0'),
(79, 'Gisella Reicherz', 'greicherz8@fda.gov', '3016429035', 'Services', '2022-01-21 11:34:32', 'Alphazap', 'yes', '1', '0'),
(80, 'Brynna Haggith', 'bhaggith9@cargocollective.com', '1918400750', 'Training', '2021-10-02 14:52:10', 'Sonsing', 'yes', '1', '1'),
(81, 'Eydie Wippermann', 'ewippermanna@usa.gov', '6453959422', 'Human Resources', '2022-04-10 03:48:29', 'Alphazap', 'yes', '0', '1'),
(82, 'Orsola Blackstock', 'oblackstockb@nhs.uk', '4142658748', 'Accounting', '2021-10-28 23:31:12', 'Job', 'yes', '1', '0'),
(84, 'Ag Troy', 'atroyd@freewebs.com', '3992262519', 'Sales', '2022-03-14 23:16:39', 'Tresom', 'yes', '1', '0'),
(85, 'Gaspar Starford', 'gstarforde@elegantthemes.com', '4167413202', 'Sales', '2021-09-16 23:22:47', 'Hatity', 'yes', '1', '1'),
(86, 'Cornelia Riehm', 'criehmf@time.com', '8271408151', 'Business Development', '2022-05-02 18:26:55', 'Domainer', 'yes', '1', '0'),
(87, 'Brigida Ledgerton', 'bledgertong@taobao.com', '6589512473', 'Human Resources', '2021-07-31 04:11:14', 'Cardify', 'yes', '0', '1'),
(88, 'Gilbertina Blasetti', 'gblasettih@dropbox.com', '7746904370', 'Marketing', '2020-11-03 05:32:44', 'Stringtough', 'yes', '1', '1'),
(89, 'Nelie Dowley', 'ndowleyi@columbia.edu', '8935388079', 'Sales', '2021-11-29 00:57:25', 'Cookley', 'yes', '0', '1'),
(90, 'Estel Wheatland', 'ewheatlandj@a8.net', '6324918238', 'Accounting', '2021-03-08 17:40:16', 'Y-Solowarm', 'yes', '1', '1'),
(91, 'zzzz', 'kartim316@gmail.com', '0967727584', 'Electronics and Communication Engineering', '06/27/2022', 'todo', 'yes', '1', '1'),
(92, '1', 'kartim316@gmail.com', '0967727584', 'Electronics and Communication Engineering', '06/27/2022', 'asd', 'yes', '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students_table`
--
ALTER TABLE `students_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students_table`
--
ALTER TABLE `students_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
