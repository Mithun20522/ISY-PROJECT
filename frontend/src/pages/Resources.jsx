import React from 'react'
import Box from '../components/Box'
import {Link} from 'react-router-dom';
import { FiExternalLink } from "react-icons/fi";
const Resources = () => {
  return (
    <section className='mt-2'>
      <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg">
      <h1 className="text-center text-2xl font-bold font-sans">Resources for Mental Health Support</h1>
      <p className=''>
      Welcome to our resources page, where you can find a collection of helpful links and tools to support your mental health journey. Whether you're looking for information, guidance, or a community to connect with, these resources are here to assist you.
      </p>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <Link to={'https://positivepsychology.com/mental-health-exercises-interventions/'} className='hover:underline hover:text-blue-500 text-xl'>
        <div className='flex gap-2 justify-center items-center'>
          <h1>19 Mental Health Exercises & Interventions for Wellbeing</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
        <Link className='hover:underline hover:text-blue-500 text-xl' to={'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm'}>
        <div className='flex gap-2 justify-center items-center'>
          <h1>Mental Health Benefits of Exercise</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
        <Link className='hover:underline hover:text-blue-500 text-xl' to={'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-look-after-your-mental-health-using-exercise'}>
        <div className='flex gap-2 justify-center items-center'>
          <h1>How to look after your mental health using exercise</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <Link className='hover:underline hover:text-blue-500 text-xl' to={'https://bcmhsus.ca/about/news-stories/stories/10-tips-to-boost-your-mental-health'}>
        <div className='flex gap-2 justify-center items-center'>
          <h1>10 tips to boost your mental health</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
        <Link className='hover:underline hover:text-blue-500 text-xl' to={'https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm'}>
        <div className='flex gap-2 justify-center items-center'>
          <h1>Building Better Mental Health</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
        <Link className='hover:underline hover:text-blue-500 text-xl mb-10' to={'https://www.mind.org.uk/information-support/tips-for-everyday-living/wellbeing/'}>
        <div className='flex gap-2 justify-center items-center'>
          <h1>How to improve your mental wellbeing</h1>
          <FiExternalLink className='text-2xl'/>
        </div>
        </Link>
      </div>
    </section>
  )
}

export default Resources