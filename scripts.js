// ตรวจสอบตำแหน่งการเลื่อนและเปลี่ยนแปลง class sticky
window.addEventListener('scroll', function() { // เมื่อเลื่อนหน้าจอจะเรียกใช้ฟังก์ชันนี้
    const navbar = document.getElementById('navbar'); // ดึง element ที่มี id เป็น 'navbar'
    if (window.scrollY > 50) { // ถ้าตำแหน่งการเลื่อนมากกว่า 50
        navbar.classList.add('sticky'); // เพิ่ม class 'sticky' เพื่อทำให้ navbar ติดอยู่ด้านบน
    } else { // ถ้าตำแหน่งเลื่อนน้อยกว่าหรือเท่ากับ 50
        navbar.classList.remove('sticky'); // เอา class 'sticky' ออก
    }
});

// ฟังก์ชันสำหรับนำทางไปยังหน้าเว็บต่าง ๆ
function goToPage(page) { // page คือลิงก์ของหน้าเว็บที่ต้องการไป
    window.location.href = page; // เปลี่ยนหน้าไปตาม URL ที่ระบุ
}

// ฟังก์ชันสำหรับอัปเดตเวลาปัจจุบัน
function updateTime() {
    const now = new Date(); // ดึงเวลาปัจจุบัน
    const options = { // กำหนดรูปแบบเวลา
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // ใช้รูปแบบเวลา 24 ชั่วโมง
    };
    document.getElementById('time').innerText = 'Time: ' + now.toLocaleTimeString('en-US', options); // แสดงเวลาใน element ที่มี id 'time'
}

setInterval(updateTime, 1000); // เรียกฟังก์ชันอัปเดตเวลาใหม่ทุก 1 วินาที
updateTime(); // เรียกฟังก์ชันทันทีเมื่อโหลดหน้าเว็บ

// ข้อมูลสำหรับ Chart.js
const labels = []; // อาร์เรย์สำหรับเก็บข้อมูลเวลาที่ใช้บนแกน x
const temperatureData = []; // อาร์เรย์สำหรับข้อมูลอุณหภูมิ
const humidityData = []; // อาร์เรย์สำหรับข้อมูลความชื้น
const irradianceData = []; // อาร์เรย์สำหรับข้อมูลพลังงานแสง
const voltageData = []; // อาร์เรย์สำหรับข้อมูลแรงดันไฟฟ้า
const currentData = []; // อาร์เรย์สำหรับข้อมูลกระแสไฟฟ้า
const powerData = []; // อาร์เรย์สำหรับข้อมูลกำลังไฟฟ้า

const temperatureCtx = document.getElementById('temperatureChart').getContext('2d'); // ดึง canvas สำหรับกราฟอุณหภูมิ
const humidityCtx = document.getElementById('humidityChart').getContext('2d'); // ดึง canvas สำหรับกราฟความชื้น
const irradianceCtx = document.getElementById('irradianceChart').getContext('2d'); // ดึง canvas สำหรับกราฟพลังงานแสง
const voltageCtx = document.getElementById('voltageChart').getContext('2d'); // ดึง canvas สำหรับกราฟแรงดันไฟฟ้า
const currentCtx = document.getElementById('currentChart').getContext('2d'); // ดึง canvas สำหรับกราฟกระแสไฟฟ้า
const powerCtx = document.getElementById('powerChart').getContext('2d'); // ดึง canvas สำหรับกราฟกำลังไฟฟ้า

// สร้างกราฟอุณหภูมิ
const temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                min: -10, // กำหนดค่าน้อยสุดของแกน y
                max: 50,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // แสดงทศนิยม 1 ตำแหน่ง
                    }
                }
            }
        }
    }
});

const humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Humidity (%)',
            data: humidityData,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Humidity (%)'
                },
                min: 0, // กำหนดค่าน้อยสุดของแกน y
                max: 150,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // แสดงทศนิยม 1 ตำแหน่ง
                    }
                }
            }
        }
    }
});

const irradianceChart = new Chart(irradianceCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Irradiance (W/m²)',
            data: irradianceData,
            borderColor: 'rgba(59, 235, 24)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Irradiance (W/m²)'
                },
                min: 0, // กำหนดค่าน้อยสุดของแกน y
                max: 1500,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(3); // แสดงทศนิยม 2 ตำแหน่ง
                    }
                }
            }
        }
    }
});

const voltageChart = new Chart(voltageCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Voltage (V)',
            data: voltageData,
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Voltage (V)'
                },
                min: 0, // กำหนดค่าน้อยสุดของแกน y
                max: 50,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // แสดงทศนิยม 1 ตำแหน่ง
                    }
                }
            }
        }
    }
});

const currentChart = new Chart(currentCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Current (A)',
            data: currentData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Current (A)'
                },
                min: 0, // กำหนดค่าน้อยสุดของแกน y
                max: 50,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // แสดงทศนิยม 1 ตำแหน่ง
                    }
                }
            }
        }
    }
});

const powerChart = new Chart(powerCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Power (W)',
            data: powerData,
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true, // ทำให้กราฟยืดหยุ่น
        maintainAspectRatio: false, // ยกเลิกการรักษาสัดส่วนเดิม
        plugins: {
            legend: {
                position: 'top', // ตำแหน่งของคำอธิบายกราฟ
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Power (W)'
                },
                min: 0, // กำหนดค่าน้อยสุดของแกน y
                max: 1200,  // กำหนดค่ามากสุดของแกน y
                ticks: {
                    callback: function(value) {
                        return value.toFixed(1); // แสดงทศนิยม 1 ตำแหน่ง
                    }
                }
            }
        }
    }
});


// การสร้างกราฟความชื้น, พลังงานแสง, แรงดันไฟฟ้า, กระแสไฟฟ้า, และกำลังไฟฟ้า จะใช้รูปแบบคล้ายกันกับกราฟอุณหภูมิด้านบน โดยเปลี่ยนเฉพาะชื่อและข้อมูลที่ใช้แสดงเท่านั้น

// ฟังก์ชันสำหรับดึงข้อมูลเริ่มต้น 12 จุดจาก fetch_12hour.php
function StartFetchData() {
    fetch('fetch_10point.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                data.forEach(item => {
                    const dateTimeString = `${item.date} ${item.time}`;
                    const dateObject = new Date(dateTimeString);

                    // ตรวจสอบว่ามีค่าที่ถูกต้องก่อนแสดงในกราฟ
                    if (!isNaN(dateObject.getTime())) {
                        const time = dateObject.toLocaleTimeString('en-UK', {
                            hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Bangkok'
                        });

                        // เพิ่มข้อมูลในกราฟ
                        labels.push(time);
                        temperatureData.push(item.temperature);
                        humidityData.push(item.humidity);
                        irradianceData.push(item.irradiance);
                        voltageData.push(item.voltage);
                        currentData.push(item.current);
                        powerData.push(item.power);
                    } else {
                        console.error("Invalid Date:", dateTimeString);
                    }
                });

                // อัปเดตกราฟทั้งหมดหลังจากเพิ่มข้อมูลเริ่มต้น
                updateCharts();
            }
        })
        .catch(error => console.error('Error fetching initial data:', error));
}

// // ฟังก์ชันสำหรับดึงข้อมูลใหม่ 1 แถวจาก fetch_data.php และทำการ shift ข้อมูลถ้าเกิน 12 จุด
// function fetchchart() {
//     const now = new Date();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();

//     // ตรวจสอบว่าตรงกับชั่วโมงเต็มหรือไม่ (นาทีและวินาทีเป็น 00)
//     if (minutes === 0 && seconds === 0) {
//         fetch('fetch_data.php')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.length > 0) {
//                     const latestData = data[0];
//                     const dateTimeString = `${latestData.date} ${latestData.time}`;
//                     const dateObject = new Date(dateTimeString);

//                     if (!isNaN(dateObject.getTime())) {
//                         const time = dateObject.toLocaleTimeString('en-UK', {
//                             hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Bangkok'
//                         });

//                         // เพิ่มข้อมูลใหม่ลงในกราฟ
//                         labels.push(time);
//                         temperatureData.push(latestData.temperature);
//                         humidityData.push(latestData.humidity);
//                         irradianceData.push(latestData.irradiance);
//                         voltageData.push(latestData.voltage);
//                         currentData.push(latestData.current);
//                         powerData.push(latestData.power);

//                         // ตรวจสอบและ shift ข้อมูลถ้าเกิน 12 จุด
//                         if (labels.length > 12) labels.shift();
//                         if (temperatureData.length > 12) temperatureData.shift();
//                         if (humidityData.length > 12) humidityData.shift();
//                         if (irradianceData.length > 12) irradianceData.shift();
//                         if (voltageData.length > 12) voltageData.shift();
//                         if (currentData.length > 12) currentData.shift();
//                         if (powerData.length > 12) powerData.shift();

//                         // อัปเดตกราฟทั้งหมด
//                         updateCharts();

//                     } else {
//                         console.error("Invalid Date:", dateTimeString);
//                     }
//                 }
//             })
//             .catch(error => console.error('Error fetching real-time data:', error));
//     }
// }

// ฟังก์ชันสำหรับดึงข้อมูลใหม่ 1 แถวจาก fetch_realtime.php ทุกๆ 5 วินาที เพื่อแสดงค่าล่าสุด
function fetchRealTimeData() {
    fetch('fetch_realtime.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const latestData = data[0];
                const dateTimeString = `${latestData.date} ${latestData.time}`;
                const dateObject = new Date(dateTimeString);

                if (!isNaN(dateObject.getTime())) {
                    const time = dateObject.toLocaleTimeString('en-UK', {
                        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Bangkok'
                    });
                    // เพิ่มข้อมูลใหม่ลงในกราฟ
                        labels.push(time);
                        temperatureData.push(latestData.temperature);
                        humidityData.push(latestData.humidity);
                        irradianceData.push(latestData.irradiance);
                        voltageData.push(latestData.voltage);
                        currentData.push(latestData.current);
                        powerData.push(latestData.power);

                        // ตรวจสอบและ shift ข้อมูลถ้าเกิน 12 จุด
                        if (labels.length > 12) labels.shift();
                        if (temperatureData.length > 12) temperatureData.shift();
                        if (humidityData.length > 12) humidityData.shift();
                        if (irradianceData.length > 12) irradianceData.shift();
                        if (voltageData.length > 12) voltageData.shift();
                        if (currentData.length > 12) currentData.shift();
                        if (powerData.length > 12) powerData.shift();

                        // อัปเดตกราฟทั้งหมด
                        updateCharts();
                    // แสดงข้อมูลล่าสุดบนหน้าเว็บ
                    document.getElementById('temperature').innerText = 'Temperature: ' + latestData.temperature + ' °C';
                    document.getElementById('humidity').innerText = 'Humidity: ' + latestData.humidity + ' %';
                    document.getElementById('irradiance').innerText = 'Irradiance: ' + latestData.irradiance + ' W/m²';
                    document.getElementById('voltage').innerText = 'Voltage: ' + latestData.voltage + ' V';
                    document.getElementById('current').innerText = 'Current: ' + latestData.current + ' A';
                    document.getElementById('power').innerText = 'Power: ' + latestData.power + ' W';
                } else {
                    console.error("Invalid Date:", dateTimeString);
                }
            }
        })
        .catch(error => console.error('Error fetching real-time data:', error));
}

// ฟังก์ชันสำหรับดึงข้อมูลจาก fetch_data.php ทุกๆ 5 วินาทีเพื่ออัปเดตตาราง
function TablefetchData() {
    fetch('fetch_5min.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // อัปเดตข้อมูลในตาราง
            const tableBody = document.getElementById('sensorTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            data.forEach(item => {
                const newRow = tableBody.insertRow();
                newRow.innerHTML = `
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.temperature}</td>
                    <td>${item.humidity}</td>
                    <td>${item.irradiance}</td>
                    <td>${item.voltage}</td>
                    <td>${item.current}</td>
                    <td>${item.power}</td>
                    <td>${item.id}</td>
                `;
            });
        })
        .catch(error => console.error('Error fetching table data:', error));
}

// ฟังก์ชันสำหรับอัปเดตกราฟทั้งหมด
function updateCharts() {
    temperatureChart.update();
    humidityChart.update();
    irradianceChart.update();
    voltageChart.update();
    currentChart.update();
    powerChart.update();
}

// เรียกใช้ StartFetchData ครั้งแรกเพื่อดึงข้อมูล 12 จุดเริ่มต้น
StartFetchData();
// เรียกใช้ fetchRealTimeData ครั้งแรกเพื่อดึงข้อมูล
fetchRealTimeData();
// เรียกใช้ TablefetchData ครั้งแรกเพื่อดึงข้อมูล
TablefetchData();
// ตั้งค่าการดึงข้อมูลฟังก์ชันต่างๆ
setInterval(fetchRealTimeData, 5000); // ดึงข้อมูลล่าสุดทุกๆ 5 วินาที
setInterval(TablefetchData, 5000);     // อัปเดตตารางทุกๆ 5 วินาที
setInterval(fetchchart, 1000 * 60);     // ตรวจสอบการดึงข้อมูลใหม่ที่ชั่วโมงเต็ม