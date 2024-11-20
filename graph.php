<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ข้อมูลการเชื่อมต่อกับฐานข้อมูล
$servername = "192.168.1.102";
$username = "root"; // ชื่อผู้ใช้ MySQL
$password = "Noname6547"; // รหัสผ่าน MySQL
$dbname = "sensor_db"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
}

// คำสั่ง SQL เพื่อดึงข้อมูลทั้งหมดจาก sensor
$sql = "SELECT * FROM sensor ORDER BY CONCAT(date, ' ', time) DESC"; // อัปเดตชื่อคอลัมน์ตามที่คุณมี
$result = $conn->query($sql);

// อาร์เรย์สำหรับเก็บข้อมูลที่ต้องการ
$finalData = [];
$current_time = time(); // เวลาปัจจุบัน
$one_hour = 3600; // 1 ชั่วโมง = 3600 วินาที

if ($result->num_rows > 0) {
    // ดึงข้อมูลแต่ละแถวมา
    while ($row = $result->fetch_assoc()) {
        $timestamp = strtotime($row['date'] . ' ' . $row['time']); // สร้าง timestamp จากวันที่และเวลา

        // ตรวจสอบว่าเวลานั้นไม่เกิน 1 ชั่วโมง
        if (($current_time - $timestamp) <= $one_hour) {
            $finalData[] = $row; // เก็บข้อมูลที่ตรงตามเงื่อนไข
        }
    }
}

// แปลงข้อมูลเป็น JSON และส่งออก
header('Content-Type: application/json');
echo json_encode($finalData);

// ปิดการเชื่อมต่อ
$conn->close();
?>
