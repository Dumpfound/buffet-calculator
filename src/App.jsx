import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [adults, setAdults] = useState('')
  const [children, setChildren] = useState('')
  const [drinkType, setDrinkType] = useState('refill') // 'refill' | 'bottle'
  const [plainWater, setPlainWater] = useState('')
  const [softDrink, setSoftDrink] = useState('')
  const [discount, setDiscount] = useState(0) // 0, 10, 15, 20
  const [total, setTotal] = useState(0)
  const [errors, setErrors] = useState({})

  const ADULT_PRICE = 299
  const CHILD_PRICE = 89
  const REFILL_PRICE = 29
  const PLAIN_WATER_PRICE = 10
  const SOFT_DRINK_PRICE = 25

  const validate = () => {
    const newErrors = {}
    const adultNum = adults === '' ? null : Number(adults)
    const childNum = children === '' ? null : Number(children)

    if (adults === '' && children === '') {
      newErrors.people = 'กรุณาป้อนจำนวนผู้ใหญ่ หรือจำนวนเด็ก'
    } else {
      if (adults !== '' && (isNaN(adultNum) || adultNum < 0 || !Number.isInteger(adultNum))) {
        newErrors.adults = 'จำนวนผู้ใหญ่ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'
      }
      if (children !== '' && (isNaN(childNum) || childNum < 0 || !Number.isInteger(childNum))) {
        newErrors.children = 'จำนวนเด็กต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'
      }
    }

    if (drinkType === 'bottle') {
      if (plainWater !== '') {
        const waterNum = Number(plainWater)
        if (isNaN(waterNum) || waterNum < 0 || !Number.isInteger(waterNum)) {
          newErrors.plainWater = 'จำนวนน้ำเปล่าต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'
        }
      }
      if (softDrink !== '') {
        const softNum = Number(softDrink)
        if (isNaN(softNum) || softNum < 0 || !Number.isInteger(softNum)) {
          newErrors.softDrink = 'จำนวนน้ำอัดลมต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = () => {
    if (!validate()) {
      setTotal(0)
      return
    }

    const adultNum = adults === '' ? 0 : Number(adults)
    const childNum = children === '' ? 0 : Number(children)
    const totalPeople = adultNum + childNum

    // ค่าอาหาร
    let foodTotal = adultNum * ADULT_PRICE + childNum * CHILD_PRICE

    // ส่วนลดเฉพาะค่าอาหาร
    const discountAmount = foodTotal * (discount / 100)
    foodTotal = foodTotal - discountAmount

    // ค่าเครื่องดื่ม
    let drinkTotal = 0
    if (drinkType === 'refill') {
      drinkTotal = totalPeople * REFILL_PRICE
    } else {
      const waterNum = plainWater === '' ? 0 : Number(plainWater)
      const softNum = softDrink === '' ? 0 : Number(softDrink)
      drinkTotal = waterNum * PLAIN_WATER_PRICE + softNum * SOFT_DRINK_PRICE
    }

    setTotal(foodTotal + drinkTotal)
  }

  const handleReset = () => {
    setAdults('')
    setChildren('')
    setDrinkType('refill')
    setPlainWater('')
    setSoftDrink('')
    setDiscount(0)
    setTotal(0)
    setErrors({})
  }

  const handleDrinkTypeChange = (type) => {
    setDrinkType(type)
    if (type === 'refill') {
      setPlainWater('')
      setSoftDrink('')
    }
  }

  const isBottleDisabled = drinkType === 'refill'

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Buffet Calculator</h1>
        <p className="subtitle">คำนวณค่าอาหารบุฟเฟต์</p>

        <div className="logo">
          <img src={logo} alt="Buffet Logo" className="logo-img" />
        </div>

        {/* จำนวนผู้ใหญ่ */}
        <div className="form-group">
          <label htmlFor="adults">จำนวนผู้ใหญ่ (คนละ 299 บาท)</label>
          <input
            id="adults"
            type="number"
            min="0"
            step="1"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className={errors.adults || errors.people ? 'error' : ''}
          />
          {errors.adults && <span className="error-text">{errors.adults}</span>}
        </div>

        {/* จำนวนเด็ก */}
        <div className="form-group">
          <label htmlFor="children">จำนวนเด็ก (คนละ 89 บาท)</label>
          <input
            id="children"
            type="number"
            min="0"
            step="1"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            className={errors.children || errors.people ? 'error' : ''}
          />
          {errors.children && <span className="error-text">{errors.children}</span>}
          {errors.people && <span className="error-text">{errors.people}</span>}
        </div>

        {/* เครื่องดื่ม */}
        <div className="form-group">
          <label className="section-label">เครื่องดื่ม</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="drinkType"
                value="refill"
                checked={drinkType === 'refill'}
                onChange={() => handleDrinkTypeChange('refill')}
              />
              <span>น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="drinkType"
                value="bottle"
                checked={drinkType === 'bottle'}
                onChange={() => handleDrinkTypeChange('bottle')}
              />
              <span>เครื่องดื่มแบบขวด</span>
            </label>
          </div>
        </div>

        {/* จำนวนน้ำเปล่า - แสดงเสมอ แต่ disable เมื่อเลือกรีฟิล */}
        <div className="form-group">
          <label htmlFor="plainWater">จำนวนน้ำเปล่า (ขวดละ 10 บาท)</label>
          <input
            id="plainWater"
            type="number"
            min="0"
            step="1"
            value={plainWater}
            onChange={(e) => setPlainWater(e.target.value)}
            disabled={isBottleDisabled}
            className={`${errors.plainWater ? 'error' : ''} ${isBottleDisabled ? 'disabled-input' : ''}`}
          />
          {errors.plainWater && <span className="error-text">{errors.plainWater}</span>}
        </div>

        {/* จำนวนน้ำอัดลม */}
        <div className="form-group">
          <label htmlFor="softDrink">จำนวนน้ำอัดลม (ขวดละ 25 บาท)</label>
          <input
            id="softDrink"
            type="number"
            min="0"
            step="1"
            value={softDrink}
            onChange={(e) => setSoftDrink(e.target.value)}
            disabled={isBottleDisabled}
            className={`${errors.softDrink ? 'error' : ''} ${isBottleDisabled ? 'disabled-input' : ''}`}
          />
          {errors.softDrink && <span className="error-text">{errors.softDrink}</span>}
        </div>

        {/* บัตรส่วนลด */}
        <div className="form-group">
          <label htmlFor="discount">บัตรส่วนลด</label>
          <select
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          >
            <option value={0}>ไม่มีส่วนลด</option>
            <option value={10}>ส่วนลด 10%</option>
            <option value={15}>ส่วนลด 15%</option>
            <option value={20}>ส่วนลด 20%</option>
          </select>
          <p className="discount-note">ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม</p>
        </div>

        {/* ปุ่ม */}
        <div className="button-group">
          <button type="button" className="btn-calculate" onClick={handleCalculate}>
            คำนวณ
          </button>
          <button type="button" className="btn-reset" onClick={handleReset}>
            รีเซ็ต
          </button>
        </div>

        {/* ผลลัพธ์ */}
        <div className="result">
          ยอดชำระทั้งหมด <span className="amount">{total.toFixed(2)}</span> บาท
        </div>
      </div>
    </div>
  )
}

export default App
