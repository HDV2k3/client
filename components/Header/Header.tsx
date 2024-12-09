"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from '@/hooks/useRouter';
import axios from "axios";
import TopNavigation from "./TopNavigation";
import MainHeader from "./MainHeader";

const Header = () => {
  const [userName, setUserName] = useState("Tài Khoản");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logOut, setlogOut] = useState("");
  const [profile, setProfile] = useState("");
  const [deposit, setDeposit] = useState("Nạp tiền");
  const router = useRouter();

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("privateKey");
      window.localStorage.removeItem("publicKey");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      setUserName("Tài Khoản");
      window.localStorage.removeItem("fullName");
      router.push("/home");
    }
  }, [router]);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_USER}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.data) {
          const userData = response.data.data;
          const fullName = `${userData.firstName} ${userData.lastName}`;
          setlogOut("Đăng Xuất");
          setProfile("Tài khoản của tôi");
          setUserName(fullName);
          const userId = Number(localStorage.setItem("userId", userData.id));

          setIsLoggedIn(true);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    fetchUserData();

    // Lắng nghe sự kiện 'userLogin' từ LoginPage
    const handleUserLogin = () => {
      fetchUserData();
    };

    window.addEventListener("userLogin", handleUserLogin);

    return () => {
      window.removeEventListener("userLogin", handleUserLogin);
    };
  }, [fetchUserData]);

  return (
    <header className="bg-[#1E3A8A] py-2 sticky top-0 z-50">
      <div className="container mx-auto  sm:px-6 lg:px-8">
        <TopNavigation />
        <MainHeader
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          logOut={logOut}
          profile={profile}
          deposit={deposit}
        />
      </div>
    </header>
  );
};

export default Header;
