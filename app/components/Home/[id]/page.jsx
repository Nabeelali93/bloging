"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Dropdown, initTE, Modal, Ripple,input } from "tw-elements";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit2 } from "react-icons/fi";

function page({ params }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const [showModal, setShowModal] = useState(false);
  const [eshowModal, seteShowModal] = useState(false);

  const cmonth = monthNames[today.getMonth()];

  const cdate = today.toLocaleTimeString();
  const id = params.id;

  console.log(id);
  const router = useRouter();

  const [show, setshow] = useState(false);
  const [editid, seteditid] = useState(false);

  const [alldata, setalldata] = useState([]);
  const [mypro, setmypro] = useState([]);

  const [userdet, setuserdet] = useState();

  const [post, setpost] = useState({
    title: "",
    imagelink: "",
    description: "",
  });

  const [etitle, setetitle] = useState();
  const [edescription, setedescription] = useState();
  const [eimagelink, seteimagelink] = useState();

  

  useEffect(() => {
    initTE({ Dropdown, Modal, Ripple,input });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/get",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setalldata(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    userdatails();
  }, []);

  const userdatails = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/get/loginuserdata/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        setuserdet(response.data.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createpost = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/nfpost",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: post.title,
        description: post.description,
        imagelink: post.imagelink,
        userid: id,
        name: userdet,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        toast.success("Posted", {
          autoClose: 800,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const myprofile = () => {
    setshow(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/myprofile",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userid: id,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        // setpost(response.data.data._id);

       

        setmypro(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const editdata=()=>{

    // seteditid(e),
console.log(editid)


    setShowModal(true) 
    
   


   for( const i of mypro){
if(editid==i._id){

  setetitle(i.title)
  setedescription(i.description)
  seteimagelink(i.imagelink)
}


   }




  }

  const del = (e) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/myprofile",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        _id: e,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    toast.success("Successfully Deleted", {
      autoClose: 800,
    });


    
  };

console.log(editid)



  const edit=(e)=>{

    setShowModal(false)
let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/myprofile',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : {
    title:etitle,
    description:edescription,
    imagelink:eimagelink,
    _id:editid
  }
};

axios.request(config)
.then((response) => {


  toast.success("Successfully Edit", {
    autoClose: 800,
  });

  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


  }




  return (
    <>
      {/* strt navbar */}

      <nav
        class="fixed top-0  flex w-full flex-wrap items-center justify-around bg-neutral-100 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
        data-te-navbar-ref
      >
        <div class="flex  flex-wrap items-center justify-between px-3">

        <i onClick={()=>seteShowModal(true)} className="mr-3 hover:text-yellow-600">{<FiEdit2/>}</i>
          <h1 className="flex font-serif text-yellow-800 uppercase  hover:text-yellow-600">
            
             {userdet}</h1>

          {/* <!-- Avatar --> */}
          <div class="relative ml-3" data-te-dropdown-ref>
            <a
              class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                class="rounded-full w-10 h-10"
                alt="Avatar"
                loading="lazy"
              />
              <span class="w-2 pl-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="absolute left-0 right-auto z-[1000] float-left m-0 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
              aria-labelledby="dropdownMenuButton2"
              data-te-dropdown-menu-ref
            >
              <li>
                <a
                  onClick={() => myprofile()}
                  class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                  href="#"
                  data-te-dropdown-item-ref
                >
                  My profile
                </a>
              </li>

              <li>
                <a
                  class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                  href="/"
                  onClick={() => router.push("/")}
                  data-te-dropdown-item-ref
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            data-te-target="#staticBackdrop"
            data-te-toggle="modal"
            className="text-xl font-serif  text-yellow-800 hover:text-yellow-600"
          >
            News Feeds
          </button>
        </div>
        <div className="flex">
          <h1
            onClick={() => setshow(false)}
            className=" hidden md:block text-xl font-serif text-yellow-800 cursor-pointer  hover:text-yellow-600"
          >
            INFORMATIVE POST
          </h1>
        </div>
      </nav>
      {/* end navbar */}

      {/* <!-- Modal --> */}
      <div
        data-te-modal-init
        class="fixed  top-24 z-[1055] hidden  h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              {/* <!--Modal title--> */}
              <h5
                class="font-serif mt-3 text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="staticBackdropLabel"
              >
                Whats On Your Mind
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                class="mt-3 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!--Modal body--> */}
            <div data-te-modal-body-ref class="relative p-4">
              <div className="relative items-center">
                <input
                  onChange={(e) =>
                    setpost({ ...post, [e.target.name]: e.target.value })
                  }
                  name="title"
                  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="Title"
                />
                <input
                  onChange={(e) =>
                    setpost({ ...post, [e.target.name]: e.target.value })
                  }
                  name="description"
                  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="Description"
                />
                <input
                  onChange={(e) =>
                    setpost({ ...post, [e.target.name]: e.target.value })
                  }
                  name="imagelink"
                  class=" border rounded w-96 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="imageLink"
                />
              </div>
              <button
                onClick={() => createpost()}
                data-te-modal-dismiss
                type="button"
                className="ml-1 bg-gray-400 hover:bg-gray-600 text-white rounded mt-2 p-2"
              >
                POST
              </button>
            </div>

            {/* <!--Modal footer--> */}
            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                data-te-modal-dismiss
                type="button"
                className="ml-1 bg-gray-400 hover:bg-gray-600 text-white rounded p-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* model end */}

{/* edit modal start */}




      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-96">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Post
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                <div className=" items-center">
                <input
                value={etitle}
                  onChange={(e) =>
                   setetitle(e.target.value)
                  }
                  name="title"
                  class=" border rounded w-80 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="Title"
                />
                <input
                  onChange={(e) =>
                    setedescription(e.target.value)
                  }
                  value={edescription}
                  name="description"
                  class=" border rounded w-80 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="Description"
                />
                <input
                  onChange={(e) =>
                    seteimagelink(e.target.value)
                  }

                  value={eimagelink}
                  name="imagelink"
                  class=" border rounded w-80 m-3 items-center py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="imageLink"
                />
              </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-400 text-white hover:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow   mr-1 mb-1 ease-linear "
                    type="button"
                    onClick={() => edit()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null

}





 {/* edit modla end */}



{/* edit user modal  start*/}
{eshowModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-96">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Profile
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => seteShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className=" p-6 flex-auto ">
                <div className=" items-center">

  <div class="relative mb-3" data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInput1"
    placeholder="Email" />
  <label
    for="exampleFormControlInput1"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >Email
  </label>
</div>
<div class="relative mb-3" data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInput1"
    placeholder="Password" />
  <label
    for="exampleFormControlInput1"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >Password
  </label>
</div>
<div class="relative mb-3" data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInput1"
    placeholder="User Name" />
  <label
    for="exampleFormControlInput1"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >User Name
  </label>
</div>

<div class="relative mb-3" data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInput1"
    placeholder="Contact" />
  <label
    for="exampleFormControlInput1"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >Contact
  </label>
</div>
              </div>
              </div>

               {/*footer*/}
              <div className=" flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => seteShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-400 text-white hover:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow   mr-1 mb-1 ease-linear "
                    type="button"
                    onClick={() => seteShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
                </div>
               
                
              </div>
            </div>
          
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null

}

{/* edit user modal end */}


      {show == false ? (
        <>
          {alldata.map((v, i) => {
            return (
              <>
                <div class="p-8  dark:bg-gray-900 flex items-center justify-center mt-16 ">
                  <div class="px-5 py-4   dark:bg-gray-800 shadow rounded-lg max-w-lg">
                    <div class="flex mb-4">
                      <img
                        class="w-12 h-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                      <div class="ml-2 ">
                        <span class="block font-medium text-base leading-snug text-black dark:text-gray-100">
                          {v.name}
                        </span>
                        <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                          {cmonth} at 6:09 PM
                        </span>
                      </div>
                    </div>
                    <p className="font-bold font-serif">{v.title}</p>
                    <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">
                      {v.description}
                    </p>

                    <iframe 
                             
                    className="w-96 h-96  overflow-hidden  "
                     src={v.imagelink}>
                         </iframe>

                    <div class="flex justify-between items-center mt-5">
                      <div class="flex ">
                        <span class="ml-1 text-gray-500 dark:text-gray-400  ">
                          <button
                            type="button"
                            class="text-blue-700 border  border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none active:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                          >
                            <svg
                              class="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                            >
                              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            class="text-red-700 border ml-3 border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none active:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                          >
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 128 128"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08 51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z"
                                fill="#f44336"
                              />
                              <path
                                d="m30.65 11.2c17.2 0 25.74 18.49 28.5 25.98.39 1.07 1.88 1.1 2.33.06l2.52-5.89c-3.55-11.34-13.31-22.38-29.97-22.38-6.9 0-14.19 2.28-19.86 7.09 5.01-3.29 10.88-4.86 16.48-4.86z"
                                fill="#c33"
                              />
                              <path
                                d="m93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47 2.64-1.02 5.91-1.24 9.15-1.24 16.21 0 30.72 12.29 24.17 40.7-5.62 24.39-38.46 53.98-48.49 65.27-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z"
                                fill="#c33"
                              />
                              <path
                                d="m64.88 29.38c-.56 0-1.12.01-1.67.01.56 1.21.83 1.96.83 1.96s.27-.75.84-1.97z"
                                fill="#f5f5f5"
                              />
                              <path
                                d="m123.13 30.93c-18.99-1.27-51.24-1.54-59.93-1.54-25.76.15-48.01 1.11-58.12 1.61-1.43 5.77-1.48 12.73.45 20.97.08.34.93 3.19 1.02 3.53 16.86-.83 71.11-5.62 115.68-2.58.08-.32.17-.63.24-.94 1.93-8.28 1.98-15.27.66-21.05z"
                                fill="#f5f5f5"
                              />
                              <path
                                d="m123.04 31.04-14.67-.11c-4.92-.02-9.84 0-14.76.05l-7.38.08-7.38.03c-4.92.03-9.84.08-14.74.17-4.9.11-9.82.27-14.73.45l-7.37.29-7.37.23c-9.81.34-19.63.77-29.44 1.32l2.34-1.93c-.88 3.72-1.07 7.63-.75 11.53.16 1.95.45 3.9.83 5.84.2.97.39 1.93.68 2.91l.85 2.92-2.73-2 28.88-1.59c9.65-.5 19.31-.9 28.98-1.15 9.67-.15 19.35-.11 29.03.15 2.42.04 4.84.14 7.26.24s4.84.17 7.25.33c4.83.27 9.66.73 14.47 1.17l-1.01.73c.51-1.73.94-3.52 1.29-5.31s.61-3.6.78-5.43c.16-1.82.24-3.65.19-5.49-.03-.92-.07-1.83-.17-2.75-.04-.46-.1-.91-.16-1.37-.07-.49-.13-.85-.17-1.31zm.19-.22c.27.99.42 1.91.55 2.82.14.92.23 1.84.3 2.77.14 1.85.14 3.71.04 5.57-.21 3.71-.81 7.39-1.73 10.99l-.04.14-.14-.01c-9.63-.62-19.27-.89-28.92-.94-9.65-.06-19.29.12-28.93.46-9.64.33-19.28.8-28.91 1.37l-28.88 1.81-.24.01-.07-.24-.86-2.98c-.29-1-.48-2.02-.68-3.04-.39-2.04-.67-4.11-.83-6.18-.31-4.16-.08-8.37.92-12.43l.05-.2.2-.01c19.67-.94 39.35-1.47 59.04-1.55 9.85.04 19.69.19 29.53.41 4.92.12 9.84.26 14.76.45l7.38.32 3.69.19z"
                                fill="#aaa"
                              />
                              <path
                                d="m110.67 13.36c-16.36 4.29-31.37 9.1-44.7 13.9-20.73 5.98-50.99 21.31-60.08 26.13 1.77 6.35 5.46 13 10.16 19.53 13.13-6.93 53.59-26.85 107.45-40.12-1.56-9.24-6.45-15.62-12.83-19.44z"
                                fill="#f5f5f5"
                              />
                              <path
                                d="m110.64 13.51-13.32 4.3c-4.45 1.46-8.87 2.98-13.27 4.56l-13.17 4.81c-4.39 1.76-8.92 3.07-13.21 4.75-4.34 1.65-8.62 3.48-12.88 5.36-2.13.95-4.25 1.91-6.36 2.9-2.13.95-4.24 1.94-6.35 2.92-8.43 3.97-16.8 8.14-25.01 12.52l1.26-2.92c.95 3.3 2.4 6.52 4.1 9.63 1.71 3.11 3.68 6.1 5.8 9.01l-3.43-.81c4.27-2.26 8.62-4.35 12.98-6.4s8.76-4 13.18-5.92c8.85-3.8 17.8-7.36 26.84-10.64 9.06-3.25 18.26-6.09 27.49-8.78 9.24-2.67 18.56-5.03 27.96-7.02l-.79 1.2c-.53-3.85-1.72-7.64-3.75-10.99-1.01-1.67-2.21-3.24-3.57-4.68-1.33-1.43-2.94-2.74-4.5-3.8zm.05-.3c1.84 1.08 3.38 2.27 4.86 3.68 1.46 1.39 2.75 2.96 3.85 4.65 2.21 3.38 3.59 7.26 4.28 11.23l.03.16-.16.04c-9.28 2.36-18.52 4.88-27.66 7.73-9.14 2.86-18.21 5.94-27.18 9.28s-17.85 6.95-26.62 10.79c-8.76 3.86-17.42 7.96-25.89 12.41l-.23.12-.15-.21c-2.15-3-4.17-6.12-5.92-9.38s-3.26-6.67-4.26-10.25l-.06-.21.2-.1c8.3-4.35 16.73-8.47 25.24-12.39 8.52-3.9 17.14-7.6 25.97-10.78 4.41-1.62 8.94-2.82 13.32-4.47 4.42-1.55 8.87-3.03 13.33-4.45 8.94-2.86 17.86-5.47 27.05-7.85z"
                                fill="#aaa"
                              />
                              <path
                                d="m123.93 36.28c-1.62-18.2-12.97-22.75-13.26-22.92-2.31.61-4.58 1.22-6.84 1.85 8.84 5.66 14.04 17.48 9.61 36.69-.04.17-.08.33-.13.5 3 .16 5.98.32 8.91.52.08-.32.17-.63.24-.94.14-.58 1.97-10.05 1.47-15.7z"
                                fill="#aaa"
                              />
                              <path
                                d="m114.72 33.68.15 1.33 9.06 1.27-.42-3.49z"
                                fill="#666"
                              />
                              <path
                                d="m16.5 25.43c-.77-3.42 4.73-9.73 12.56-9.91 6.98-.16 6.42 6.04 1.74 8.69-4.79 2.69-13.67 4.03-14.3 1.22z"
                                fill="#ff8a80"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                      <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">
                        33 comments
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          {mypro.length > 0 ? (
            <>
             
              {mypro.map((v, i) => {
                return (
                  <>
                    <div class="p-8  dark:bg-gray-900 flex items-center justify-center mt-16 ">
                      <div class="px-5 py-4   dark:bg-gray-800 shadow rounded-lg max-w-lg">
                        <div class="flex mb-4">
                          <img
                            class="w-12 h-12 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          />
                          <div class="ml-2 ">
                            <span class="block font-medium text-base leading-snug text-black dark:text-gray-100">
                              {v.name}
                            </span>
                            {/* start drop */}
                            <div class=" ml-64" data-te-dropdown-ref>
                              <a
                              onClick={()=>seteditid(v._id)}
                                class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-te-dropdown-toggle-ref
                                aria-expanded="false"
                              >
                                <span class="w-2 pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="h-5 w-5"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </a>
                              <ul
                                class="absolute left-0 right-auto z-[1000] float-left m-0 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
                                aria-labelledby="dropdownMenuButton2"
                                data-te-dropdown-menu-ref
                              >
                                <li>
                                  <a
                                      onClick={() =>  editdata()}
                                    class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                                    href="#"
                                    data-te-dropdown-item-ref
                                  >
                                    Edit
                                  </a>
                                </li>

                                <li>
                                  <a
                                    class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                                    href="#"
                                    onClick={() => del(v._id)}
                                    data-te-dropdown-item-ref
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>

                            {/* end option */}

                            <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                              {cmonth} at 6:09 PM
                            </span>
                          </div>
                        </div>
                        <p className="font-bold font-serif">{v.title}</p>
                        <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">
                          {v.description}
                        </p>

                        <iframe 
                             
                             className="w-96 h-96 object-cover"
                                                  src={v.imagelink}>
                                                      </iframe>

                        <div class="flex justify-between items-center mt-5">
                          <div class="flex ">
                            <span class="ml-1 text-gray-500 dark:text-gray-400  ">
                              <button
                                type="button"
                                class="text-blue-700 border  border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none active:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                              >
                                <svg
                                  class="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                </svg>
                              </button>

                              <button
                                type="button"
                                class="text-red-700 border ml-3 border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none active:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 128 128"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="m93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08 51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z"
                                    fill="#f44336"
                                  />
                                  <path
                                    d="m30.65 11.2c17.2 0 25.74 18.49 28.5 25.98.39 1.07 1.88 1.1 2.33.06l2.52-5.89c-3.55-11.34-13.31-22.38-29.97-22.38-6.9 0-14.19 2.28-19.86 7.09 5.01-3.29 10.88-4.86 16.48-4.86z"
                                    fill="#c33"
                                  />
                                  <path
                                    d="m93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47 2.64-1.02 5.91-1.24 9.15-1.24 16.21 0 30.72 12.29 24.17 40.7-5.62 24.39-38.46 53.98-48.49 65.27-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z"
                                    fill="#c33"
                                  />
                                  <path
                                    d="m64.88 29.38c-.56 0-1.12.01-1.67.01.56 1.21.83 1.96.83 1.96s.27-.75.84-1.97z"
                                    fill="#f5f5f5"
                                  />
                                  <path
                                    d="m123.13 30.93c-18.99-1.27-51.24-1.54-59.93-1.54-25.76.15-48.01 1.11-58.12 1.61-1.43 5.77-1.48 12.73.45 20.97.08.34.93 3.19 1.02 3.53 16.86-.83 71.11-5.62 115.68-2.58.08-.32.17-.63.24-.94 1.93-8.28 1.98-15.27.66-21.05z"
                                    fill="#f5f5f5"
                                  />
                                  <path
                                    d="m123.04 31.04-14.67-.11c-4.92-.02-9.84 0-14.76.05l-7.38.08-7.38.03c-4.92.03-9.84.08-14.74.17-4.9.11-9.82.27-14.73.45l-7.37.29-7.37.23c-9.81.34-19.63.77-29.44 1.32l2.34-1.93c-.88 3.72-1.07 7.63-.75 11.53.16 1.95.45 3.9.83 5.84.2.97.39 1.93.68 2.91l.85 2.92-2.73-2 28.88-1.59c9.65-.5 19.31-.9 28.98-1.15 9.67-.15 19.35-.11 29.03.15 2.42.04 4.84.14 7.26.24s4.84.17 7.25.33c4.83.27 9.66.73 14.47 1.17l-1.01.73c.51-1.73.94-3.52 1.29-5.31s.61-3.6.78-5.43c.16-1.82.24-3.65.19-5.49-.03-.92-.07-1.83-.17-2.75-.04-.46-.1-.91-.16-1.37-.07-.49-.13-.85-.17-1.31zm.19-.22c.27.99.42 1.91.55 2.82.14.92.23 1.84.3 2.77.14 1.85.14 3.71.04 5.57-.21 3.71-.81 7.39-1.73 10.99l-.04.14-.14-.01c-9.63-.62-19.27-.89-28.92-.94-9.65-.06-19.29.12-28.93.46-9.64.33-19.28.8-28.91 1.37l-28.88 1.81-.24.01-.07-.24-.86-2.98c-.29-1-.48-2.02-.68-3.04-.39-2.04-.67-4.11-.83-6.18-.31-4.16-.08-8.37.92-12.43l.05-.2.2-.01c19.67-.94 39.35-1.47 59.04-1.55 9.85.04 19.69.19 29.53.41 4.92.12 9.84.26 14.76.45l7.38.32 3.69.19z"
                                    fill="#aaa"
                                  />
                                  <path
                                    d="m110.67 13.36c-16.36 4.29-31.37 9.1-44.7 13.9-20.73 5.98-50.99 21.31-60.08 26.13 1.77 6.35 5.46 13 10.16 19.53 13.13-6.93 53.59-26.85 107.45-40.12-1.56-9.24-6.45-15.62-12.83-19.44z"
                                    fill="#f5f5f5"
                                  />
                                  <path
                                    d="m110.64 13.51-13.32 4.3c-4.45 1.46-8.87 2.98-13.27 4.56l-13.17 4.81c-4.39 1.76-8.92 3.07-13.21 4.75-4.34 1.65-8.62 3.48-12.88 5.36-2.13.95-4.25 1.91-6.36 2.9-2.13.95-4.24 1.94-6.35 2.92-8.43 3.97-16.8 8.14-25.01 12.52l1.26-2.92c.95 3.3 2.4 6.52 4.1 9.63 1.71 3.11 3.68 6.1 5.8 9.01l-3.43-.81c4.27-2.26 8.62-4.35 12.98-6.4s8.76-4 13.18-5.92c8.85-3.8 17.8-7.36 26.84-10.64 9.06-3.25 18.26-6.09 27.49-8.78 9.24-2.67 18.56-5.03 27.96-7.02l-.79 1.2c-.53-3.85-1.72-7.64-3.75-10.99-1.01-1.67-2.21-3.24-3.57-4.68-1.33-1.43-2.94-2.74-4.5-3.8zm.05-.3c1.84 1.08 3.38 2.27 4.86 3.68 1.46 1.39 2.75 2.96 3.85 4.65 2.21 3.38 3.59 7.26 4.28 11.23l.03.16-.16.04c-9.28 2.36-18.52 4.88-27.66 7.73-9.14 2.86-18.21 5.94-27.18 9.28s-17.85 6.95-26.62 10.79c-8.76 3.86-17.42 7.96-25.89 12.41l-.23.12-.15-.21c-2.15-3-4.17-6.12-5.92-9.38s-3.26-6.67-4.26-10.25l-.06-.21.2-.1c8.3-4.35 16.73-8.47 25.24-12.39 8.52-3.9 17.14-7.6 25.97-10.78 4.41-1.62 8.94-2.82 13.32-4.47 4.42-1.55 8.87-3.03 13.33-4.45 8.94-2.86 17.86-5.47 27.05-7.85z"
                                    fill="#aaa"
                                  />
                                  <path
                                    d="m123.93 36.28c-1.62-18.2-12.97-22.75-13.26-22.92-2.31.61-4.58 1.22-6.84 1.85 8.84 5.66 14.04 17.48 9.61 36.69-.04.17-.08.33-.13.5 3 .16 5.98.32 8.91.52.08-.32.17-.63.24-.94.14-.58 1.97-10.05 1.47-15.7z"
                                    fill="#aaa"
                                  />
                                  <path
                                    d="m114.72 33.68.15 1.33 9.06 1.27-.42-3.49z"
                                    fill="#666"
                                  />
                                  <path
                                    d="m16.5 25.43c-.77-3.42 4.73-9.73 12.56-9.91 6.98-.16 6.42 6.04 1.74 8.69-4.79 2.69-13.67 4.03-14.3 1.22z"
                                    fill="#ff8a80"
                                  />
                                </svg>
                              </button>
                            </span>
                          </div>
                          <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">
                            33 comments
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <h1 className=" font-serif text-3xl mt-72 flex justify-center ">No Post Yet</h1>
            </>
          )}
        </>
      )}

      <ToastContainer />
    </>
  );
}

export default page;
