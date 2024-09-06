import React from "react";

const Darktheme=({darkmode,setdarkmode})=>{
    return(
    <button style={{backgroundColor:'black',color:'white'}}
    onClick={()=>setdarkmode(!darkmode)} className={`mb-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200`}>
        {darkmode?'Set Light Mode':'Set Dark Mode'}
    </button>
        );
}
export default Darktheme;




