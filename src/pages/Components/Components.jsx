import React from 'react'
import Add from './Add/Add'
import './Components.css'
import Timer from './Timer/timer'
import Counter from './Counter/Counter'
import Temperature from './Temperature/Temperature'

function Components() {
  return (
    <div className='container-components'>
      <p className='title-component'>react components</p>
      <div className='counterAndTimer'>
        <div className='Counter'>
          <Counter name={'Counter'} number={10}/>
        </div>
        <div className='Timer'>
          <Timer value={10} name={'Night'}/>
        </div>
      </div>
      <div className='Add'>
        <Add aValue={10} bValue={20} name={'Addition'}/>
      </div>
      <div className='Temperature'>
        <Temperature cValue={10} name={'Temperature'}/>
      </div>
      
      <p className='title-component'>นายนนท์ธีร์ ปานะถึก รหัส 66073169</p>
    </div>
  )
}

export default Components