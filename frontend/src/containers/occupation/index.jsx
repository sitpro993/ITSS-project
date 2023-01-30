import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getOccupation, getRegistration } from '../../apis/occupation'
import { SearchBar } from './searchBar'
import './index.css'
import { useCallback } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ItemCard from './itemCard'
import { debounce } from 'lodash'

function Occupation() {
  const [loading, setLoading] = useState(true)
  const [occupations, setOccupations] = useState()
  const [registrations, setRegistration] = useState()
  const accessToken = localStorage.getItem('')

  const getOccupations = async (searchQuery) => {
    const response = await getOccupation(accessToken, searchQuery)
    setOccupations(response.data)
  }

  const getRegistrations = async (searchQuery) => {
    const response = await getRegistration(accessToken, searchQuery)
    setRegistration(response.data)
  }

  const debounceSearch = useCallback(
    debounce((nextValue) => {
      getOccupations(nextValue)
      getRegistrations(nextValue)
    }, 1000),
    []
  )

  useEffect(() => {
    Promise.all([getOccupations(), getRegistrations()]).then(() => {
      setLoading(false)
    })
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <div style={{ marginTop: '30px' }}>
      <SearchBar debounceSearch={debounceSearch} />
      <div className="my-element decorative-line">
        <h2 className="title">Công việc được tìm kiếm nhiều nhất</h2>
      </div>
      <Carousel responsive={responsive} containerClass="carousel-container">
        {occupations?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
      </Carousel>
      <div className="my-element decorative-line">
        <h2 className="title">Các công việc được đăng ký nhiều nhất</h2>
      </div>
      <Carousel responsive={responsive} containerClass="carousel-container">
        {registrations?.map((item) => (
          <ItemCard {...item} key={item.id} />
        ))}
      </Carousel>
      {/* <h2>Các công việc được đăng ký nhiều nhất</h2>
    <Carousel responsive={responsive} containerClass="carousel-container">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </Carousel>
    <OccupationCard /> */}
    </div>
  )
}

export default Occupation
