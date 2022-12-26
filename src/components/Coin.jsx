import React from 'react'
import { Link } from 'react-router-dom'

export default function Coin(props) {
  const cn = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Link className='w-1full h-[15vh] flex items-center border-b-solid border-b-[1px] border-b-gray-200 2xl:h-[10vh]' to={`/${props?.id}`}>
      <div className='w-1/2 flex justify-start items-center gap-2 lg:w-1/5'>
        <img className='w-[30px]' src={props?.image} alt={props?.id} />
        <p>{props?.name}</p>
      </div>
      <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
        <p>${props?.market_cap?.toLocaleString()}</p>
      </div>
      <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
        <p>${props?.total_volume?.toLocaleString()}</p>
      </div>
      <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
        <p className={cn(props?.price_change_percentage_24h < 0 ? 'text-rose-500' : 'text-emerald-500')}>{props?.price_change_percentage_24h?.toFixed(2)}%</p>
      </div>
      <div className='w-1/2 flex justify-end items-center lg:w-1/5'>
        <p className={cn(props?.price_change_percentage_24h < 0 ? 'text-rose-500 lg:text-gray-200' : 'text-emerald-500 lg:text-gray-200')}>
          ${props?.current_price < 10 ? props?.current_price : props?.current_price?.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}
