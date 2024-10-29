// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import TopNavigation from "./TopNavigation";
// import MainHeader from "./MainHeader";

// const Header = () => {
//   const [userName, setUserName] = useState("Tài Khoản");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [logOut, setlogOut] = useState("");
//   const [profile, setProfile] = useState("");
//   // Ensure code only runs on the client side
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");
//         console.log("Token found:", token); // Log token for debugging

//         if (token) {
//           try {
//             const response = await axios.get(
//               "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/users/me",
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   "Content-Type": "application/json",
//                 },
//               }
//             );

//             console.log("API Response:", response.data); // Log the API response

//             // Ensure that the API response contains expected data
//             if (response.data && response.data.data) {
//               const userData = response.data.data;
//               setUserName(userData.username);
//               setIsLoggedIn(true);
//               setlogOut("Đăng Xuất");
//               setProfile("Tài khoản của tôi");
//               localStorage.setItem("userId", userData.id);
//             } else {
//               console.error("Unexpected API response format:", response.data);
//               handleLogout(); // Handle logout if data is not in expected format
//             }
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//             handleLogout();
//           }
//         } else {
//           console.warn("No token found, user is not authenticated");
//         }
//       }
//     };

//     if (mounted) {
//       checkAuth();
//     }
//   }, [mounted]);

//   const handleLogout = () => {
//     if (typeof window !== "undefined") {
//       window.localStorage.removeItem("token");

//       setIsLoggedIn(false);
//       setUserName("Tài Khoản");
//       router.push("/home");
//     }
//   };

//   // Don't render anything until the component is mounted
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <header
//       className="bg-[#1E3A8A] py-2 sticky top-0 z-50"
//       style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
//     >
//       <div className="container mx-auto px-4">
//         <TopNavigation />
//         <MainHeader
//           userName={userName}
//           isLoggedIn={isLoggedIn}
//           onLogout={handleLogout}
//           logOut={logOut}
//           profile={profile}
//         />
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TopNavigation from "./TopNavigation";
import MainHeader from "./MainHeader";

const Header = () => {
  const [userName, setUserName] = useState("Tài Khoản");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [logOut, setlogOut] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserName("Tài Khoản");
      router.push("/home");
    }
  }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        console.log("Token found:", token);

        if (token) {
          try {
            const response = await axios.get(
              "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/users/me",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("API Response:", response.data);

            if (response.data && response.data.data) {
              const userData = response.data.data;
              const fullName = userData.firstName + " " + userData.lastName;

              setUserName(fullName);
              setIsLoggedIn(true);
              setlogOut("Đăng Xuất");
              setProfile("Tài khoản của tôi");
              localStorage.setItem("userId", userData.id);
            } else {
              console.error("Unexpected API response format:", response.data);
              handleLogout();
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            handleLogout();
          }
        } else {
          console.warn("No token found, user is not authenticated");
        }
      }
    };

    if (mounted) {
      checkAuth();
    }
  }, [mounted, handleLogout]);

  if (!mounted) {
    return null;
  }

  return (
    <header
      className="bg-[#1E3A8A] py-2 sticky top-0 z-50"
      style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="container mx-auto px-4">
        <TopNavigation />
        <MainHeader
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          logOut={logOut}
          profile={profile}
        />
      </div>
    </header>
  );
};

export default Header;
