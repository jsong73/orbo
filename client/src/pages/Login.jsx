import React , {useState} from "react";
import { Form, Link } from "react-router-dom"
import { login } from "../../utils/api";
import Auth from "../../utils/auth";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("")
const [error, setError] =useState("")

const handleLogin = async (event) => {
  event.preventDefault();
  try{
    const data = { email, password };
    // console.log("data", data)
    const res = await login(data);

    if(res && res.message) {
      switch(res.message) {
        case "Please fill out empty fields":
          setError("Please fill out empty fields");
          break;
        case "No user exists":
          setError("No user exists");
          break;
        case "Invalid credentials":
          setError("Invalid credentials")
          break;
          default:
            Auth.login(res.token);
      }
    } else {
      Auth.login(res.token);
    }
  } catch(error){
    console.log("error", error)

  }
}

return (
<div className="flex flex-col justify-center sm:py-12">
  <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    <h1 className="font-bold text-center text-2xl mb-5"> Sign in</h1>  


    <Form method="post" action="/login "onSubmit={handleLogin}>
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <div className="px-5 py-7">

        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
        <input type="username" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input type="password"  autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

        <button type="submit" className="transition duration-200 bg-blue-400 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>

        { error && (
         <div className="text-red-500 font-semibold text-sm text-center mt-3">{error}</div>
        )}

      </div>
      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
            </button>
          </div>
          <div className="text-center sm:text-right  whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <Link to="/register"className="inline-block ml-1"> Register </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <Link to="/"className="inline-block ml-1"> Back to Orbo.com </Link>
            </button>
          </div>
        </div>
      </div>
      </Form>

  </div>
</div>
  )
}

export default Login;

