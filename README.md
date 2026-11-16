# Buffet Calculator

เว็บแอปคำนวณค่าอาหารบุฟเฟต์ (React + Vite)

## คุณสมบัติ

- ป้อนจำนวนผู้ใหญ่ (299 บาท/คน) และจำนวนเด็ก (89 บาท/คน)
- เลือกเครื่องดื่ม:
  - **น้ำรีฟิล** คนละ 29 บาท (ผู้ใหญ่ + เด็ก) → ไม่สามารถป้อนจำนวนน้ำเปล่า/น้ำอัดลมได้
  - **เครื่องดื่มแบบขวด** → ป้อนจำนวนน้ำเปล่า (10 บาท/ขวด) และน้ำอัดลม (25 บาท/ขวด) ได้
- เลือกบัตรส่วนลด: ไม่มีส่วนลด / 10% / 15% / 20%  
  (ลดเฉพาะค่าอาหาร ไม่รวมเครื่องดื่ม)
- ปุ่ม **คำนวณ** พร้อม Validate UI
- ปุ่ม **รีเซ็ต** กลับสู่สถานะเริ่มต้น

## วิธีรัน

```bash
cd buffet-calculator
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:5173

## Build สำหรับ Production

```bash
npm run build
```

ไฟล์จะอยู่ในโฟลเดอร์ `dist/` แล้วนำไป Deploy บน Vercel ได้เลย

## Deploy บน Vercel

1. Push โปรเจกต์ขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → New Project → Import จาก GitHub
3. Framework Preset เลือก Vite แล้ว Deploy

## โครงสร้างโปรเจกต์

```
buffet-calculator/
├── src/
│   ├── App.jsx      # หน้าหลัก + logic คำนวณ
│   ├── App.css      # สไตล์
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
