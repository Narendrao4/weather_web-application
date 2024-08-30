import React from "react";

const Darktheme=({darkmode,setdarkmode})=>{
    return(
    <button 
    onClick={()=>setdarkmode(!darkmode)} className={`mb-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200`}>
        {darkmode?'set Light mode':'Set Dark Mode'}
    </button>
        );
}
export default Darktheme;




