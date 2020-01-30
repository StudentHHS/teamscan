-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:56875
-- Generation Time: Jan 29, 2020 at 04:06 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hhs-teamscan`
--

-- --------------------------------------------------------

--
-- Table structure for table `antwoorden`
--

CREATE TABLE `antwoorden` (
  `id` int(11) NOT NULL,
  `antwoord` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `antwoord_kort` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dimensie_id` int(11) NOT NULL,
  `fase_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `antwoorden`
--

INSERT INTO `antwoorden` (`id`, `antwoord`, `antwoord_kort`, `dimensie_id`, `fase_id`) VALUES
(1, 'Kwaliteit kan sterk verschillen per medewerker en is afhankelijk van diens persoonlijke opvattingen en competenties.', 'Kwaliteiten verschillen en zijn afhankelijk van persoonlijke opvattingen en competenties.', 1, 1),
(2, 'Medewerkers stemmen binnen het team taken op elkaar af.', 'Medewerkers stemmen binnen het team taken op elkaar af.', 1, 2),
(3, 'Medewerkers coachen elkaar en geven elkaar feedback op hun taken conform gestelde doelen.', 'Medewerkers coachen elkaar en geven feedback.', 1, 3),
(4, 'Team organiseert feedback van belanghebbenden en gebruikt dit om de kwaliteit van het werk te verhogen.', 'Feedback wordt gebruikt om de kwaliteit te verhogen.', 1, 4),
(5, 'Werkzaamheden worden vooral verdeeld door manager en/of roosteraar, waarbij rekening wordt gehouden met individuele wensen.', 'Werkzaamheden worden vooral verdeeld door manager en/of roosteraar die rekening houdt met ieders wensen.', 2, 1),
(6, 'Collegas hebben onderling overleg over de verdeling van de werkzaamheden; uiteindelijk worden deze verdeeld door manager en/of roosteraar.', 'Over de verdeling wordt overlegd maar worden verdeeld door manager en/of roosteraar.', 2, 2),
(7, 'Werkzaamheden worden in principe verdeeld binnen het team; meningsverschillen worden beslecht door de manager.', 'Wordt verdeeld binnen het team, onenigheid wordt afgehandeld door manager.', 2, 3),
(8, 'Werkzaamheden worden verdeeld door en binnen het team, rekening houdend met de beschikbare middelen.', 'Werkzaamheden worden verdeeld door en binnen het team, rekening houdend met de beschikbare middelen.', 2, 4),
(9, 'Regeltaken die het team aangaan, worden in niet meer dan 20% door het team verricht (en meestal door een manager).', 'Regeltaken die het team aangaan, worden in niet meer dan 20% door het team verricht (en meestal door een manager).', 3, 1),
(10, 'Regeltaken die het team aangaan, worden meestal door het team verricht.', 'Regeltaken die het team aangaan, worden meestal door het team verricht.', 3, 2),
(11, 'Teamleden geven elkaar feedback en coachen elkaar met betrekking tot regeltaken.', 'Teamleden geven elkaar feedback en coachen elkaar met betrekking tot regeltaken.', 3, 3),
(12, 'Het team onderhandelt zelf met andere teams van binnen en buiten de eigen organisatie over regeltaken.', 'Het team onderhandelt zelf met andere teams van binnen en buiten de eigen organisatie over regeltaken.', 3, 4),
(13, 'Manager zorgt voor regelmatig teamoverleg.', 'Manager zorgt voor regelmatig teamoverleg.', 4, 1),
(14, 'Team zorgt zelf voor teamoverleg.', 'Team zorgt zelf voor teamoverleg.', 4, 2),
(15, 'Team verbetert het teamoverleg.', 'Team verbetert het teamoverleg.', 4, 3),
(16, 'Team organiseert het overleg met individuen en andere teams van binnen en buiten de organisatie.', 'Team organiseert het overleg met individuen en andere teams van binnen en buiten de organisatie.', 4, 4),
(17, 'Besluitvorming ligt grotendeels bij de manager.', 'Besluitvorming ligt grotendeels bij de manager.', 5, 1),
(18, 'Teamleden doen actief mee in besluitvorming.', 'Teamleden doen actief mee in besluitvorming.', 5, 2),
(19, 'Besluiten worden door het team zelfstandig genomen, geëvalueerd en aangepast.', 'Besluiten worden door het team zelfstandig genomen, geëvalueerd en aangepast.', 5, 3),
(20, 'Team beslist zelfstandig over noodzakelijke verbetereingen in de samenwerking met externen.', 'Team beslist zelfstandig over noodzakelijke verbetereingen in de samenwerking met externen.', 5, 4),
(21, 'Rollen en taakverdeling binnen het team zijn duidelijk; teamspelregels (hoe gaan we met elkaar om) zijn nog vaag.', 'Rollen en taakverdeling binnen het team zijn duidelijk; teamspelregels (hoe gaan we met elkaar om) zijn nog vaag.', 6, 1),
(22, 'Rollen en taakverdeling rouleren onder teamleden; teamspelregels zijn duidelijk en worden door allen onderschreven.', 'Rollen en taakverdeling rouleren onder teamleden; teamspelregels zijn duidelijk en worden door allen onderschreven.', 6, 2),
(23, 'Teamleden spreken elkaar aan op ongewenst gedrag; teamleden kennen en benutten elkaars kwaliteiten.', 'Teamleden spreken elkaar aan op ongewenst gedrag; ieder kent en benut elkaars kwaliteiten.', 6, 3),
(24, 'Teamleden kennen en benutten de kwaliteiten van de omgeving (zowel binnen als buiten het team).', 'Ieder kent en benut de kwaliteiten van de omgeving (zowel binnen als buiten het team).', 6, 4),
(25, 'Conflicten en problemen worden met de manager besproken, de manager heeft een leidende rol bij de oplossing.', 'Conflicten en problemen worden met de manager besproken, de manager heeft een leidende rol bij de oplossing.', 7, 1),
(26, 'Conflicten en problemen worden met de manager besproken, conflicten worden gezamenlijk opgelost.', 'Conflicten en problemen worden met de manager besproken en worden gezamenlijk opgelost.', 7, 2),
(27, 'Onderlige conflicten worden door het team zelf opgelost.', 'Onderlige conflicten worden door het team zelf opgelost.', 7, 3),
(28, 'Team lost problemen en conflicten met de omgeving zelfstandig op.', 'Team lost problemen en conflicten met de omgeving zelfstandig op.', 7, 4),
(29, 'Manager maakt teamplan, teamplan is bekend bij en wordt uitgevoerd door het team.', 'Manager maakt teamplan, teamplan is bekend bij en wordt uitgevoerd door het team.', 8, 1),
(30, 'Manager maakt teamplan en vraagt team advies bij het maken van dit plan.', 'Manager maakt teamplan en vraagt team advies bij het maken van dit plan.', 8, 2),
(31, 'Teamplan, doelen en normen worden door manager in overleg met team vastgesteld.', 'Teamplan, doelen en normen worden door manager in overleg met team vastgesteld.', 8, 3),
(32, 'Team vertaalt doelen en wensen van teamleden en beroepenveld naar doelstellingen en maakt deze operationeel in teamplan.', 'Team vertaalt doelen en wensen van teamleden en beroepenveld naar doelstellingen en maakt deze operationeel in teamplan.', 8, 4),
(33, 'Teamresultaten worden aan het team teruggekoppeld door manager.', 'Teamresultaten worden aan het team teruggekoppeld door manager.', 9, 1),
(34, 'Team evalueert en beoordeelt de resultaten met de manager en komt zo nodig met verbetervoorstellen.', 'Team evalueert en beoordeelt de resultaten met de manager en komt zo nodig met verbetervoorstellen.', 9, 2),
(35, 'Team evalueert en beoordeelt de resultaten zelfstandig en komt zo nodig met vebetervoorstellen. Team kan bereikte prestatieniveau vasthouden.', 'Team evalueert en beoordeelt de resultaten zelfstandig en komt zo nodig met vebetervoorstellen. Team kan bereikte prestatieniveau vasthouden.', 9, 3),
(36, 'Team verbetert zijn prestatieniveau continu; team kenmerkt zich door ondernemerschap.', 'Team verbetert zijn prestatieniveau continu; team kenmerkt zich door ondernemerschap.', 9, 4),
(37, 'Manager bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.', 'Manager bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.', 10, 1),
(38, 'Manager en team bepalen gezamenlijk aan welke individuele en teamcompetenties gewerkt moet worden.', 'Manager en team bepalen dit gezamenlijk.', 10, 2),
(39, 'Team bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.', 'Team bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.', 10, 3),
(40, 'Omgeving heeft invloed op de keuzes van het team m.b.t. individuele en teamontwikkeling.', 'Omgeving heeft invloed op de keuzes van het team m.b.t. individuele en teamontwikkeling.', 10, 4),
(41, 'Team is in staat dagelijkse werkproblemen op te lossen.', 'Team is in staat dagelijkse werkproblemen op te lossen.', 11, 1),
(42, 'Team gaat bij het oplossen van werkproblemen dieper in op de oorzaak en reflecteert op eerdere ervaringen.', 'Team gaat bij het oplossen van werkproblemen dieper in op de oorzaak en reflecteert op eerdere ervaringen.', 11, 2),
(43, 'Team leert bij het oplossen van werkproblemen bewust van fouten uit het heden en verleden.', 'Team leert bij het oplossen van werkproblemen bewust van fouten uit het heden en verleden.', 11, 3),
(44, 'Team expliciteert het leren en deelt met teamleden en omgeving.', 'Team expliciteert het leren en deelt met teamleden en omgeving.', 11, 4),
(45, 'Team heeft geen zicht op de prestaties van de organisatie en ontvangt hierover geen management-informatie.', 'Team heeft geen zicht op de prestaties van de organisatie en ontvangt hierover geen management-informatie.', 12, 1),
(46, 'Team wordt periodiek door de manager geïnformeerd over de realisatie van de doelstellingen.', 'Team wordt periodiek door de manager geïnformeerd over de realisatie van de doelstellingen.', 12, 2),
(47, 'Team ontvangt relevante management-informatie en kan (zij het in beperkte mate) invloed uitoefenen op het behalen van de doelstellingen.', 'Team ontvangt relevante management-informatie en kan (beperkte) invloed uitoefenen op het behalen van de doelstellingen.', 12, 3),
(48, 'Team ontvangt een budget dat het volledig naar eigen inzicht in kan zetten en verantwoordt zich hier periodiek over.', 'Team ontvangt een budget dat ze volledig naar eigen inzicht in kan zetten en verantwoordt zich hier periodiek over.', 12, 4);

-- --------------------------------------------------------

--
-- Table structure for table `dimensies`
--

CREATE TABLE `dimensies` (
  `id` int(11) NOT NULL,
  `categorie` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dimensies`
--

INSERT INTO `dimensies` (`id`, `categorie`) VALUES
(1, 'Kwaliteit van het werk'),
(2, 'Verdeling werkzaamheden'),
(3, 'Regeltaken'),
(4, 'Teamoverleg'),
(5, 'Besluitvorming'),
(6, 'Onderlinge relaties'),
(7, 'Conflicthantering'),
(8, 'Doelgerichtheid'),
(9, 'Prestatiegerichtheid'),
(10, 'Competentieontwikkeling (van team en medewerkers)'),
(11, 'Niveaus van leren'),
(12, 'Management informatie (waaronder financiën)');

-- --------------------------------------------------------

--
-- Table structure for table `faculteiten`
--

CREATE TABLE `faculteiten` (
  `id` int(11) NOT NULL,
  `naam` varchar(255) NOT NULL,
  `gewijzigd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faculteiten`
--

INSERT INTO `faculteiten` (`id`, `naam`, `gewijzigd`) VALUES
(1, 'Faculteit Business, Finance & Marketing', '2019-12-17 10:35:29'),
(2, 'Faculteit Bestuur, Recht & Veiligheid', '2019-12-17 10:35:29'),
(3, 'Faculteit Gezondheid, Voeding & Sport', '2019-12-17 10:35:29'),
(4, 'Faculteit IT & Design', '2019-12-17 10:35:29'),
(5, 'Faculteit Management & Organisatie', '2019-12-17 10:35:29'),
(6, 'Faculteit Sociaal Werk & Educatie', '2019-12-17 10:35:29'),
(7, 'Faculteit Technologie, Innovatie & Samenleving', '2019-12-17 10:35:29'),
(8, 'Academie voor Masters & Professional Courses', '2019-12-17 10:35:29'),
(9, 'Bestuurszaken', '2019-12-17 10:35:29'),
(10, 'Dienst Bedrijfsvoering & Control', '2019-12-17 10:35:29'),
(11, 'Dienst Facilitaire Zaken & IT', '2019-12-17 10:36:25'),
(12, 'Dienst Human Resources Management', '2019-12-17 10:36:25'),
(13, 'Dienst Onderwijs, Kennis & Communicatie', '2019-12-17 10:36:25');

-- --------------------------------------------------------

--
-- Table structure for table `fases`
--

CREATE TABLE `fases` (
  `id` int(11) NOT NULL,
  `fase_tekst` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fase_nummer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `fases`
--

INSERT INTO `fases` (`id`, `fase_tekst`, `fase_nummer`) VALUES
(1, 'Iedere medewerker gaat zijn weg', 1),
(2, 'Accent op organisatorische taken in het team', 2),
(3, 'Doelgericht werken binnen het team', 3),
(4, 'Accent op zelfstandig verbeteren m.b.t. de omgeving', 4);

-- --------------------------------------------------------

--
-- Table structure for table `gebruikers`
--

CREATE TABLE `gebruikers` (
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `givenName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `displayName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userPrincipalName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `preferredLanguage` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(1200) COLLATE utf8_unicode_ci NOT NULL,
  `opleiding` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faculteit` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `geslacht` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `opOfObp` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contractsoort` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `locatie` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `geboortejaar` int(11) DEFAULT NULL,
  `aanstellingsomvang` decimal(2,1) DEFAULT NULL,
  `startjaarDienst` int(11) DEFAULT NULL,
  `startjaarOnderwijs` int(11) DEFAULT NULL,
  `startjaarFunctie` int(11) DEFAULT NULL,
  `rol` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opleidingen`
--

CREATE TABLE `opleidingen` (
  `id` int(11) NOT NULL,
  `naam` varchar(255) NOT NULL,
  `gewijzigd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `faculteit_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `opleidingen`
--

INSERT INTO `opleidingen` (`id`, `naam`, `gewijzigd`, `faculteit_id`) VALUES
(1, 'Boekhouden', '2019-12-17 11:23:06', 1),
(2, 'IFMC - English Stream', '2019-12-17 11:23:06', 1),
(3, 'Finance & Control - Associate Degree', '2019-12-17 11:23:06', 1),
(4, 'Finance & control', '2019-12-17 11:23:06', 1),
(5, 'Commerciële Economie', '2019-12-17 11:23:06', 1),
(6, 'Internationale Zaken', '2019-12-17 11:23:06', 1),
(7, 'Ondernemerschap & Retail Management', '2019-12-17 11:23:06', 1),
(8, 'Kenniskring / Lectoraat', '2019-12-17 11:23:06', 1),
(9, 'Faculteitsbureau', '2019-12-17 11:23:06', 1),
(10, 'Bestuurskunde/Overheidsmanagement', '2019-12-17 11:26:13', 2),
(11, 'IPM/Bestuurskunde/Overheidsmanagement - English Stream', '2019-12-17 11:26:13', 2),
(12, 'Law (I&EL)/HBO-Rechten - English Stream', '2019-12-17 11:26:13', 2),
(13, 'SSMS/Integrale Veiligheidskunde - English Stream', '2019-12-17 11:26:13', 2),
(14, 'HBO-Rechten', '2019-12-17 11:26:13', 2),
(15, 'Integrale Veiligheidskunde', '2019-12-17 11:26:13', 2),
(16, 'Kenniskring / Lectoraat', '2019-12-17 11:26:13', 2),
(17, 'Faculteitsbureau', '2019-12-17 11:26:13', 2),
(18, 'Mens en Techniek | Bewegingstechnologie', '2019-12-17 11:27:40', 3),
(19, 'Opleiding tot Leraar Lichamelijke Opvoeding', '2019-12-17 11:27:40', 3),
(20, 'Opleiding tot Verpleegkundige', '2019-12-17 11:27:40', 3),
(21, 'Huidtherapie', '2019-12-17 11:27:40', 3),
(22, 'Voeding & Diëtetiek', '2019-12-17 11:27:40', 3),
(23, 'Sportkunde (International Sportmanagement)', '2019-12-17 11:27:40', 3),
(24, 'Kenniskring / Lectoraat', '2019-12-17 11:27:40', 3),
(25, 'Faculteitsbureau', '2019-12-17 11:27:40', 3),
(26, 'HBO-ICT - Den Haag', '2019-12-17 11:28:19', 4),
(27, 'HBO-ICT - Delft', '2019-12-17 11:28:19', 4),
(28, 'HBO-ICT - Zoetermeer', '2019-12-17 11:28:19', 4),
(29, 'Communication and Multimedia Design', '2019-12-17 11:28:19', 4),
(30, 'Kenniskring / Lectoraat', '2019-12-17 11:28:19', 4),
(31, 'Faculteitsbureau', '2019-12-17 11:28:19', 4),
(32, 'Bedrijfskunde', '2019-12-17 11:28:53', 5),
(33, 'Communicatie', '2019-12-17 11:28:53', 5),
(34, 'European Studies', '2019-12-17 11:28:53', 5),
(35, 'Facilitaire Diensverlening', '2019-12-17 11:28:53', 5),
(36, 'Personeelszaken', '2019-12-17 11:28:53', 5),
(37, 'Kenniskring / Lectoraat', '2019-12-17 11:28:53', 5),
(38, 'Faculteitsbureau', '2019-12-17 11:28:53', 5),
(39, 'Opleiding tot Leraar Basisonderwijs', '2019-12-17 11:29:29', 6),
(40, 'Pedagogiek', '2019-12-17 11:29:29', 6),
(41, 'Maatschappelijk Werk', '2019-12-17 11:29:29', 6),
(42, 'Kenniskring / Lectoraat', '2019-12-17 11:29:29', 6),
(43, 'Faculteitsbureau', '2019-12-17 11:29:29', 6),
(44, 'Bouwkunde', '2019-12-17 11:30:00', 7),
(45, 'IDE | Industrieel Product Ontwerpen - English Stream', '2019-12-17 11:30:00', 7),
(46, 'PFT | Process & Food Technology', '2019-12-17 11:30:00', 7),
(47, 'Civiele Techniek', '2019-12-17 11:30:00', 7),
(48, 'Elektrotechniek', '2019-12-17 11:30:00', 7),
(49, 'IPO | Industrieel Product Ontwerpen', '2019-12-17 11:30:00', 7),
(50, 'Mechatronica', '2019-12-17 11:30:00', 7),
(51, 'Ruimtelijke Ontwikkeling | Climate & Management', '2019-12-17 11:30:00', 7),
(52, 'Technische Bedrijfskunde', '2019-12-17 11:30:00', 7),
(53, 'Technische Natuurkunde', '2019-12-17 11:30:00', 7),
(54, 'Toegepaste Wiskunde', '2019-12-17 11:30:00', 7),
(55, 'Werktuigbouwkunde', '2019-12-17 11:30:00', 7),
(56, 'Kenniskring / Lectoraat', '2019-12-17 11:30:00', 7),
(57, 'Faculteitsbureau', '2019-12-17 11:30:00', 7),
(58, 'Dienstbureau', '2019-12-17 11:30:47', 10),
(59, 'Eenheidsregeling', '2019-12-17 11:30:47', 10),
(60, 'Eenheidsdiensten', '2019-12-17 11:30:47', 10),
(61, 'Unit Subsidiedesk', '2019-12-17 11:30:47', 10),
(62, 'Dienstbureau', '2019-12-17 11:31:21', 11),
(63, 'Unit Facility Services & Huisvesting', '2019-12-17 11:31:21', 11),
(64, 'Unit Frontoffice & Support', '2019-12-17 11:31:21', 11),
(65, 'Unit Innovatie & Projecten', '2019-12-17 11:31:21', 11),
(66, 'IT-Eenheid', '2019-12-17 11:31:21', 11),
(67, 'Dienstbureau', '2019-12-17 11:31:48', 12),
(68, 'Unit Strategie en HRD', '2019-12-17 11:31:48', 12),
(69, 'Unit Advies en Dienstverlening', '2019-12-17 11:31:48', 12),
(70, 'Dienstbureau', '2019-12-17 11:32:16', 13),
(71, 'Eenheid Bibliotheek', '2019-12-17 11:32:16', 13),
(72, 'Eenheid Onderwijs', '2019-12-17 11:32:16', 13),
(73, 'Unit Studentenservice', '2019-12-17 11:32:16', 13),
(74, 'Unit Wereldburgerschap & Internationalisering', '2019-12-17 11:32:16', 13),
(75, 'Unit Marketing en Communicatie', '2019-12-17 11:32:16', 13);

-- --------------------------------------------------------

--
-- Table structure for table `resultaten`
--

CREATE TABLE `resultaten` (
  `dimensie` int(11) NOT NULL,
  `fase` int(11) DEFAULT NULL,
  `antwoord` text COLLATE utf8_unicode_ci,
  `string` tinyint(1) NOT NULL,
  `gebruiker_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `teamscan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rollen`
--

CREATE TABLE `rollen` (
  `id` int(11) NOT NULL,
  `rolnummer` int(11) NOT NULL,
  `beschrijving` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rollen`
--

INSERT INTO `rollen` (`id`, `rolnummer`, `beschrijving`) VALUES
(1, 1, 'gebruiker'),
(2, 2, 'beheerder'),
(3, 3, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `gebruiker_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `antwoord_gebruiker_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `teamscan_id` int(11) NOT NULL,
  `waarde` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `naam` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `teamleider` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `beschrijving` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `opleiding` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faculteit` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teamscans`
--

CREATE TABLE `teamscans` (
  `id` int(11) NOT NULL,
  `naam` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `start` date NOT NULL,
  `eind` date NOT NULL,
  `eindOpenVraag` date NOT NULL,
  `status` enum('invullen','scoren','gesloten') COLLATE utf8_unicode_ci NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams_gebruikers`
--

CREATE TABLE `teams_gebruikers` (
  `team_id` int(11) NOT NULL,
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `beheerder` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antwoorden`
--
ALTER TABLE `antwoorden`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Koppel dimensie` (`dimensie_id`),
  ADD KEY `Koppel fase` (`fase_id`);

--
-- Indexes for table `dimensies`
--
ALTER TABLE `dimensies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculteiten`
--
ALTER TABLE `faculteiten`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fases`
--
ALTER TABLE `fases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gebruikers`
--
ALTER TABLE `gebruikers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Rolrelatie` (`rol`);

--
-- Indexes for table `opleidingen`
--
ALTER TABLE `opleidingen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `on fac id` (`faculteit_id`);

--
-- Indexes for table `resultaten`
--
ALTER TABLE `resultaten`
  ADD PRIMARY KEY (`dimensie`,`gebruiker_id`,`teamscan_id`),
  ADD KEY `gebruiker` (`gebruiker_id`),
  ADD KEY `teamscan` (`teamscan_id`);

--
-- Indexes for table `rollen`
--
ALTER TABLE `rollen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`gebruiker_id`,`antwoord_gebruiker_id`,`teamscan_id`),
  ADD KEY `teamscan-scores` (`teamscan_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teamscans`
--
ALTER TABLE `teamscans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Koppel team` (`team_id`);

--
-- Indexes for table `teams_gebruikers`
--
ALTER TABLE `teams_gebruikers`
  ADD PRIMARY KEY (`team_id`,`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculteiten`
--
ALTER TABLE `faculteiten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `opleidingen`
--
ALTER TABLE `opleidingen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `teamscans`
--
ALTER TABLE `teamscans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `antwoorden`
--
ALTER TABLE `antwoorden`
  ADD CONSTRAINT `Koppel dimensie` FOREIGN KEY (`dimensie_id`) REFERENCES `dimensies` (`id`),
  ADD CONSTRAINT `Koppel fase` FOREIGN KEY (`fase_id`) REFERENCES `fases` (`id`);

--
-- Constraints for table `gebruikers`
--
ALTER TABLE `gebruikers`
  ADD CONSTRAINT `Rolrelatie` FOREIGN KEY (`rol`) REFERENCES `rollen` (`id`);

--
-- Constraints for table `opleidingen`
--
ALTER TABLE `opleidingen`
  ADD CONSTRAINT `on fac id` FOREIGN KEY (`faculteit_id`) REFERENCES `faculteiten` (`id`);

--
-- Constraints for table `resultaten`
--
ALTER TABLE `resultaten`
  ADD CONSTRAINT `gebruiker` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teamscan` FOREIGN KEY (`teamscan_id`) REFERENCES `teamscans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `on del user` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teamscan-scores` FOREIGN KEY (`teamscan_id`) REFERENCES `teamscans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamscans`
--
ALTER TABLE `teamscans`
  ADD CONSTRAINT `teamscans_met_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teams_gebruikers`
--
ALTER TABLE `teams_gebruikers`
  ADD CONSTRAINT `teams_gebruikers-teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
