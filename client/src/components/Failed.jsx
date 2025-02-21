import React from "react";

function Failed() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <div className="flex justify-center items-center bg-red-600 rounded-full w-16 h-16 mx-auto my-6">
          <svg viewBox="0 0 24 24" className="text-white w-8 h-8">
            <path
              fill="currentColor"
              d="M18.364 5.636a1 1 0 0 0-1.414 0L12 9.586 7.05 4.636a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 5.95a1 1 0 0 0 1.414 1.414L12 14.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-5.95a1 1 0 0 0 0-1.414z"
            ></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed!
          </h3>
          <p className="text-gray-600 my-2">
            We encountered an issue while processing your payment. Please try
            again later or contact support.
          </p>
          <p> We apologize for the inconvenience. </p>
          <div className="py-10 text-center">
            <a
              href="/"
              className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3"
            >
              TRY AGAIN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Failed;
