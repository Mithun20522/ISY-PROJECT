import React from 'react'
import Box from '../components/Box'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const WellBeing = () => {
  return (
    <section className=''>
      <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-bold font-sans">
          Welcome to the Wellbeing Page
        </h1>
        <p className="">
        Sometimes, professional help is needed to address mental health concerns, and that's okay. MindLink Community offers access to a network of professional psychiatrists who can provide the support and guidance you need.
        </p>
      </div>
      <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg relative">
        <h1 className="text-center text-2xl font-bold font-sans">
        Take the Next Step
        </h1>
        <p className="">
        If you feel that you need professional help to address your mental health concerns, don't hesitate to reach out. Take the next step towards better mental health by scheduling a consultation with one of our trusted psychiatrists. Your well-being is our priority. <Link to={'https://iiitd.ac.in/wbc/'} className=' hover:text-blue-500'><FiExternalLink className='absolute right-[26%] bottom-7 text-2xl ml-5'/></Link>
        </p>
      </div>
    </section>
  )
}

export default WellBeing