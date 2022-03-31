import "./style.css"

function Notice(props) {
    const { message, status, handleNotice, typeNotice} = props
  
    const handleClose =()=>{
      handleNotice(false);
    }
      return (<>
        <div className={ `${status ? "block" : "hidden"} notice overflow-y-auto overflow-x-hidden  z-50 md:h-modal`}>
        <div className="notice__content relative p-4 w-full max-w-md md:h-full h-auto ">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-primary border-2">
            {/* Modal header */}
            <div className="flex justify-end p-2">
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={handleClose}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>  
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 pt-0 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
              <button onClick={()=>{handleClose()}} type="button" className={`text-white ${typeNotice? "bg-primary" : "bg-red-600"} focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}>
                {typeNotice ? "Got it!" : "Ok, I'm try again"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
      )
  }
  
  export default Notice



