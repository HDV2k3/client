"use client";

import React from "react";
import Image from "next/image";
import { Layout } from "antd";
const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer
      className=" text-white py-4 bg-white "
      style={{
        backgroundColor: "#fff",
      }}
    >
      {/* <div className=" text-white py-4 bg-white "> */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center ">
          <section className="w-full md:w-1/3 mb-4 mr-32">
            <p className="text-lg font-bold">TÌM PHÒNG TRỌ TỐT TRÊN NEXTROOM</p>
            <div className="flex items-center mt-2">
              <picture>
                <source
                  type="image/webp"
                  srcSet="https://static.chotot.com/storage/default/group-qr.webp"
                />
                <img
                  alt="Chợ Tốt"
                  src="https://static.chotot.com/storage/default/group-qr.jpeg"
                  width="87"
                  height="87"
                />
              </picture>
              <ul className="flex flex-col  ml-4">
                <li className="mr-2 mb-2">
                  <a
                    href="https://itunes.apple.com/us/app/chotot.vn/id790034666"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Image
                      alt="App Store"
                      src="https://static.chotot.com/storage/default/ios.svg"
                      className="h-8"
                      width={100}
                      height={100}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.chotot.vn"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Image
                      alt="Google Play"
                      src="https://static.chotot.com/storage/default/android.svg"
                      className="h-8"
                      width={100}
                      height={100}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="w-full md:w-1/6 mb-4 mr-44 ">
            <p className="text-lg font-bold">VỀ NEXTROOM</p>
            <ul className="space-y-1">
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  Về NextRoom
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  Quy chế hoạt động sàn
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  Giải quyết tranh chấp
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </section>

          <section className="w-full md:w-1/6 mb-4 ">
            <p className="text-lg font-bold">Liên kết</p>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/huynh.viet.7771"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Image
                    className="h-8"
                    alt="Facebook"
                    src="https://static.chotot.com/storage/default/facebook.svg"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer nofollow">
                  <Image
                    className="h-8"
                    alt="Youtube"
                    src="https://static.chotot.com/storage/default/youtube.svg"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/devvietne/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Image
                    className="h-8"
                    alt="LinkedIn"
                    src="https://static.chotot.com/storage/default/linkedin.svg"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="w-full border-t border-gray-700 my-4"></div>

        <section className="w-full text-center">
          <address className="text-[12px] text-gray-500 mx-auto">
            CÔNG TY TNHH NEXTROOM - Người đại diện theo pháp luật: Dev Java;
            GPDKKD: 0999999999 do Sở KH & ĐT TP.HCM cấp ngày 9/9/2024;
            <br />
            GPMXH: 322/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày
            10/9/2024 - Chịu trách nhiệm nội dung: Trần Văn Dev.
            <a href="/" target="_blank" rel="noopener noreferrer nofollow">
              {" "}
              Chính sách sử dụng
            </a>
            <br />
            Địa chỉ: Thành phố Hồ Chí Minh, Việt Nam; Email:
            devjavahcmc@gmail.com - Tổng đài CSKH: 0329999999 (1.000đ/phút)
          </address>
        </section>
      </div>
      {/* </div> */}
    </Footer>
  );
};

export default AppFooter;
