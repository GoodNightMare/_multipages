import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      {/* ซ้ายบน */}
      <div id='img-profile'></div>

      {/* ขวาบน */}
      <div className='text-profile'>
        <p className='title-profile'>ประวัติส่วนตัว</p>
        <p><span className='topic'>ชื่อ</span> : นาย นนท์ธีร์ ปานะถึก</p>
        <p><span className='topic'>ชื่อเล่น</span> : ไนท์</p>
        <p><span className='topic'>รหัสนักศึกษา</span> : 66073169</p>
        <p><span className='topic'>วันเกิด</span> : 1 กุมภาพันธ์ พ.ศ. 2548</p>
        <p><span className='topic'>งานอดิเรก</span> : เล่นเกม ฟังเพลง </p>
      </div>
      <div className='text-profile'>
        <p className='title-profile'>Contact</p>
        <p><span className='topic'>Tel</span> : 098-898-0414</p>
        <p><span className='topic'>Email</span> : nonthee.night@gmail.com</p>
        <p><span className='topic'>Facebook</span> : <a href='https://www.facebook.com/profile.php?id=100005081730680&mibextid=LQQJ4d' target='_blank' className='topic-link'>นนท์ธีร์ ปานะถึก</a></p>
        <p><span className='topic'>Instagram</span> :  <a href='https://www.instagram.com/nnight_yy/profilecard/?igsh=eGZ2bG51dDEzbWht' target='_blank' className='topic-link'>nnight_yy</a></p>
      </div>

      {/* ล่าง */}
      <div className='more-profile'>
        <p className='topic'>ความสามารถพิเศษ</p>
        <ul>
          <li>คณิตศาสตร์</li>
          <li>A-Math</li>
          <li>เทควันโด</li>
          <li>แบดมินตัน</li>
          <li>ถ่ายรูป</li>
        </ul>
      </div>

    </div>
  )
}

export default Home