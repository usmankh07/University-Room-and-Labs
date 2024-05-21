import React, { useState } from "react";
import FloatingInput from "../../components/FloatingInput";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../hooks/useLogin";
import login from "../../assets/login.png";
import { ButtonLoader_1 } from "../../components/shared/Loaders";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [password, setPassword] = useState(false);
  const { Login, loading } = useLogin();
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await Login({
        email: values.email,
        password: values.password,
      });
    },
  });
  return (
    <>
      <div className="flex bg-backgroundColor">
        {/* First */}
        <div className="w-[55%] relative">
          <div
            className="w-[90%] h-[100vh] flex justify-center flex-col p-2 relative border-r-4 border-white"
            style={{ boxShadow: "2px 4px 8px 0 #7373734D" }}
          ></div>
          <img
            src={login}
            alt=""
            className="absolute bottom-0 right-0 h-[100vh]"
            style={{ backgroundSize: "100% 100%", objectFit: "contain" }}
          />
        </div>
        {/* Second */}
        <div className="w-[45%] flex justify-center bg-backgroundColor">
          <div className="w-full h-full flex flex-col justify-center items-center gap-4 2xl:px-32 lg:px-20">
            <div className="flex flex-col items-center">
              <h1 className="font-[700] text-[36px] text-[#1C1D1E] font-roboto">
                Welcome
              </h1>
              <p className="font-[400] text-[24px] text-[#7A7A7A] font-roboto">
                Please enter your details
              </p>
            </div>
            <div className="w-full flex flex-col lg:mt-4 xs:mt-4">
              <FloatingInput
                type="text"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs mt-1 font-roboto">
                  {errors.email}
                </p>
              )}
              <div className="relative lg:mt-4 xs:mt-2">
                <FloatingInput
                  className="w-[100%] font-roboto"
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type={password ? "text" : "password"}
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setPassword(!password)}
                >
                  {password ? (
                    <BiShow className="text-2xl text-[#95969D]" />
                  ) : (
                    <BiHide className="text-2xl text-[#95969D]" />
                  )}
                </div>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-700 text-xs mt-1 font-roboto">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white h-[45px] flex justify-center items-center rounded mt-4 font-[700] text-[18px] font-roboto"
            >
              {loading ? <ButtonLoader_1 /> : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
