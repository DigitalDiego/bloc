import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Coin } from '../components'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function Home() {
    const [coins, setCoins] = useState(null)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const searchedCoins = coins?.filter(coin => (
      coin?.name?.toLowerCase().includes(search.toLowerCase())
    ))

    const prev = () => {
      setPage(page => page - 1)
    }
  
    const next = () => {
      setPage(page => page + 1)
    }
  
    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`)
        .then(res => {
          setCoins(res.data)
        }).catch(error => console.error(error))
    }, [page])
  return (
    <div className='w-full px-[5vw] 2xl:max-w-7xl 2xl:mx-auto'>
      <div className='w-full h-[15vh] flex justify-center items-center gap-2'>
        <button className='p-2' disabled={page === 1} onClick={prev}>
          <IoIosArrowBack/>
        </button>
        <input className='px-4 py-2 rounded-lg border-none outline-none w-4/5 text-gray-900 bg-gray-200 lg:w-2/5' type="text" placeholder='Search' onChange={e => setSearch(e.target.value)} vaue={search}/>
        <button className='p-2' disabled={page === 3} onClick={next}>
          <IoIosArrowForward/>
        </button>
      </div>
      <div className='w-full h-[15vh] flex items-center'>
        <div className='w-1/2 flex justify-start items-center lg:w-1/5'>
          <p className='underline underline-offset-2'>Coin</p>
        </div>
        <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
          <p className='underline underline-offset-2'>Market Cap</p>
        </div>
        <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
          <p className='underline underline-offset-2'>Volume</p>
        </div>
        <div className='hidden lg:grid lg:place-items-center lg:w-1/5'>
          <p className='underline underline-offset-2'>% Change</p>
        </div>
        <div className='w-1/2 flex justify-end items-center lg:w-1/5'>
          <p className='underline underline-offset-2'>Price</p>
        </div>
      </div>
      <div className='flex flex-col'>
        {searchedCoins?.map(coin => (
          <Coin {...coin} key={coin?.id}/>
        ))}
      </div>
    </div>
  )
}
