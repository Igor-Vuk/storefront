import { useContext, useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FilterContext } from "../../context/FilterContext"
import { loginUser, refreshToken } from "../../api/api.ts"

/* 
emilys
emilyspass 
*/

const Authorization = () => {
  const { isLoggedIn, handleLoggedIn } = useContext(FilterContext)

  const [userInfo, setUserInfo] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Check sessionStorage for user info on mount
  useEffect(() => {
    const savedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if (savedUserInfo) {
      const { accessToken, refreshToken, ...filteredUserInfo } = savedUserInfo // Exclude tokens for security
      setUserInfo(filteredUserInfo)
      handleLoggedIn(true)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password)

      // Save user info and tokens to sessionStorage
      sessionStorage.setItem("userInfo", JSON.stringify(data))
      sessionStorage.setItem("accessToken", data.accessToken)
      sessionStorage.setItem("refreshToken", data.refreshToken)

      const { accessToken, refreshToken, ...filteredUserInfo } = data
      setUserInfo(filteredUserInfo)
      handleLoggedIn(true)
    } catch (error) {
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
    } catch (error) {
      alert(error.message || "Token refresh failed")
    }
  }

  return (
    <div className="flex items-start sm:items-center justify-center min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Prijava
          </h2>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-2"
          >
            Prijavi se
          </button>
          <NavLink
            to="/"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 text-center inline-block"
          >
            Povratak
          </NavLink>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Pozdrav, {userInfo?.firstName} {userInfo?.lastName}
          </h2>

          <img
            src={userInfo?.image}
            alt="User"
            className="rounded-full w-20 h-20 mx-auto mb-4"
          />
          <button
            onClick={refreshAuthToken}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-200 mb-2"
          >
            Refresh Token
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mb-2"
          >
            Odjavi se
          </button>

          <NavLink
            to="/"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 text-center inline-block"
          >
            Povratak
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Authorization
