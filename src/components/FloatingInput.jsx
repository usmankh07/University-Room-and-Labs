import React from "react";
function FloatingInput(props) {
  const { label, onChange, value, type, name } = props;
  return (
    <>
      <div class="relative">
        <input
          name={name}
          type={type}
          id={name}
          class=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-backgroundColor rounded-md border-[1px] border-[#9D9D9D] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-themeColor focus:outline-none focus:ring-0 focus:border-themeColor peer"
          placeholder=" "
          value={value}
          onChange={onChange}
        />
        <label
          for={name}
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-backgroundColor dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-themeColor peer-focus:dark:text-themeColor peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      </div>
    </>
  );
}

export default FloatingInput;
