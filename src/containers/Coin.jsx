import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Coin() {
  const [coin, setCoin] = useState(null)
  const [chart, setChart] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => {
        setCoin(res.data)
      })
  }, [id])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
      .then(res => {
        setChart(res.data)
      })
  }, [id])

  const graphData = chart?.prices?.slice(0, 7)?.map(item => ({
    date: moment(new Date(item[0]).toLocaleDateString('en-us')).format("DD/MM"),
    price: item[1]
  }))
  

  const cn = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className='w-full px-[5vw] mb-[10vh] lg:max-w-5xl lg:mx-auto'>

        <div className='w-full h-[15vh] flex justify-start items-center gap-2 mb-[5vh]'>
          <img className='w-[50px]' src={coin?.image?.large} alt={coin?.id} />
          <p className='text-xl'>{coin?.name}</p>
        </div>

      <div className='w-full h-[50vh] text-gray-900 grid place-items-center'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={graphData}
            width={300}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey='price' />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#222" fill="#ffffff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full flex justify-start items-start flex-col'>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>Price</p>
          <p>${coin?.market_data?.current_price?.usd < 10 ? coin?.market_data?.current_price?.usd : coin?.market_data?.current_price?.usd?.toLocaleString()}</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>% Change</p>
          <p className={cn(coin?.market_data?.price_change_percentage_24h < 0 ? 'text-rose-500' : 'text-emerald-500')}>{coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>$ Change</p>
          <p className={cn(coin?.market_data?.price_change_percentage_24h_in_currency?.usd < 0 ? 'text-rose-500' : 'text-emerald-500')}>${coin?.market_data?.price_change_percentage_24h_in_currency?.usd < 10 ? coin?.market_data?.price_change_percentage_24h_in_currency?.usd : coin?.market_data?.price_change_percentage_24h_in_currency?.usd?.toLocaleString()}</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>Market Cap</p>
          <p>${coin?.market_data?.market_cap?.usd?.toLocaleString()}</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>Volume</p>
          <p>${coin?.market_data?.total_volume?.usd?.toLocaleString()}</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>High 24h</p>
          <p>${coin?.market_data?.high_24h?.usd < 10 ? coin?.market_data?.high_24h?.usd : coin?.market_data?.high_24h?.usd?.toLocaleString()}</p>
        </div>

        <div className='w-full h-[10vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 text-lg'>
          <p>Low 24h</p>
          <p>${coin?.market_data?.low_24h?.usd < 10 ? coin?.market_data?.low_24h?.usd : coin?.market_data?.low_24h?.usd?.toLocaleString()}</p>
        </div>

      </div>

    </div>
  )
}