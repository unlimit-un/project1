/*
 Navicat Premium Data Transfer

 Source Server         : SeniorHost1014
 Source Server Type    : MySQL
 Source Server Version : 100420
 Source Host           : 202.28.34.205:3306
 Source Schema         : 62011211014

 Target Server Type    : MySQL
 Target Server Version : 100420
 File Encoding         : 65001

 Date: 09/08/2022 20:06:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for date_week
-- ----------------------------
DROP TABLE IF EXISTS `date_week`;
CREATE TABLE `date_week`  (
  `date_week_id` int NOT NULL AUTO_INCREMENT,
  `date_week_full_name_eng` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_week_name_shot_eng` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_week_full_name_th` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_week_shot_name_th` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`date_week_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of date_week
-- ----------------------------
INSERT INTO `date_week` VALUES (1, 'Monday', 'MON', 'วันจันทร์', 'จ.');
INSERT INTO `date_week` VALUES (2, 'Tuesday', 'TUE', 'วันอังคาร', 'อ.');
INSERT INTO `date_week` VALUES (3, 'Wednesday', 'WED', 'วันพุธ', 'พ.');
INSERT INTO `date_week` VALUES (4, 'Thursday', 'THU', 'วันพฤหัสบดี', 'พฤ.');
INSERT INTO `date_week` VALUES (5, 'Friday', 'FRI', 'วันศุกร์', 'ศ.');
INSERT INTO `date_week` VALUES (6, 'Satuday', 'SAT', 'วันเสาร์', 'ส.');
INSERT INTO `date_week` VALUES (7, 'Sunday', 'SUN', 'วันอาทิตย์', 'อา.');

-- ----------------------------
-- Table structure for engineer
-- ----------------------------
DROP TABLE IF EXISTS `engineer`;
CREATE TABLE `engineer`  (
  `engineer_id` int NOT NULL AUTO_INCREMENT,
  `engineer_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `engineer_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `engineer_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of engineer
-- ----------------------------
INSERT INTO `engineer` VALUES (6, 'E001', 'img-1659886896165.jpeg', 'nik', '$2a$10$l4FHmSXZX/KYH5YB9YNFp.stdCLNaO9MTV9qzfj6SUTz5kK.0BqTi', 'Suphatarachai', 'Rongsak', 'Suphatarachi@gmail.com', 5, 12, '0801234567', 1, '2022-08-06 21:20:56');
INSERT INTO `engineer` VALUES (7, 'unlimit', 'img-1659886896165.jpeg', 'unlimit', '$2a$10$/hKZhiv.fzxUAfShHg..Uuxg3mjPgycu7xiHb373fHKe.x3AC/LZq', 'unlimit', 'unlimit', 'unlimit@unlimit.com', 5, 12, '0123', 1, '2022-08-07 20:57:54');

-- ----------------------------
-- Table structure for engineer_department
-- ----------------------------
DROP TABLE IF EXISTS `engineer_department`;
CREATE TABLE `engineer_department`  (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `location_id` int NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`dept_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `engineer_department_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of engineer_department
-- ----------------------------
INSERT INTO `engineer_department` VALUES (5, 'DEPT001', 'ช่างซ่อมทั่วไป', 12, '2022-08-06 15:22:43');
INSERT INTO `engineer_department` VALUES (7, 'DEPT003', 'ช่างซ่อมบำรุง', 12, '2022-08-05 20:21:21');
INSERT INTO `engineer_department` VALUES (8, 'Test', 'Test', 12, '2022-08-07 03:08:05');

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `leave_type_id` int NOT NULL COMMENT 'รหัสประเภทการลา',
  `maid_id` int NULL DEFAULT NULL COMMENT 'รหัสแม่บ้าน',
  `engineer_id` int NULL DEFAULT NULL COMMENT 'รหัสช่าง',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'หัวเรื่องการลา',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'รายละเอียดการลา',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0: รออนุมัติ\r\n1: อนุมัติ\r\n-1: ไม่อนุมัติ',
  `date_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'วันที่เริ่มลา',
  `date_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'วันที่สิ้นสุดการลา',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`leave_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  INDEX `leave_type_id`(`leave_type_id`) USING BTREE,
  CONSTRAINT `leave_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leave_ibfk_2` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leave_ibfk_3` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type` (`leave_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of leave
-- ----------------------------
INSERT INTO `leave` VALUES (41, 10, NULL, 6, 'ลากิจ', 'ไปธุระต่างจังหวัด', 0, '2/8/65', '3/8/65', '2022-08-06 21:21:13');
INSERT INTO `leave` VALUES (42, 10, NULL, 6, 'เดินทางต่างจังหวัด', 'ไปสัมนาต่างจังหวัด', 0, '2022-08-06', '2022-08-07', '2022-08-06 21:22:26');
INSERT INTO `leave` VALUES (43, 11, 8, NULL, 'ลาพักผ่อน', 'ไปหาญาติที่ต่างจังหวัด', 0, '1/8/65', '5/8/65', '2022-08-06 21:23:31');
INSERT INTO `leave` VALUES (44, 10, 8, NULL, 'ลากิจ', 'ลาไปต่างจังหวัด', 0, '2022-08-10', '2022-08-11', '2022-08-09 15:06:55');

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
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of leave_type
-- ----------------------------
INSERT INTO `leave_type` VALUES (9, 'ลาป่วย', 27, '2022-08-04 21:13:06');
INSERT INTO `leave_type` VALUES (10, 'ลากิจ', 27, '2022-08-04 21:13:27');
INSERT INTO `leave_type` VALUES (11, 'ลาพักร้อน', 27, '2022-08-04 21:14:28');

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (12, 'เดอะเบส 67P4+9C9 หอพัก เดอะ พ เล ส, ตำบล ขามเรียง อำเภอกันทรวิชัย มหาสารคาม 44150', 27, '2022-08-06 15:21:38');
INSERT INTO `location` VALUES (13, 'หมู่บ้านสโนวเฮ้าส์  336 ม.7 ต ตำบล ขามเรียง อำเภอกันทรวิชัย มหาสารคาม 44150', 27, '2022-08-06 20:26:09');
INSERT INTO `location` VALUES (14, 'หอพักเรืองฤทธิ์เรสซิเดนซ์ 271/1 m.3 t.thakonyang a, อำเภอกันทรวิชัย มหาสารคาม 44150', 27, '2022-08-06 21:20:00');
INSERT INTO `location` VALUES (15, 'หอพัก เจ เรสซิเดนซ์ J RESIDENCE 67P6+74C ตำบลท่าขอนยาง อำเภอกันทรวิชัย มหาสารคาม 44150', 27, '2022-08-06 21:20:36');

-- ----------------------------
-- Table structure for maid
-- ----------------------------
DROP TABLE IF EXISTS `maid`;
CREATE TABLE `maid`  (
  `maid_id` int NOT NULL AUTO_INCREMENT,
  `maid_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `maid_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `maid_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_tel` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maid_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `location_id` int NOT NULL,
  `status` tinyint NULL DEFAULT 1 COMMENT '0:ไม่สามารถใช้งาน 1:ใช้งานได้',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`maid_id`) USING BTREE,
  UNIQUE INDEX `maid_username`(`maid_username`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `maid_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of maid
-- ----------------------------
INSERT INTO `maid` VALUES (8, 'M001', 'img-1659869278048.jpeg', 'min', '$2a$10$l4FHmSXZX/KYH5YB9YNFp.stdCLNaO9MTV9qzfj6SUTz5kK.0BqTi', 'Siriwimon', 'Panno', '0123456789', 'Siriwimon@gmail.com', 12, 1, '2022-08-06 15:22:15');
INSERT INTO `maid` VALUES (10, 'M002', 'img-1659869133412.jpeg', 'nik', '$2a$10$iackSpBty5eTh5hkXFjBs.5oKRKAlIxbNafS.tku/So0vALWjsLu6', 'Suphatarachai', 'Rongsak', '0123456789', 'Suphatarachai@gmail.com', 15, 1, '2022-08-07 17:45:34');
INSERT INTO `maid` VALUES (12, 'M003', 'img-1659869278048.jpeg', 'unlimit', '$2a$10$lYHVDEUDwfQniblUZMXXPOL0Fm44r/V1OnrpOpPbdIbhFsTRCSVJC', 'unlimit', 'unlimit', '0123', 'unlimit@unlimit.com', 12, 1, '2022-08-07 18:15:36');
INSERT INTO `maid` VALUES (23, 'M004', 'img-1659869133412.jpeg', 'unlimited', '$2a$10$9WLlFrMW8/YciiDFDOhiie7vyJVdg/0V551BI/8XjMTdX4t9fFrRW', 'nuttasit', 'Unarn', '0123456789', 'unlimit@unlimit.com', 12, 1, '2022-08-07 19:38:47');
INSERT INTO `maid` VALUES (26, 'test', 'img-1659975977751.jpeg', 'test', '$2a$10$oXQUINZo9hWfpa0lBGo63uWudt47NLiWX2DPd.cG1V8ENDpGD7CL.', 'test', 'test', 'test', 'test@test.com', 12, 1, '2022-08-08 23:26:19');

-- ----------------------------
-- Table structure for maid_duty
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty`;
CREATE TABLE `maid_duty`  (
  `maid_duty_id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสตารางเวร',
  `maid_id` int NOT NULL,
  `date_week_id` int NOT NULL,
  `time_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`maid_duty_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  INDEX `date_week_id`(`date_week_id`) USING BTREE,
  CONSTRAINT `maid_duty_ibfk_1` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_ibfk_3` FOREIGN KEY (`date_week_id`) REFERENCES `date_week` (`date_week_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of maid_duty
-- ----------------------------
INSERT INTO `maid_duty` VALUES (5, 8, 1, '12:00', '15:00', '2022-08-04 20:28:35');
INSERT INTO `maid_duty` VALUES (7, 8, 2, '8:00', '12:00', '2022-08-05 20:29:10');
INSERT INTO `maid_duty` VALUES (8, 8, 3, '13:00', '17:00', '2022-08-06 21:26:04');

-- ----------------------------
-- Table structure for maid_duty_assign
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty_assign`;
CREATE TABLE `maid_duty_assign`  (
  `maid_duty_assign_id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสภาระงานแม่บ้าน',
  `maid_duty_id` int NULL DEFAULT NULL,
  `location_id` int NULL DEFAULT NULL,
  `room_id` int NULL DEFAULT NULL,
  `work_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_id_assign` int NULL DEFAULT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`maid_duty_assign_id`) USING BTREE,
  INDEX `maid_duity_id`(`maid_duty_id`) USING BTREE,
  INDEX `manager_id_assign`(`manager_id_assign`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  CONSTRAINT `maid_duty_assign_ibfk_1` FOREIGN KEY (`maid_duty_id`) REFERENCES `maid_duty` (`maid_duty_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_assign_ibfk_3` FOREIGN KEY (`manager_id_assign`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_assign_ibfk_4` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maid_duty_assign_ibfk_5` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of maid_duty_assign
-- ----------------------------
INSERT INTO `maid_duty_assign` VALUES (3, 5, 12, 11, 'ทำความสะอาดห้อง', 27, '2022-08-06 21:27:50');
INSERT INTO `maid_duty_assign` VALUES (4, 7, 13, 12, 'เช็ดกระจก', 27, '2022-08-06 21:28:28');
INSERT INTO `maid_duty_assign` VALUES (5, 8, 14, 13, 'ทำความสะอาด + ฆ่าเชื้อ', 27, '2022-08-06 21:28:44');
INSERT INTO `maid_duty_assign` VALUES (6, 5, 15, 14, 'ทำความสะอาดห้อง + เช็ดกระจก', 27, '2022-08-06 21:29:52');

-- ----------------------------
-- Table structure for maid_duty_check
-- ----------------------------
DROP TABLE IF EXISTS `maid_duty_check`;
CREATE TABLE `maid_duty_check`  (
  `maid_duty_check_id` int NOT NULL AUTO_INCREMENT,
  `maid_duty_assign_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0: ดำเนินการสำเร็จ\r\n1: หัวหน้างานตรวจสอบแล้ว',
  `finished_date` timestamp(0) NOT NULL DEFAULT current_timestamp(0) COMMENT 'เวลาที่ทำงานเสร็จสิ้น',
  `check_date` timestamp(0) NULL DEFAULT NULL COMMENT 'เวลาที่ทำการตรวจสอบ',
  PRIMARY KEY (`maid_duty_check_id`) USING BTREE,
  INDEX `maid_duty_assign_id`(`maid_duty_assign_id`) USING BTREE,
  CONSTRAINT `maid_duty_check_ibfk_1` FOREIGN KEY (`maid_duty_assign_id`) REFERENCES `maid_duty_assign` (`maid_duty_assign_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of maid_duty_material
-- ----------------------------

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager`  (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `manager_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `manager_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`manager_id`) USING BTREE,
  UNIQUE INDEX `manager_username`(`manager_username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES (27, 'img-1659734370614.jpeg', 'unlimit', '$2a$10$l4FHmSXZX/KYH5YB9YNFp.stdCLNaO9MTV9qzfj6SUTz5kK.0BqTi', 'unlimit', 'unarn', '0913747011', 'unlimit@gmail.com', '2022-08-06 04:19:31');
INSERT INTO `manager` VALUES (28, 'img-1659886896165.jpeg', 'test', '$2a$10$wZn.LzxeXXeT18fAZn0J7.7zFS9pMSNL8oPDfNT8lrunW/2GwXboO', 'test', 'test', '0123456789', 'test@test.com', '2022-08-07 22:41:37');

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material`  (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `material_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `material_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `material_quantity` int NULL DEFAULT NULL,
  `import_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of material
-- ----------------------------
INSERT INTO `material` VALUES (9, 'A009', 'โต๊ะ', 10, '6/8/65', 27, 6, 8, '2022-08-06 21:35:50');
INSERT INTO `material` VALUES (11, 'A011', 'แปรงขัดห้องน้ำ', 5, '6/8/65', 27, 6, 8, '2022-08-06 21:37:17');
INSERT INTO `material` VALUES (13, NULL, 'พัดลม', NULL, NULL, 27, 6, NULL, '2022-08-07 00:51:39');

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
  `status_maid` tinyint NOT NULL DEFAULT 0 COMMENT '0:ยังไม่อ่าน 1:อ่านแล้ว',
  `status_engineer` tinyint NULL DEFAULT 0,
  `status_manager` tinyint NULL DEFAULT 0,
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
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notify
-- ----------------------------
INSERT INTO `notify` VALUES (27, 27, NULL, 6, 42, NULL, NULL, NULL, NULL, NULL, 0, 1, 0, '2022-08-06 21:22:27');
INSERT INTO `notify` VALUES (28, 27, 8, NULL, 44, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, '2022-08-09 15:06:55');

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
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '-2: ไม่สามารถดำเนินการได้\r\n-1: ไม่อนุมัติ/ปฏิเสธ\r\n0: รอหัวหน้าดำเนินการ \r\n1: อนุมัติ รอช่างรับงาน\r\n2: กำลังดำเนินการ\r\n3: ดำเนินการเสร็จสิ้น\r\n\r\n',
  `notify_repair_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `engineer_dept_id` int NULL DEFAULT NULL,
  `engineer_id` int NULL DEFAULT NULL,
  `define_date_by_engineer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'กำหนดเวลาของช่าง',
  `finished_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'วันที่ซ่อมสำเร็จ',
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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notify_repair
-- ----------------------------
INSERT INTO `notify_repair` VALUES (12, 8, 12, 11, 'ขาโต๊ะหัก', NULL, 0, '6/8/65', 5, 6, NULL, NULL, '2022-08-06 21:55:32');
INSERT INTO `notify_repair` VALUES (15, 8, 13, 12, 'อ่างล้างหน้าชำรุด', NULL, 0, '7/8/65', 7, 6, NULL, NULL, '2022-08-06 21:56:30');
INSERT INTO `notify_repair` VALUES (16, 8, 14, 13, 'ลูกบิดประตูเปิดไม่ได้', NULL, 0, '7/8/65', 5, 6, NULL, NULL, '2022-08-06 21:57:56');
INSERT INTO `notify_repair` VALUES (17, 8, 15, 14, 'กระจกประตูร้าว', NULL, 0, '8/8/65', 7, 6, NULL, NULL, '2022-08-06 21:58:55');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notify_repair_material
-- ----------------------------
INSERT INTO `notify_repair_material` VALUES (6, 12, 9, 1, '2022-08-06 22:00:11');
INSERT INTO `notify_repair_material` VALUES (8, 16, 11, 1, '2022-08-06 22:03:20');

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
  `unit_price` decimal(10, 2) NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0:รออนุมัติ 1:อนุมัติ -1:ไม่อนุมัติ',
  `is_stock` tinyint NULL DEFAULT NULL COMMENT '0:ไม่มีในสต็อก 1:มีในสต็อก',
  `order_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  INDEX `engineer_id`(`engineer_id`) USING BTREE,
  INDEX `maid_id`(`maid_id`) USING BTREE,
  CONSTRAINT `order_material_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_material_ibfk_2` FOREIGN KEY (`engineer_id`) REFERENCES `engineer` (`engineer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_material_ibfk_3` FOREIGN KEY (`maid_id`) REFERENCES `maid` (`maid_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order_material
-- ----------------------------
INSERT INTO `order_material` VALUES (8, 9, 6, 8, 10, 5000.00, 0, NULL, '', '2022-08-06 22:04:29');
INSERT INTO `order_material` VALUES (10, 11, 6, 8, 15, 10000.00, 0, NULL, '', '2022-08-06 22:05:32');
INSERT INTO `order_material` VALUES (19, 13, 6, NULL, 5, 275.00, 0, 0, '2022-7-7', '2022-08-07 00:51:39');
INSERT INTO `order_material` VALUES (21, 9, NULL, 8, 1, 12.00, 0, 1, '2022-7-7', '2022-08-07 01:38:05');

-- ----------------------------
-- Table structure for outside_engineer
-- ----------------------------
DROP TABLE IF EXISTS `outside_engineer`;
CREATE TABLE `outside_engineer`  (
  `outside_engineer_id` int NOT NULL AUTO_INCREMENT,
  `manager_id` int NULL DEFAULT NULL,
  `dept_id` int NOT NULL,
  `outside_engineer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `outside_engineer_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `outside_engineer_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `outside_engineer_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `outside_engineer_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`outside_engineer_id`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  CONSTRAINT `outside_engineer_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `engineer_department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outside_engineer_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of outside_engineer
-- ----------------------------
INSERT INTO `outside_engineer` VALUES (5, 27, 8, 'test', 'test', 'img-1659870862226.jpeg', 'test', 'test', '2022-08-07 22:13:44');

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (11, '314', 12, '2022-08-05 20:31:42');
INSERT INTO `room` VALUES (12, 'C3', 13, '2022-08-06 20:32:15');
INSERT INTO `room` VALUES (13, 'A1', 14, '2022-08-06 21:26:55');
INSERT INTO `room` VALUES (14, '512', 15, '2022-08-06 21:27:09');

-- ----------------------------
-- Table structure for spacial_event
-- ----------------------------
DROP TABLE IF EXISTS `spacial_event`;
CREATE TABLE `spacial_event`  (
  `spacial_id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `room_id` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `event_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `finished_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint NULL DEFAULT NULL COMMENT '0:รอดำเนินการ 1: ดำเนินการเสร็จสิ้น',
  `time_reg` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`spacial_id`) USING BTREE,
  INDEX `location_id`(`location_id`) USING BTREE,
  INDEX `room_id`(`room_id`) USING BTREE,
  CONSTRAINT `spacial_event_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `spacial_event_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of spacial_event
-- ----------------------------
INSERT INTO `spacial_event` VALUES (6, 12, 11, 'ทำความสะอาดชั้น 4 ของตึก', '5/8/65', '5/8/65', NULL, '2022-08-06 21:44:02');
INSERT INTO `spacial_event` VALUES (7, 13, 12, 'ทำความสะอาดออฟฟิต', '6/8/65', '6/8/65', NULL, '2022-08-06 21:44:57');
INSERT INTO `spacial_event` VALUES (8, 14, 13, 'จัดเลี้ยง', '6/8/65', '7/8/65', NULL, '2022-08-06 21:47:51');
INSERT INTO `spacial_event` VALUES (9, 15, 14, 'รับน้อง', '7/8/65', '7/8/65', NULL, '2022-08-06 21:48:36');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (5, 'team A', 6, '2022-08-06 21:49:33');
INSERT INTO `team` VALUES (6, 'team B', 7, '2022-08-06 21:50:03');
INSERT INTO `team` VALUES (8, 'team C', 8, '2022-08-06 21:50:25');
INSERT INTO `team` VALUES (9, 'team  D', 9, '2022-08-06 21:50:52');

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of team_material
-- ----------------------------
INSERT INTO `team_material` VALUES (4, 5, 9, 2, '2022-08-06 22:06:59');
INSERT INTO `team_material` VALUES (6, 8, 11, 1, '2022-08-06 22:07:38');

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
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of team_member
-- ----------------------------
INSERT INTO `team_member` VALUES (6, 8, NULL, 5, '2022-08-06 22:08:27');
INSERT INTO `team_member` VALUES (8, NULL, 6, 6, '2022-08-06 22:08:49');

-- ----------------------------
-- Table structure for test_calendar
-- ----------------------------
DROP TABLE IF EXISTS `test_calendar`;
CREATE TABLE `test_calendar`  (
  `calendar_id` int NOT NULL AUTO_INCREMENT,
  `calendar_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `all_day` tinyint NULL DEFAULT 1,
  `time_reg` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`calendar_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of test_calendar
-- ----------------------------
INSERT INTO `test_calendar` VALUES (1, 'test', NULL, NULL, 1, '2022-07-07 15:38:33');
INSERT INTO `test_calendar` VALUES (2, 'test', NULL, NULL, 1, '2022-07-07 15:39:29');
INSERT INTO `test_calendar` VALUES (3, 'test', '2022-07-11', '2022-07-14', 1, '2022-07-07 15:40:35');
INSERT INTO `test_calendar` VALUES (4, 'test', '2022-07-13', '2022-07-14', 1, '2022-07-07 15:45:00');
INSERT INTO `test_calendar` VALUES (5, 'test2', '2022-07-14', '2022-07-15', 1, '2022-07-07 16:00:49');
INSERT INTO `test_calendar` VALUES (6, '1234', '2022-07-11', '2022-07-15', 1, '2022-07-07 16:00:55');
INSERT INTO `test_calendar` VALUES (7, 'calendar', '2022-07-05', '2022-07-07', 1, '2022-07-07 16:29:16');
INSERT INTO `test_calendar` VALUES (8, 'test time', '2022-07-04T06:00:00+07:00', '2022-07-04T08:00:00+07:00', 0, '2022-07-07 16:49:09');
INSERT INTO `test_calendar` VALUES (9, 'test 2', '2022-07-04T06:00:00+07:00', '2022-07-04T08:30:00+07:00', 0, '2022-07-07 23:16:37');
INSERT INTO `test_calendar` VALUES (10, 'test2', '2022-07-04T06:00:00+07:00', '2022-07-04T08:30:00+07:00', 0, '2022-07-07 23:17:00');
INSERT INTO `test_calendar` VALUES (11, 'test', '2022-07-05T06:30:00+07:00', '2022-07-05T09:00:00+07:00', 0, '2022-07-07 23:18:45');
INSERT INTO `test_calendar` VALUES (12, '1', '2022-07-06T06:30:00+07:00', '2022-07-06T07:00:00+07:00', 0, '2022-07-07 23:19:40');
INSERT INTO `test_calendar` VALUES (13, '2', '2022-07-06T07:00:00+07:00', '2022-07-06T07:30:00+07:00', 0, '2022-07-07 23:19:52');
INSERT INTO `test_calendar` VALUES (14, 'work', '2022-07-07', '2022-07-08', 1, '2022-07-09 22:18:26');

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
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of urgent_work
-- ----------------------------
INSERT INTO `urgent_work` VALUES (7, 5, NULL, NULL, 6, '2022-08-09 15:28:28');
INSERT INTO `urgent_work` VALUES (8, NULL, 5, 23, NULL, '2022-08-09 15:28:57');
INSERT INTO `urgent_work` VALUES (9, NULL, 7, 23, NULL, '2022-08-09 15:29:28');
INSERT INTO `urgent_work` VALUES (10, 6, NULL, 23, NULL, '2022-08-09 16:04:53');

SET FOREIGN_KEY_CHECKS = 1;
