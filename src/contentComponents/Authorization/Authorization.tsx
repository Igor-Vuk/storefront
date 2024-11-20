import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { FilterContext } from "../../context/FilterContext"
import { loginUser, refreshToken } from "../../api/api"
import { UserInfo } from "../../context/FilterContext.types"

/* 
use this to test loginUser:
username: emilys
password: emilyspass 
*/

const Authorization: React.FC = () => {
  const { isLoggedIn, handleLoggedIn, userInfo, setUserInfo } =
    useContext(FilterContext)!

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async () => {
    try {
      const data: UserInfo = await loginUser(username, password)

      // Save user info and tokens to sessionStorage
      sessionStorage.setItem("userInfo", JSON.stringify(data))
      sessionStorage.setItem("accessToken", data.accessToken)
      sessionStorage.setItem("refreshToken", data.refreshToken)

      const { accessToken, refreshToken, ...filteredUserInfo } = data
      setUserInfo(filteredUserInfo)
      handleLoggedIn(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || "Login failed")
    }
  }

  const handleLogout = () => {
    // Clear sessionStorage and reset state
    sessionStorage.removeItem("userInfo")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")

    setUserInfo(null)
    handleLoggedIn(false)
  }

  const refreshAuthToken = async () => {
    const refreshTokenValue = sessionStorage.getItem("refreshToken")
    if (!refreshTokenValue) {
      alert("No refresh token available.")
      return
    }

    try {
      const data = await refreshToken(refreshTokenValue)

      // Save new tokens to sessionStorage
      sessionStorage.setItem("accessToken", data.accessToken)
      sessionStorage.setItem("refreshToken", data.refreshToken)

      alert("Token refreshed successfully!")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || "Token refresh failed")
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 sm:items-center">
      {!isLoggedIn ? (
        <div className="w-96 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Prijava
          </h2>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="mb-2 w-full rounded-md bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Prijavi se
          </button>
          <NavLink
            to="/"
            className="inline-block w-full rounded-md bg-green-500 py-2 text-center text-white transition duration-200 hover:bg-green-600"
          >
            Povratak
          </NavLink>
        </div>
      ) : (
        <div className="w-96 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Pozdrav, {userInfo?.firstName} {userInfo?.lastName}
          </h2>

          <img
            src={userInfo?.image}
            alt="User"
            className="mx-auto mb-4 size-20 rounded-full"
          />
          <button
            onClick={refreshAuthToken}
            className="mb-2 w-full rounded-md bg-yellow-500 py-2 text-white transition duration-200 hover:bg-yellow-600"
          >
            Refresh Token
          </button>
          <button
            onClick={handleLogout}
            className="mb-2 w-full rounded-md bg-red-500 py-2 text-white transition duration-200 hover:bg-red-600"
          >
            Odjavi se
          </button>

          <NavLink
            to="/"
            className="inline-block w-full rounded-md bg-green-500 py-2 text-center text-white transition duration-200 hover:bg-green-600"
          >
            Povratak
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Authorization
