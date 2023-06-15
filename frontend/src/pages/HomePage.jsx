import React from 'react'
import MainLayout from '../components/MainLayout'
import { StarRating } from '../components/Review/StarRating'

const HomePage = () => {
  return <MainLayout>
    <StarRating />
  </MainLayout>
}

export default HomePage