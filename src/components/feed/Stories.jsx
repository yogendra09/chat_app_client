import React from "react";

const Stories = () => {
  return (
    <div>
      <div className="max-w-full mx-auto p-8">
        <h2 className="sm:text-lg sm:text-pink-700 leading-snug tracking-widest uppercase font-semibold">
          Introducing...
        </h2>
        <p className="text-3xl font-extrabold leading-none text-gray-800 py-4">
          Tailwind Stories
        </p>

        <ul className="flex space-x-6 font-serif ">
          <li className="flex flex-col items-center space-y-1 relative">
            <div className="bg-gradient-to-tr from-yellow-300 to-fuchsia-800 p-1 rounded-full">
              <a
                className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
                href="#"
              >
                <img
                  className="h-24 w-24 rounded-full"
                  src="http://placekitten.com/200/300"
                  alt="cute kitty"
                />
              </a>
            </div>
            <button
              className="absolute bottom-8 right-1 bg-purple-800 rounded-full h-8 w-8 text-2xl
        text-white font-semibold border-2
         border-white flex justify-center items-center font-mono hover:bg-blue-700"
            >
              +
            </button>
            <a href="#">you</a>
          </li>

          <li className="flex flex-col items-center space-y-1 ">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a
                className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
                href="#"
              >
                <img
                  className="h-24 w-24 rounded-full"
                  src="http://placekitten.com/208/136"
                  alt="cute kitty"
                />
              </a>
            </div>
            <a href="#">snuggless</a>
          </li>

          <li className="flex flex-col items-center space-y-1 ">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a
                className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
                href="#"
              >
                <img
                  className="h-24 w-24 rounded-full"
                  src="http://placekitten.com/100/200"
                  alt="cute kitty"
                />
              </a>
            </div>
            <a href="#">meoww_2</a>
          </li>
          <li className="flex flex-col items-center space-y-1 ">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a
                className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
                href="#"
              >
                <img
                  className="h-24 w-24 rounded-full"
                  src="http://placekitten.com/300/400"
                  alt="cute kitty"
                />
              </a>
            </div>
            <a href="#">me_kitty</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Stories;
