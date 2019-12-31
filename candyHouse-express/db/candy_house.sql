/*
 Navicat Premium Data Transfer

 Source Server         : 111
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : 127.0.0.1:3306
 Source Schema         : candy_house

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 31/12/2019 19:02:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `default` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (1, '1', '橘右奇', '2', '13112808048', '广东省广州市增城区健生路', '扎克斯编程学习中心', '进小区右转', '23.290233612060547', '113.82756805419922', '学校', '0');
INSERT INTO `address` VALUES (2, '1', '野柚', '1', '13112542576', '广东省广州市增城区荔城大道13-19号', '宜博电竞馆(广州增城旗舰店)', '99号电脑', '23.29145050048828', '113.82965087890625', '公司', '0');
INSERT INTO `address` VALUES (3, '2', '小八', '2', '13222226666', '广东省广州市增城区健生路', '扎克斯编程学习中心', 'ujn', '23.290233612060547', '113.82756805419922', '公司', '1');
INSERT INTO `address` VALUES (4, '2', '小八', '2', '13222226666', '广东省广州市增城区健生路', '扎克斯编程学习中心', 'ujn', '23.290233612060547', '113.82756805419922', '公司', '0');

-- ----------------------------
-- Table structure for banner_index
-- ----------------------------
DROP TABLE IF EXISTS `banner_index`;
CREATE TABLE `banner_index`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `page_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `options` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner_index
-- ----------------------------
INSERT INTO `banner_index` VALUES (1, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576408067004_banner-1.webp', '/pages/product/product?id=3', '[\"/pages/product/product?id=\",1,3]');
INSERT INTO `banner_index` VALUES (2, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576408259373_banner-3.webp', '/pages/column/column?id=2', '[\"/pages/column/column?id=\",2]');
INSERT INTO `banner_index` VALUES (3, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576408678098_banner-2.webp', '/pages/product/product?id=3', '[\"/pages/product/product?id=\",1,3]');
INSERT INTO `banner_index` VALUES (5, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576419033242_banner-4.webp', '/pages/column/column?id=3', '[\"/pages/column/column?id=\",3]');
INSERT INTO `banner_index` VALUES (6, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576419168523_banner-5.webp', '/pages/column/column?id=4', '[\"/pages/column/column?id=\",4]');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `sku_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (27, '1', '24', 1);
INSERT INTO `cart` VALUES (35, '2', '10', 1);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '水果');
INSERT INTO `category` VALUES (3, '酒饮');
INSERT INTO `category` VALUES (4, '乳品');
INSERT INTO `category` VALUES (5, '零食');
INSERT INTO `category` VALUES (6, '肉蛋');
INSERT INTO `category` VALUES (7, '蔬菜');
INSERT INTO `category` VALUES (8, '熟食');
INSERT INTO `category` VALUES (9, '面食');
INSERT INTO `category` VALUES (10, '粮油');
INSERT INTO `category` VALUES (11, '清洁');
INSERT INTO `category` VALUES (12, '美妆');

-- ----------------------------
-- Table structure for classify_index
-- ----------------------------
DROP TABLE IF EXISTS `classify_index`;
CREATE TABLE `classify_index`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify_index
-- ----------------------------
INSERT INTO `classify_index` VALUES (1, '乳品冷饮', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576468278597_classify-01.jpg', '4');
INSERT INTO `classify_index` VALUES (2, '面点速食', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576468303744_classify-02.jpg', '9');
INSERT INTO `classify_index` VALUES (4, '肉禽蛋品', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576482842570_classify-03.jpg', '6');
INSERT INTO `classify_index` VALUES (5, '生鲜水果', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576483227852_classify-04.jpg', '1');
INSERT INTO `classify_index` VALUES (6, '坚果蜜饯', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576483247551_classify-05.webp', '5');

-- ----------------------------
-- Table structure for column
-- ----------------------------
DROP TABLE IF EXISTS `column`;
CREATE TABLE `column`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of column
-- ----------------------------
INSERT INTO `column` VALUES (2, '零食大放价', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576507564582_column-1.png');
INSERT INTO `column` VALUES (3, '居家神器', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576507632284_column-2.png');
INSERT INTO `column` VALUES (4, '补补身体', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576507731311_column-3.png');

-- ----------------------------
-- Table structure for column_goods
-- ----------------------------
DROP TABLE IF EXISTS `column_goods`;
CREATE TABLE `column_goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `goods_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of column_goods
-- ----------------------------
INSERT INTO `column_goods` VALUES (5, '2', '8');
INSERT INTO `column_goods` VALUES (6, '2', '9');
INSERT INTO `column_goods` VALUES (7, '2', '10');
INSERT INTO `column_goods` VALUES (10, '3', '14');
INSERT INTO `column_goods` VALUES (11, '3', '12');
INSERT INTO `column_goods` VALUES (12, '3', '13');
INSERT INTO `column_goods` VALUES (14, '3', '5');
INSERT INTO `column_goods` VALUES (15, '2', '7');
INSERT INTO `column_goods` VALUES (16, '2', '6');
INSERT INTO `column_goods` VALUES (17, '4', '6');
INSERT INTO `column_goods` VALUES (18, '4', '1');
INSERT INTO `column_goods` VALUES (19, '4', '3');
INSERT INTO `column_goods` VALUES (20, '4', '2');
INSERT INTO `column_goods` VALUES (21, '4', '11');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT 0,
  `price_origin` decimal(10, 2) NULL DEFAULT 0,
  `banner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `sold` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `sold_out` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '海南精选红心木瓜 2个装 单果重约800-1000g 新鲜水果', '海南精选红心木瓜', '1', 29.90, 39.90, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882830045_papaya.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882837272_papaya-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882854454_papaya-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882857713_papaya-banner-03.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882861632_papaya-banner-04.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882600584_papaya-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882621735_papaya-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882630929_papaya-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882654314_papaya-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882658157_papaya-05.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882663040_papaya-06.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882670203_papaya.jpg', '0');
INSERT INTO `goods` VALUES (2, '越南玉芒青皮芒果2.5斤（单果约200-300g）新鲜水果', '越南玉芒青皮芒果', '1', 9.90, NULL, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884635760_Mango-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884639420_Mango-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884643253_Mango-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884590941_Mango-editor-01.gif\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884595025_Mango-editor-02.gif\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884599539_Mango-editor-03.gif\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884603509_Mango-editor-04.gif\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884612767_Mango-editor-05.gif\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884616171_Mango-editor-06.gif\"></p>', '1', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884527775_Mango.jpg', '0');
INSERT INTO `goods` VALUES (3, '静宁馆 红六福 特产水果 红富士苹果 12枚65#—70#箱装 新鲜水果苹果 顺丰全国免邮 西北', '【基地直供】产自海拔1700米黄土高原苹果适生区生态果园恒温保鲜质量追溯', '1', 19.90, 25.90, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885501750_apple.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885505378_apple-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885507945_apple-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885510947_apple-banner-03.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885513604_apple-banner-04.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885482934_apple-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885485738_apple-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885488765_apple-editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885491538_apple-editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885494761_apple-editor-05.jpg\"></p>', '1', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885419581_apple.jpg', '0');
INSERT INTO `goods` VALUES (5, '百威（Budweiser）啤酒经典醇正500ml*18听整箱装啤酒国产啤酒', '百威（Budweiser）啤酒经典醇正500ml*18听整箱装啤酒国产啤酒', '3', 109.00, 128.00, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947676794_beer.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947846227_beer-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947849464_beer-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947852480_beer-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947652351_beer-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947655262_beer-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947659266_beer-editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947664671_beer-editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947668663_beer-editor-05.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947626364_beer.jpg', '0');
INSERT INTO `goods` VALUES (6, '蒙牛(MENGNIU)纯甄草莓果粒风', '精选优质草莓，进口丹麦菌种，纯正生牛乳，轻享慢发酵', '4', 53.90, NULL, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948412273_milk-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948416756_milk-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948421266_milk-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948397775_milk-editor-01.jpg\"></p>', '1', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948258546_milk.jpg', '0');
INSERT INTO `goods` VALUES (7, '奥利奥(OREO) 夹心饼干 零食 原味696g(盒装)', '亿滋系列商品，玩转奥利奥，秀出新趣味，零食饼干', '5', 26.50, 28.50, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949746406_oreo-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949751156_oreo-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949754860_oreo-banner-03.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949759704_oreo-banner-04.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949728067_oreo-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949730990_oreo-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949734495_oreo-editor-03.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949672611_oreo.jpg', '0');
INSERT INTO `goods` VALUES (8, '乐事 香辣小龙虾味薯片 75克/袋', '真薯原切、够薄够脆、唇齿留香', '5', 10.50, 12.50, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657721202_joy-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657728935_joy-01-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657742209_joy-banner.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657746435_joy-01-02.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657660858_joy-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657666607_joy-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657670511_joy-editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657674142_joy-editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657682420_joy-editor-05.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657689139_joy-editor-06.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657693886_joy-editor-07.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657641632_joy-01.jpg', '0');
INSERT INTO `goods` VALUES (9, '乐事 蒲烧鳗鱼味薯片 75克/袋', '真薯原切、够薄够脆、唇齿留香', '5', 10.50, 11.50, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657971935_joy-03.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657975948_joy-03-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657980522_joy-banner.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657995213_joy-03-02.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657942265_joy-02editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657944999_joy-02editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657948218_joy-02editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657951152_joy-02editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657954609_joy-02editor-05.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657957952_joy-02editor-06.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657962949_joy-02editor-07.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657923473_joy-03.jpg', '1');
INSERT INTO `goods` VALUES (10, '乐事 金黄炒蟹味薯片 75克/袋', '酥脆鲜香 蟹味浓郁 休闲必备', '5', 10.50, 11.50, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658300051_joy-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658304363_joy-02-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658310333_joy-banner.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658313933_joy-02-02.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658036343_joy-03editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658039760_joy-03editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658043134_joy-03editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658045785_joy-03editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658048926_joy-03editor-05.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658051544_joy-03editor-06.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658059735_joy-03editor-07.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658288237_joy-02.jpg', '0');
INSERT INTO `goods` VALUES (11, '简单滋味 越南巴沙鱼柳500g（2片）海鲜', '无骨无刺，口感鲜美，爽滑细嫩', '6', 25.80, 28.80, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961299101_fish.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961303071_fish-banner01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961308030_fish-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961313439_fish-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961253794_fish-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961258528_fish-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961263849_fish-editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961267276_fish-editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961271222_fish-editor-05.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961275061_fish-editor-06.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961217753_fish.jpg', '0');
INSERT INTO `goods` VALUES (12, '新鲜野生洋槐花1斤装 ', '现摘蔬菜深山野菜可蒸', '7', 16.60, NULL, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962462034_flower.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962462280_flower-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962462976_flower-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962472883_flower-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962447832_flower-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962450515_flower-editor-02.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962388499_flower.jpg', '0');
INSERT INTO `goods` VALUES (13, '金龙鱼#不油腻轻年#玉米油3.818L', '非转基因物理压榨植物油 充氮保鲜食用油', '10', 49.90, 55.90, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963681287_oil.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963689987_oil-banner-01.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963694795_oil-banner-02.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963698933_oil-banner-03.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963650479_oil-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963654510_oil-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963657974_oil-editor-03.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963661000_oil-editor-04.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963664909_oil-editor-05.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963607109_oil.jpg', '0');
INSERT INTO `goods` VALUES (14, '亮净厨房去重油剂(渗透洁净)1L', '强效去油渍污垢 厨房 油烟机清洁剂 威露士出品', '11', 15.90, 18.90, '[{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575964108764_cleaner.jpg\"},{\"url\":\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575964111199_cleaner-01.jpg\"}]', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963965525_cleaner-editor-01.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963968636_cleaner-editor-02.jpg\"><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963971874_cleaner-editor-03.jpg\"></p>', '0', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963918844_cleaner.jpg', '0');

-- ----------------------------
-- Table structure for landing_page
-- ----------------------------
DROP TABLE IF EXISTS `landing_page`;
CREATE TABLE `landing_page`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `created_time` timestamp(0) NULL DEFAULT current_timestamp(0),
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of landing_page
-- ----------------------------
INSERT INTO `landing_page` VALUES (2, '美素佳儿奶粉活动', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576418719401_landing-01.jpg\"></p>', '2019-12-11 16:30:04', 'rgba(44, 170, 232, 0.88)');
INSERT INTO `landing_page` VALUES (3, '海鲜活动页', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576418932233_landing-02.jpg\"></p>', '2019-12-15 22:09:55', 'rgba(51, 200, 205, 0.8)');
INSERT INTO `landing_page` VALUES (4, '零食活动页', '<p><img src=\"http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576419146222_landing-03.jpg\"></p>', '2019-12-15 22:12:40', 'rgba(239, 164, 23, 0.8)');

-- ----------------------------
-- Table structure for landing_page_recommend
-- ----------------------------
DROP TABLE IF EXISTS `landing_page_recommend`;
CREATE TABLE `landing_page_recommend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `goods_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of landing_page_recommend
-- ----------------------------
INSERT INTO `landing_page_recommend` VALUES (7, '2', '6');
INSERT INTO `landing_page_recommend` VALUES (8, '2', '7');
INSERT INTO `landing_page_recommend` VALUES (9, '3', '11');
INSERT INTO `landing_page_recommend` VALUES (10, '3', '12');
INSERT INTO `landing_page_recommend` VALUES (11, '4', '8');
INSERT INTO `landing_page_recommend` VALUES (12, '4', '9');
INSERT INTO `landing_page_recommend` VALUES (13, '4', '10');

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES (1, '妮可', '13112808045', '112233', '0');
INSERT INTO `manager` VALUES (2, '祢豆子', '13111111122', '111222', '1');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `total` decimal(10, 2) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  `order` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `created_time` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, '1', '1', 79.50, '0', '1577246138912', '2019-12-25 11:55:38');
INSERT INTO `order` VALUES (5, '1', '1', 53.90, '3', '1577246561407', '2019-12-25 12:02:41');
INSERT INTO `order` VALUES (7, '2', '1', 199.80, '3', '1577444448442', '2019-12-27 19:00:48');
INSERT INTO `order` VALUES (8, '2', '1', 10.50, '0', '1577697082807', '2019-12-30 17:11:22');
INSERT INTO `order` VALUES (9, '2', '1', 16.60, '0', '1577697085923', '2019-12-31 17:11:25');
INSERT INTO `order` VALUES (12, '2', '1', 9.90, '1', '1577697112981', '2019-12-31 17:11:52');
INSERT INTO `order` VALUES (15, '3', '2', 375.10, '1', '1577786167934', '2019-12-31 17:56:07');
INSERT INTO `order` VALUES (16, '3', '2', 10.50, '2', '1577786366927', '2019-12-31 17:59:26');

-- ----------------------------
-- Table structure for order_sku
-- ----------------------------
DROP TABLE IF EXISTS `order_sku`;
CREATE TABLE `order_sku`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `sku_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_sku
-- ----------------------------
INSERT INTO `order_sku` VALUES (1, '1', '12', '3');
INSERT INTO `order_sku` VALUES (6, '5', '10', '1');
INSERT INTO `order_sku` VALUES (8, '7', '31', '2');
INSERT INTO `order_sku` VALUES (9, '8', '14', '1');
INSERT INTO `order_sku` VALUES (10, '9', '26', '1');
INSERT INTO `order_sku` VALUES (13, '12', '3', '1');
INSERT INTO `order_sku` VALUES (16, '15', '3', '3');
INSERT INTO `order_sku` VALUES (17, '15', '14', '2');
INSERT INTO `order_sku` VALUES (18, '15', '11', '3');
INSERT INTO `order_sku` VALUES (19, '15', '1', '2');
INSERT INTO `order_sku` VALUES (20, '16', '14', '1');

-- ----------------------------
-- Table structure for poster_index
-- ----------------------------
DROP TABLE IF EXISTS `poster_index`;
CREATE TABLE `poster_index`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `page_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `options` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of poster_index
-- ----------------------------
INSERT INTO `poster_index` VALUES (1, 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576463455761_poster.webp', '/pages/column/column?id=4', '[\"/pages/column/column?id=\",4]');

-- ----------------------------
-- Table structure for recommend
-- ----------------------------
DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO `recommend` VALUES (1, '2');
INSERT INTO `recommend` VALUES (2, '9');
INSERT INTO `recommend` VALUES (5, '11');
INSERT INTO `recommend` VALUES (6, '8');
INSERT INTO `recommend` VALUES (7, '10');
INSERT INTO `recommend` VALUES (8, '1');
INSERT INTO `recommend` VALUES (9, '3');

-- ----------------------------
-- Table structure for sku
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT 0,
  `goods_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `stock` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  `sold` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sku
-- ----------------------------
INSERT INTO `sku` VALUES (1, '海南红心木瓜特级大果2个', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882880958_papaya.jpg', 29.90, '1', '28', '0');
INSERT INTO `sku` VALUES (2, '海南红心木瓜特级大果4个', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575882898949_papaya-banner-02.jpg', 55.90, '1', '30', '0');
INSERT INTO `sku` VALUES (3, '越南玉芒青皮芒果', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575884647235_Mango.jpg', 9.90, '2', '155', '1');
INSERT INTO `sku` VALUES (4, '12枚', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575885534960_apple.jpg', 19.90, '3', '363', '1');
INSERT INTO `sku` VALUES (5, '24枚', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575900668155_apple-banner-01.jpg', 37.90, '3', '112', '0');
INSERT INTO `sku` VALUES (8, '百威啤酒330ml*24听 ', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947912932_beer-banner-03.jpg', 119.00, '5', '357', '0');
INSERT INTO `sku` VALUES (9, '百威啤酒500ml*18听 ', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575947883587_beer.jpg', 109.00, '5', '666', '0');
INSERT INTO `sku` VALUES (10, '草莓果粒 礼盒装 200g*10', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948429254_milk.jpg', 53.90, '6', '352', '4');
INSERT INTO `sku` VALUES (11, '香浓原味24盒 家庭装 200g*24', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575948513214_milk-skujpg.jpg', 88.20, '6', '308', '0');
INSERT INTO `sku` VALUES (12, '原味 1件', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949765271_oreo.jpg', 26.50, '7', '23', '0');
INSERT INTO `sku` VALUES (13, '巧克力味 1件', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575949828816_oreo-sku.jpg', 28.50, '7', '188', '0');
INSERT INTO `sku` VALUES (14, '蒲烧鳗鱼味 75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657753954_joy-03.jpg', 10.50, '8', '205', '0');
INSERT INTO `sku` VALUES (15, '香辣小龙虾味 75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576657759745_joy-01.jpg', 10.50, '8', '333', '0');
INSERT INTO `sku` VALUES (16, '海盐黑胡椒味  75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658387862_joy-02.jpg', 10.50, '8', '431', '0');
INSERT INTO `sku` VALUES (17, '海盐黑胡椒味 75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658391736_joy-sku.jpg', 10.50, '8', '322', '0');
INSERT INTO `sku` VALUES (18, '蒲烧鳗鱼味 75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658000378_joy-03.jpg', 10.50, '9', '432', '0');
INSERT INTO `sku` VALUES (19, '香辣小龙虾味  75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658004366_joy-01.jpg', 10.50, '9', '332', '0');
INSERT INTO `sku` VALUES (20, '金黄炒蟹味  75g/1袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658407959_joy-02.jpg', 10.50, '9', '412', '0');
INSERT INTO `sku` VALUES (21, '金黄炒蟹味 75g/一袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658317899_joy-02.jpg', 10.50, '10', '408', '0');
INSERT INTO `sku` VALUES (22, '蒲烧鳗鱼味 75g/一袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658153106_joy-03.jpg', 10.50, '10', '388', '0');
INSERT INTO `sku` VALUES (23, '香辣小老虾味 75g/一袋', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1576658163899_joy-01.jpg', 10.50, '10', '365', '0');
INSERT INTO `sku` VALUES (24, '巴沙鱼 500g', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961326408_fish.jpg', 25.80, '11', '53', '0');
INSERT INTO `sku` VALUES (25, '秋刀鱼 500g', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575961371746_fish-sku.jpg', 19.80, '11', '32', '0');
INSERT INTO `sku` VALUES (26, '新鲜野生洋槐花1斤装 ', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575962477511_flower.jpg', 16.60, '12', '42', '0');
INSERT INTO `sku` VALUES (27, '玉米油3.818L', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575963704648_oil.jpg', 49.90, '13', '40', '0');
INSERT INTO `sku` VALUES (28, '亮净厨房去重油剂1L', 'http://q2y4avzs8.bkt.clouddn.com/candyHouse/1575964114955_cleaner.jpg', 15.90, '14', '321', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `salesman` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '亚提密斯', 'https://wx.qlogo.cn/mmopen/vi_32/ABFib3UEib8Y1qPPibL8cG9MzAsVmIjzBmQAhI6r8ibwqOciaCgTfhXNia8h3HGag6gKd1iccUnoPIFicLtJcpojFeqhlA/132', 'o7em15MDf4I3iizGHTMtaaccDOD4', 1);
INSERT INTO `user` VALUES (2, '董一Amcent', 'https://wx.qlogo.cn/mmopen/vi_32/JtLYoVdPprs3doZ9xxMfsdickM1tpkzwgMSYvxJVUvyfcMENmM4VDEl8ZmYyT8cKNf1e9A4TuMre1pUEuq6Xu6w/132', 'o7em15IR9Bh78N7PUUEGgBsglPxE', 1);

SET FOREIGN_KEY_CHECKS = 1;
