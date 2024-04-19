import React from 'react'
import Box from '../components/Box'
import {Link} from 'react-router-dom';
import { FiExternalLink } from "react-icons/fi";
const Resources = () => {
  return (
    <section>
      <div className=''>
        <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-bold font-sans">
          Explore some helpful resources
        </h1>
        <p className="">
        Welcome to our resources page, where you can find a collection of helpful links and tools to support your mental health journey. Whether you're looking for information, guidance, or a community to connect with, these resources are here to assist you. 
        </p>
        </div>
      </div>
      <div>
      <div className='flex gap-5 flex-wrap mt-5'>
      <Box 
      src="https://believeperform.com/wp-content/uploads/2019/09/10-5c-20mental-_35354390.png"
      title="Mental Health Exercises and Interventions"
      url="https://positivepsychology.com/mental-health-exercises-interventions/"
      />
      <Box 
      src="https://th.bing.com/th/id/OIP.GTgsaCZtjHP0OslkX6rP8gHaKB?rs=1&pid=ImgDetMain"
      title="Mental Health Exercise Benefits"
      url="https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm"
      />
      <Box 
      src="https://i.pinimg.com/originals/32/3c/a9/323ca9ce2d8cd1aae4fd27d327cdf633.jpg"
      title="Look after your mental health"
      url="https://www.mentalhealth.org.uk/explore-mental-health/publications/how-look-after-your-mental-health-using-exercise"
      />
      </div>
      <div className='flex gap-5 flex-wrap mt-5'>
      <Box 
      src="https://i1.wp.com/www.scienceforsport.com/wp-content/uploads/2017/01/10-Ways-to-Boost-your-Mental-Health.jpg"
      title="Boost mental Health"
      url="https://bcmhsus.ca/about/news-stories/stories/10-tips-to-boost-your-mental-health"
      />
      <Box 
      src="https://th.bing.com/th/id/OIP.EZJAJekezQB-DEuyXOVH4QHaL9?rs=1&pid=ImgDetMain"
      title="Building Mental Health"
      url="https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm"
      />
      <Box 
      src="https://believeperform.com/wp-content/uploads/2018/06/How-can-exercise-improve-well-being.jpeg"
      title="Improve mental Wellbeing"
      url="https://www.mind.org.uk/information-support/tips-for-everyday-living/wellbeing/"
      />
      </div>
      </div>
    </section>
  )
}

export default Resources