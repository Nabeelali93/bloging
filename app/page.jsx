'use client'
import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";


 function Home() {

const router = useRouter()

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [contact, setcontact] = useState("")


   
  

  const [login,setlogin] = useState({
    email:"",
    password:""
  })





 useEffect(()=>{
  initTE({ Modal, Ripple });





 },[])

const createacc=()=>{

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/post',
    headers: { },
    data : {
      name:name,
      email:email,
      password:password,
      contact:contact
    }
  };
  
 
  axios.request(config)
  .then((response) => {
    console.log(response.data);


    toast.success("Account Created ",{
      autoClose:1000
    })
  })
  .catch((error) => {
    console.log(error);
  });
  
  
}


const loginn=()=>{



let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/loginpost',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : {
    email:login.email,
    password:login.password
  }
};

axios.request(config)
.then( (response) => {
  console.log("login",response.data);




  if(response.data.message=="correct"){


    toast.success("Successfully Login", {
      autoClose: 800
    })

router.replace(`components/Home/${response.data.data._id}`)

  }

  else{
    toast.error("Incorrect Data ",{
      autoClose:800
    })
  }
 


})
.catch((error) => {
  console.log(error);
});




}



// console.loh(userdetails)

  return (
   <>
   <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font  text-3xl text-gray-900 text-center font-serif font-extrabold">INFORMATIVE POST</h1>
      <p className="leading-relaxed mt-4 text-center font-semibold text-yellow-900">Social media are interactive
       technologies that facilitate 
      the creation and sharing of information, ideas, interests, and other forms of 
      expression through virtual communities and networks.
      </p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">INFORMATIVE POST</h2>
      <div className="relative mb-4">
        <label for="full-name" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={(e)=>setlogin({...login,[e.target.name]: e.target.value})} type="email"  placeholder="Email"  name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={(e)=>setlogin({...login,[e.target.name]: e.target.value})} type="password" placeholder="Password"  name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button onClick={()=>loginn()} className="text-white bg-gray-400 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Login</button>
      <br />
      <button type="button"  data-te-target="#staticBackdrop"  data-te-toggle="modal" className="text-white bg-gray-400 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Sign Up</button>



      <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
    </div>
  </div>



{/* model strt */}



{/* <!-- Modal --> */}
<div
  data-te-modal-init
  class="fixed  top-24 z-[1055] hidden  h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="staticBackdrop"
  data-te-backdrop="static"
  data-te-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true">
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
    <div
      class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/* <!--Modal title--> */}
        <h5
          class="font-serif mt-3 text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="staticBackdropLabel">
         Create Your Account
        </h5>
        {/* <!--Close button--> */}
        <button
          type="button"
          class="mt-3 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* <!--Modal body--> */}
      <div data-te-modal-body-ref class="relative p-4">
        

      
        
       <div className="relative items-center">
       <input onChange={(e)=>setname(e.target.value)} name="name"  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "  type="text" placeholder="User Name"  />
       <input onChange={(e)=>setemail(e.target.value)} name="email"  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "  type="Email" placeholder="Email" />
       <input onChange={(e)=>setpassword(e.target.value)} name="password"  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "  type="Password" placeholder="Password" />
       <input onChange={(e)=>setcontact(e.target.value)} name="contact"  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "  type="Number" placeholder="Contact" />


       </div>
       <button
     onClick={()=>createacc()}
                  data-te-modal-dismiss 
                  type="button" className="ml-1 bg-gray-400 hover:bg-gray-600 text-white rounded mt-2 p-2">Create Account
                  
                  
                  </button>
      



      </div>

      {/* <!--Modal footer--> */}
      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
  
        <button
                  data-te-modal-dismiss 
                  type="button" className="ml-1 bg-gray-400 hover:bg-gray-600 text-white rounded p-2">Close
                  
                  
                  </button>
       

              

      </div>




    </div>
  </div>
</div>
{/* model end */}


<ToastContainer />


</section>



   </>
  )
}


export default Home