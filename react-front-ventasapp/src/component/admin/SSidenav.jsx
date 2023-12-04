import React, { useState } from 'react';
import backgroundNavar from "../../public/images/navar.jpg";



const SSidenav = () => {
    const [isFullscreen, setFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setFullscreen(!isFullscreen);
        document.documentElement.style.setProperty(
            '--screen-width',
            isFullscreen ? '100%' : '768px'
        );
        document.documentElement.style.setProperty(
            '--screen-height',
            isFullscreen ? '100%' : '1024px'
        );
        document.body.classList.toggle('mobile-style'); // Agregar o remover la clase 'mobile-style'
    };
    //togless
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isSubMenuAOpen, setIsSubMenuAOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const toggleSubMenuA = () => {
        setIsSubMenuAOpen(!isSubMenuAOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    //end togless
    return (

        <div className=''>
            <span
                className="absolute text-blue text-4xl top-10 left-4 cursor-pointer ml-5"
                onClick={toggleSidebar}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </span>

            <aside className={` fixed  normal-case text-xs  leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]          w-60 ease-nav-brand hover:overflow-y-auto  overflow-hidden z-990  inset-y-0 my-4 ml-4 block   flex-wrap items-center justify-between  rounded-2xl border-0  p-0 antialiased xl:left-0 xl:translate-x-0 ${isSidebarOpen ? "" : "hidden"
                }`}
                style={{
                    backgroundImage: `url(${backgroundNavar})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                  }}
            >

                <div class="h-20 ">
                    <div class="flex items-center absolute px-8 py-6 m-0 text-sm whitespace-nowrap">
                        <svg class="w-8 h-8 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.308 9a2.257 2.257 0 0 0 2.25-2.264 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0C19.058 5.471 16.956 1 16.956 1H3.045S1.058 5.654 1.058 6.736A2.373 2.373 0 0 0 3.308 9Zm0 0a2.243 2.243 0 0 0 1.866-1h.767a2.242 2.242 0 0 0 3.733 0h.767a2.242 2.242 0 0 0 3.733 0h.767a2.247 2.247 0 0 0 1.867 1A2.22 2.22 0 0 0 18 8.649V19H9v-7H5v7H2V8.524c.37.301.83.469 1.308.476ZM12 12h3v3h-3v-3Z" />
                        </svg>
                        <h1 className='text-2xl font-bold ml-2'>Admin</h1>
                    </div>

                    <button onClick={toggleSidebar} type='button' class="block xl:hidden bg-white relative px-8 py-6 m-0 text-sm whitespace-nowrap " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button >
                </div>



                <div class="items-center block w-auto max-h-screen  md:overscroll-contain  hover:overflow-auto overflow-hidden h-sidenav grow basis-full" >
                    <ul class="flex flex-col pl-0 mb-0">

                        <li class="mt-1 w-full">
                            <a href="/dashboard" class="mt-4  hover:text-[#0c0c0c] bg-[#0a0a0a]  pb-2 pt-2.5 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                                <div class=" bg-gradient-to-r from-black hover:text-slate-500  hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>

                                </div>
                                <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
                            </a>
                        </li>



                        <div onClick={toggleSubMenu}
                            class="mt-4   hover:text-[#0c0c0c] bg-[#0a0a0a]  pb-2 pt-2.5 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                            <div class=" bg-gradient-to-r from-black hover:text-slate-500 hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                                          </div>
                            <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Tables</span>
                            <span className="text-sm rotate-180 ml-20" id="arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </span>
                        </div>


                        <div
                            className={`text-left text-sm mt-2 w-4/5 ml-4 text-gray-200 font-bold ${isSubMenuOpen ? "" : "hidden"
                                }`}
                        >
                            <li class="mt-1 w-full">
                                <a href="/categoria" class="mt-4 hover:text-[#030303]  bg-[#000000]  pb-2 pt-2 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                                    <div class="bg-gradient-to-r  from-black hover:text-slate-500 hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                    </svg>

                                    </div>
                                    <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Categoria</span>
                                </a>
                            </li>

                            <li class="mt-1 w-full">
                                <a href="/producto" class="mt-4 hover:text-[#000000]  bg-[#000000]  pb-2 pt-2 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                                    <div class="bg-gradient-to-r  from-black hover:text-slate-500 hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                                </svg>


                                    </div>
                                    <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Productos</span>
                                </a>
                            </li>
                            <li class="mt-1 w-full">
                                <a href="/venta" class="mt-4 hover:text-[#000000]  bg-[#000000]  pb-2 pt-2 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                                    <div class="bg-gradient-to-r from-black hover:text-slate-500 hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                    <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
                                    </svg>


                                    </div>
                                    <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Ventas</span>
                                </a>
                            </li>
                                 <li class="mt-1 w-full">
                                <a href="/cliente" class="mt-4 hover:text-[#000000]  bg-[#000000]  pb-2 pt-2 text-xs  normal-case leading-normal shadow-[0_4px_9px_-4px_#3b71ca]  duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  py-2 shadow-soft-xl  ease-nav-brand my-0  flex items-center whitespace-nowrap rounded-lg hover:bg-white px-4 font-semibold text-white" >
                                    <div class="bg-gradient-to-r from-black hover:text-slate-500 hover:to-yellow-600 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                    </svg>


                                    </div>
                                    <span class="ml-1   duration-300 opacity-100 pointer-events-none ease-soft">Clientes</span>
                                </a>
                            </li>
                         
                        </div>

                        <hr class="h-px mt-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                        {/* end toggleSubMenu */}

                        
                        


                        <hr class="h-px mt-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

                        <li class="w-full mt-4">
                            <h6 class="pl-6 ml-2 text-xs font-bold leading-tight  normal-case opacity-60">Account pages</h6>
                        </li>

                        <li class="mt-1 w-full border-animation">
                            <a class="agg py-2  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors " >
                                <div class=" bg-[#F82249]  shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 bg-center stroke-0 text-center xl:p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                                </div>
                                <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft normal-case text-black">Mi Perfil</span>
                            </a>
                        </li>

                        <li class="mt-1 w-full">
                            <a href='/' class="py-2  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ">
                                <div class=" bg-[#F82249]  shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 bg-center stroke-0 text-center xl:p-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill='white' viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>

                                </div>
                                <span class="ml-1 text-sm duration-300 pointer-events-none ease-soft normal-case text-black">Sign In</span>
                            </a>
                        </li>

                        <li class="mt-1 w-full">
                            <a href='/' class="py-2  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors " >
                                <div class=" bg-[#F82249]  shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 bg-center stroke-0 text-center xl:p-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>

                                </div>
                                <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft normal-case text-black">Sign Up</span>
                            </a>
                        </li>
                    </ul>
                </div>


            </aside>
        </div>



    );
}

export default SSidenav;