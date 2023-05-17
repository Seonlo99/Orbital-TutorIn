import React from 'react'
import MainLayout from '../components/MainLayout'
import { CommunityStats } from '../components/Profile/CommunityStats'
import { AboutMe } from '../components/Profile/AboutMe'

const ProfilePage = () => {
    
  return (
  <MainLayout>

    <div className='container mx-auto max-w-4xl mt-5 p-3'>
      <div className='flex flex-col lg:flex-row gap-x-5'>
        <div className='flex flex-col lg:w-[40%] gap-y-5 '>
          <section className='rounded-md border shadow-md bg-gray-100 px-7 py-5'>
            <AboutMe />
          </section>
          <section className='rounded-md border shadow-md bg-gray-100 px-7 py-5'>
            <CommunityStats />
          </section>

          <section className='rounded-md border shadow-md bg-gray-100 px-7 py-5'>
            Tutor Only Section to show their grades?
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </section>
        </div>



        <div className='flex flex-col lg:w-[60%] mt-5 lg:mt-0 gap-y-5'>
          <section className='rounded-md border shadow-md bg-gray-100 px-7 py-5'>
            <div className='font-bold text-xl'>Most Recent Posts</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </section>
          <section className='rounded-md border shadow-md bg-gray-100 px-7 py-5'>
            <div className='font-bold text-xl'>Reviews</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </section>
        </div>

      </div>
    </div>

  </MainLayout>
  )
}

export default ProfilePage