import React from "react";
import Box from "../components/Box";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen p-2 flex flex-col">
      <div className="bg-slate-100 p-7 mx-[10vw] space-y-5 mt-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-bold font-sans">
          Welcome to MindLink Community
        </h1>
        <p className="">
          MindLink Community is a safe space for individuals seeking mental
          health support and connection. Our platform is designed to help you
          find a sense of community and belonging, where you can share your
          experiences, gain support from others, and access valuable resources
          to support your mental health journey.
        </p>
      </div>
<div>
    <div className="flex mx-5 justify-between items-center gap-5">
        <Link to={'/peer-connect'} className="bg-slate-100 border mx-10 p-7 transition duration-300 ease-in-out hover:scale-105 cursor-pointer  space-y-5 mt-10 rounded-2xl shadow-lg">
            <div className="">
            <img src="https://www.impact360institute.org/wp-content/uploads/2017/01/20672246_m.jpg" alt="peers" className="w-[300px] rounded-lg shadow-2xl border-2 mx-auto mb-5 text-center h-[200px]" />
            <h1 className="text-center text-2xl font-bold font-sans">
            Connect with Peers
            </h1>
            </div>
            <p className="">
            Join group discussions and connect with peers who understand what you're going through. Share your thoughts, feelings, and experiences in a supportive environment.
            </p>
          </Link>
          <Link to={'/resources'} className="bg-slate-100 border p-7 mx-10 transition duration-300 ease-in-out hover:scale-105 cursor-pointer  space-y-5 mt-10 rounded-2xl shadow-lg">
            <div>
            <img className="w-[300px] mx-auto mb-5 text-center h-[200px] rounded-lg shadow-2xl border-2" src="https://www.leadinglearning.com/wp-content/uploads/2020/02/resources_40765433_m-min.jpg" alt="resources" />
            <h1 className="text-center text-2xl font-bold font-sans">
            Access Resources
            </h1>
            </div>
            <p className="">
            Explore a variety of resources, including articles, self-care tips, therapy options, and crisis hotlines. Our goal is to provide you with the tools and information you need to support your mental health.
            </p>
          </Link>
      </div>
      <div className="flex mx-5 justify-between items-center gap-5">
        <Link to={'/well-being'} className="bg-slate-100 border mx-10 p-7 transition duration-300 ease-in-out hover:scale-105 cursor-pointer  space-y-5 mt-10 rounded-2xl shadow-lg">
            <div>
            <img src="https://th.bing.com/th/id/OIP.CS9msafUXrjavvqrOg-j9wHaE8?rs=1&pid=ImgDetMain" alt="support" className="w-[300px] mx-auto mb-5 text-center h-[200px] rounded-lg shadow-2xl border-2" />
            <h1 className="text-center text-2xl font-bold font-sans">
            Find Support
            </h1>
            </div>
            <p className="">
            Whether you're looking for professional help or simply want to connect with others, MindLink Community is here for you. We believe in the power of community and support in improving mental health and well-being.
            </p>
          </Link>
          <Link to={'/login'} className="bg-slate-100 border p-7 mx-10 transition duration-300 ease-in-out hover:scale-105 cursor-pointer  space-y-5 mt-10 rounded-2xl shadow-lg">
            <div>
            <img src="https://png.pngtree.com/png-clipart/20221020/original/pngtree-yellow-black-join-us-today-vector-sticker-png-image_8708363.png" alt="joinus" className="w-[300px] mx-auto mb-5 text-center h-[200px] rounded-lg shadow-2xl border-2" />
            <h1 className="text-center text-2xl font-bold font-sans">
            Join Us Today
            </h1>
            </div>
            <p className="">
            Take the first step towards better mental health. Join MindLink Community today and be part of a supportive community that understands and cares. Together, we can make a difference in each other's lives.
            </p>
          </Link>
      </div>
</div>
    </section>
  );
};

export default Home;
