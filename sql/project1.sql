/*
 Navicat Premium Data Transfer

 Source Server         : LocalHost
 Source Server Type    : MySQL
 Source Server Version : 100413
 Source Host           : localhost:3306
 Source Schema         : project1

 Target Server Type    : MySQL
 Target Server Version : 100413
 File Encoding         : 65001

 Date: 28/06/2022 19:15:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for date_week
-- ----------------------------
DROP TABLE IF EXISTS `date_week`;
CREATE TABLE `date_week`  (
  `date_week_id` int NOT NULL AUTO_INCREMENT,
  `date_week_name` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`date_week_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of date_week
-- ----------------------------
INSERT INTO `date_week` VALUES (1, 'SUN');
INSERT INTO `date_week` VALUES (2, 'MON');
INSERT INTO `date_week` VALUES (3, 'TUE');
INSERT INTO `date_week` VALUES (4, 'WED');
INSERT INTO `date_week` VALUES (5, 'THU');
INSERT INTO `date_week` VALUES (6, 'FRI');
INSERT INTO `date_week` VALUES (7, 'SAT');

-- ----------------------------
-- Table structure for engineer
-- ----------------------------
DROP TABLE IF EXISTS `engineer`;
CREATE TABLE `engineer`  (
  `engineer_id` int NOT NULL AUTO_INCREMENT,
  `engineer_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dept_id` int NOT NULL,
  `location_id` int NOT NULL,
  `engineer_tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '0:ลาออกงานแล้ว 1:ทำงาน',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`engineer_id`) USING BTREE,
  UNIQUE INDEX `engineer_username`(`engineer_username`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `engineer_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `engineer_department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `engineer_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of engineer
-- ----------------------------
INSERT INTO `engineer` VALUES (2, 'nick', '$2a$10$Q1zworSVsEg26p4eQbBLI.3DkgO4Fj34ki7rMmNv4gsN6w.0dGxDO', 'nick', 'nick', 1, 1, '012345678', 1, '2022-06-27 16:03:12');

-- ----------------------------
-- Table structure for engineer_department
-- ----------------------------
DROP TABLE IF EXISTS `engineer_department`;
CREATE TABLE `engineer_department`  (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `location_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`dept_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `engineer_department_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of engineer_department
-- ----------------------------
INSERT INTO `engineer_department` VALUES (1, 'test dept', 1, '2022-06-27 16:03:07');

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `leave_type_id` int NOT NULL,
  `maid_id` int NULL DEFAULT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0: รออนุมัติ\r\n1: อนุมัติ\r\n-1: ไม่อนุมัติ',
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`leave_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  INDEX `leave_type_id`(`leave_type_id`) USING BTREE,
  CONSTRAINT `leave_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leave_ibfk_2` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leave_ibfk_3` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type` (`leave_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave
-- ----------------------------

-- ----------------------------
-- Table structure for leave_type
-- ----------------------------
DROP TABLE IF EXISTS `leave_type`;
CREATE TABLE `leave_type`  (
  `leave_type_id` int NOT NULL AUTO_INCREMENT,
  `leave_type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`leave_type_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  CONSTRAINT `leave_type_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave_type
-- ----------------------------

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`location_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, 'test hall', 2, '2022-06-27 16:01:51');

-- ----------------------------
-- Table structure for maid
-- ----------------------------
DROP TABLE IF EXISTS `maid`;
CREATE TABLE `maid`  (
  `maid_id` int NOT NULL AUTO_INCREMENT,
  `maid_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_tel` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `location_id` int NOT NULL,
  `status` tinyint NULL DEFAULT 1 COMMENT '0:ไม่สามารถใช้งาน 1:ใช้งานได้',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`maid_id`) USING BTREE,
  UNIQUE INDEX `maid_username`(`maid_username`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `maid_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maid
-- ----------------------------
INSERT INTO `maid` VALUES (3, 'min', '$2a$10$hLdGqJMojRi4V3keoWoe2emMg69H0uabfWL.LAumEKRw.AmssNAxq', 'min', 'min', '012345678', 1, 1, '2022-06-27 16:01:55');

-- ----------------------------
-- Table structure for maid_duty
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty`;
CREATE TABLE `maid_duty`  (
  `maid_duty_id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสตารางเวร',
  `maid_id` int NOT NULL,
  `date_week_id` int NOT NULL,
  `time_start` time(0) NOT NULL,
  `time_end` time(0) NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`maid_duty_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `date_week_id`(`date_week_id`) USING BTREE,
  CONSTRAINT `maid_duty_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_ibfk_3` FOREIGN KEY (`date_week_id`) REFERENCES `date_week` (`date_week_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maid_duty
-- ----------------------------

-- ----------------------------
-- Table structure for maid_duty_assign
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty_assign`;
CREATE TABLE `maid_duty_assign`  (
  `maid_duty_assign_id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสภาระงานแม่บ้าน',
  `maid_duity_id` int NULL DEFAULT NULL,
  `room_id` int NULL DEFAULT NULL,
  `work_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NULL DEFAULT NULL COMMENT '0:ยังไม่ทำ 1:ทำเสร็จแล้ว',
  `manager_id_assign` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`maid_duty_assign_id`) USING BTREE,
  INDEX `maid_duity_id`(`maid_duity_id`) USING BTREE,
  INDEX `manager_id_assign`(`manager_id_assign`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  INDEX `maid_duty_assign_ibfk_2`(`status`) USING BTREE,
  CONSTRAINT `maid_duty_assign_ibfk_1` FOREIGN KEY (`maid_duity_id`) REFERENCES `maid_duty` (`maid_duty_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_assign_ibfk_3` FOREIGN KEY (`manager_id_assign`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_assign_ibfk_4` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maid_duty_assign
-- ----------------------------

-- ----------------------------
-- Table structure for maid_duty_check
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty_check`;
CREATE TABLE `maid_duty_check`  (
  `maid_duty_check_id` int NOT NULL AUTO_INCREMENT,
  `maid_duty_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0: ดำเนินการสำเร็จ\r\n1: หัวหน้างานตรวจสอบแล้ว',
  `finished_date` timestamp(0) NOT NULL DEFAULT current_timestamp(0) COMMENT 'เวลาที่ทำงานเสร็จสิ้น',
  `check_date` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`maid_duty_check_id`) USING BTREE,
  INDEX `maid_duty_id`(`maid_duty_id`) USING BTREE,
  CONSTRAINT `maid_duty_check_ibfk_1` FOREIGN KEY (`maid_duty_id`) REFERENCES `maid_duty` (`maid_duty_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maid_duty_check
-- ----------------------------

-- ----------------------------
-- Table structure for maid_duty_material
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty_material`;
CREATE TABLE `maid_duty_material`  (
  `maid_duty_material_id` int NOT NULL AUTO_INCREMENT,
  `maid_duty_assign_id` int NOT NULL,
  `material_id` int NOT NULL,
  `material_count` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`maid_duty_material_id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  INDEX `maid_duty_material_ibfk_1`(`maid_duty_assign_id`) USING BTREE,
  CONSTRAINT `maid_duty_material_ibfk_1` FOREIGN KEY (`maid_duty_assign_id`) REFERENCES `maid_duty_assign` (`maid_duty_assign_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_material_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maid_duty_material
-- ----------------------------

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager`  (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `manager_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`manager_id`) USING BTREE,
  UNIQUE INDEX `manager_username`(`manager_username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES (2, 'unlimit', '$2a$10$mlgUn35xO6M7wCa9YB9g5uH/s0.70rY0eusRHVlrIL1yxZegP8Jyy', 'unlimit', 'unlimit', '012345678', 'unlimit@unlimit.com', '2022-06-27 15:55:57');

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material`  (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `material_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `material_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `material_quantity` int NOT NULL,
  `import_date` date NOT NULL,
  `manager_id` int NOT NULL,
  `engineer_import_id` int NULL DEFAULT NULL,
  `maid_import_id` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`material_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  INDEX `engineer_import_id`(`engineer_import_id`) USING BTREE,
  INDEX `maid_import_id`(`maid_import_id`) USING BTREE,
  CONSTRAINT `material_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `material_ibfk_2` FOREIGN KEY (`engineer_import_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `material_ibfk_3` FOREIGN KEY (`maid_import_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of material
-- ----------------------------

-- ----------------------------
-- Table structure for notify
-- ----------------------------
DROP TABLE IF EXISTS `notify`;
CREATE TABLE `notify`  (
  `notify_id` int NOT NULL AUTO_INCREMENT,
  `manager_id` int NULL DEFAULT NULL,
  `maid_id` int NULL DEFAULT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `leave_id` int NULL DEFAULT NULL,
  `order_id` int NULL DEFAULT NULL,
  `spacial_id` int NULL DEFAULT NULL,
  `notify_repair_id` int NULL DEFAULT NULL,
  `urgent_id` int NULL DEFAULT NULL,
  `maid_duty_check_id` int NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0:ยังไม่อ่าน 1:อ่านแล้ว',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`notify_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `leave_id`(`leave_id`) USING BTREE,
  INDEX `order_id`(`order_id`) USING BTREE,
  INDEX `spacial_id`(`spacial_id`) USING BTREE,
  INDEX `notify_repair_id`(`notify_repair_id`) USING BTREE,
  INDEX `urgent_id`(`urgent_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  CONSTRAINT `notify_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_2` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_4` FOREIGN KEY (`leave_id`) REFERENCES `leave` (`leave_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_5` FOREIGN KEY (`order_id`) REFERENCES `order_material` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_6` FOREIGN KEY (`spacial_id`) REFERENCES `spacial_event` (`spacial_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_7` FOREIGN KEY (`notify_repair_id`) REFERENCES `notify_repair` (`notify_repair_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_8` FOREIGN KEY (`urgent_id`) REFERENCES `urgent_work` (`urgent_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_ibfk_9` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notify
-- ----------------------------

-- ----------------------------
-- Table structure for notify_repair
-- ----------------------------
DROP TABLE IF EXISTS `notify_repair`;
CREATE TABLE `notify_repair`  (
  `notify_repair_id` int NOT NULL AUTO_INCREMENT,
  `maid_id` int NULL DEFAULT NULL,
  `location_id` int NOT NULL,
  `room_id` int NULL DEFAULT NULL,
  `description` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `outsider_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '-2: ไม่สามารถดำเนินการได้\r\n-1: ไม่อนุมัติ\r\n0:รอดำเนินการ \r\n1:รออนุมัติ \r\n2:อนุมัติแล้ว \r\n3: กำลังดำเนินการ\r\n4:ดำเนินการเสร็จสิ้น\r\n\r\n',
  `notify_repair_date` date NOT NULL,
  `engineer_dept_id` int NULL DEFAULT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `define_date_by_engineer` date NULL DEFAULT NULL COMMENT 'กำหนดเวลาของช่าง',
  `finished_date` datetime(0) NULL DEFAULT NULL COMMENT 'วันที่ซ่อมสำเร็จ',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`notify_repair_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  INDEX `engineer_dept_id`(`engineer_dept_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  CONSTRAINT `notify_repair_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_repair_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_repair_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_repair_ibfk_4` FOREIGN KEY (`engineer_dept_id`) REFERENCES `engineer_department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_repair_ibfk_5` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notify_repair
-- ----------------------------

-- ----------------------------
-- Table structure for notify_repair_material
-- ----------------------------
DROP TABLE IF EXISTS `notify_repair_material`;
CREATE TABLE `notify_repair_material`  (
  `notify_repair_materil_id` int NOT NULL AUTO_INCREMENT,
  `notify_repair_id` int NOT NULL,
  `material_id` int NOT NULL,
  `material_count` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`notify_repair_materil_id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  INDEX `notify_repair_id`(`notify_repair_id`) USING BTREE,
  CONSTRAINT `notify_repair_material_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notify_repair_material_ibfk_2` FOREIGN KEY (`notify_repair_id`) REFERENCES `notify_repair` (`notify_repair_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notify_repair_material
-- ----------------------------

-- ----------------------------
-- Table structure for order_material
-- ----------------------------
DROP TABLE IF EXISTS `order_material`;
CREATE TABLE `order_material`  (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `material_id` int NOT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `maid_id` int NULL DEFAULT NULL,
  `quantity` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0:รออนุมัติ 1:อนุมัติ -1:ไม่อนุมัติ',
  `order_date` date NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  CONSTRAINT `order_material_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_material_ibfk_2` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_material_ibfk_3` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_material
-- ----------------------------

-- ----------------------------
-- Table structure for outsider_engineer
-- ----------------------------
DROP TABLE IF EXISTS `outsider_engineer`;
CREATE TABLE `outsider_engineer`  (
  `outsider_engineer_id` int NOT NULL AUTO_INCREMENT,
  `dept_id` int NOT NULL,
  `manager_id` int NOT NULL,
  `outsider_engineer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `outsider_engineer_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `outsider_engineer_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`outsider_engineer_id`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  CONSTRAINT `outsider_engineer_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `engineer_department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outsider_engineer_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of outsider_engineer
-- ----------------------------

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `location_id` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`room_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------

-- ----------------------------
-- Table structure for spacial_event
-- ----------------------------
DROP TABLE IF EXISTS `spacial_event`;
CREATE TABLE `spacial_event`  (
  `spacial_id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `room_id` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `event_date` datetime(0) NOT NULL,
  `finished_date` datetime(0) NULL DEFAULT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`spacial_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  CONSTRAINT `spacial_event_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `spacial_event_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of spacial_event
-- ----------------------------

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `spacial_event_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`team_id`) USING BTREE,
  INDEX `spacial_event_id`(`spacial_event_id`) USING BTREE,
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`spacial_event_id`) REFERENCES `spacial_event` (`spacial_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------

-- ----------------------------
-- Table structure for team_material
-- ----------------------------
DROP TABLE IF EXISTS `team_material`;
CREATE TABLE `team_material`  (
  `team_material_id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NOT NULL,
  `material_id` int NOT NULL,
  `material_count` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`team_material_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  CONSTRAINT `team_material_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_material_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team_material
-- ----------------------------

-- ----------------------------
-- Table structure for team_member
-- ----------------------------
DROP TABLE IF EXISTS `team_member`;
CREATE TABLE `team_member`  (
  `team_member_id` int NOT NULL AUTO_INCREMENT,
  `maid_id` int NULL DEFAULT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `team_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`team_member_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  CONSTRAINT `team_member_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_member_ibfk_3` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_member_ibfk_4` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team_member
-- ----------------------------

-- ----------------------------
-- Table structure for urgent_work
-- ----------------------------
DROP TABLE IF EXISTS `urgent_work`;
CREATE TABLE `urgent_work`  (
  `urgent_id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NULL DEFAULT NULL,
  `maid_duty_id` int NULL DEFAULT NULL,
  `maid_instead_id` int NULL DEFAULT NULL,
  `engineer_instead_id` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`urgent_id`) USING BTREE,
  INDEX `team_id`(`team_id`) USING BTREE,
  INDEX `maid_instead_id`(`maid_instead_id`) USING BTREE,
  INDEX `engineer_instead_id`(`engineer_instead_id`) USING BTREE,
  INDEX `maid_duty_id`(`maid_duty_id`) USING BTREE,
  CONSTRAINT `urgent_work_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `urgent_work_ibfk_3` FOREIGN KEY (`maid_instead_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `urgent_work_ibfk_4` FOREIGN KEY (`engineer_instead_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `urgent_work_ibfk_5` FOREIGN KEY (`maid_duty_id`) REFERENCES `maid_duty` (`maid_duty_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of urgent_work
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
