import React, { useState } from "react";

function Square(){
 const [value, setValue] = useState(null)

    function handelClick(){
      setValue('X')
      console.log('clicked');
    }

  return  <button 
  className="bg-white border border-gray-400 h-12 w-12 leading-9 text-lg m-1"
  onClick={handelClick}
  >
  {value}
</button>
}


export default function Board() {
  return (
    <>
      <div className="flex">
       <Square  />
       <Square />
       <Square />
      </div>

      <div className="flex">
       <Square />
       <Square />
       <Square />
      </div>

      <div className="flex">
       <Square />
       <Square />
       <Square />
      </div>
  
    </>
  );
}
