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
// คำสั่ง SQL เพื่อดึงข้อมูล 1 ชั่วโมงล่าสุด
$sql = "SELECT * FROM sensor WHERE CONCAT(date, ' ', time) >= CURRENT_TIMESTAMP - INTERVAL 5 MINUTE ORDER BY CONCAT(date, ' ', time) DESC";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    // ดึงข้อมูลแต่ละแถวมาใส่ในอาร์เรย์
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// แปลงข้อมูลเป็น JSON และส่งออก
echo json_encode($data);

// ปิดการเชื่อมต่อ
$conn->close();
?>
