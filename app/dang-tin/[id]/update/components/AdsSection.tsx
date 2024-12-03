import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const text = `
Nâng cấp gói vip để mở giới hạn bài viết
`;
const text1 = `
Được thêm các tính năng với bài viết được ưu tiên xuất hiện ở đầu trang tăng tỉ lệ tiếp cận khách hàng
`;
const text2 = `
Contact: Email:dacviethuynh@gmail.com | SĐT: 0329615309
`;
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Số lượt đăng tin miễn phí của bạn còn 5 lần",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label:
      "Nâng cấp dịch vụ để được đăng tin nhiều hơn chi phí rẽ nhất Việt Nam !",
    children: <p>{text1}</p>,
  },
  {
    key: "3",
    label:
      "bạn có thắc mắc hoặc cần sự trợ giúp.Hãy liên hệ với chúng tôi qua các kênh chat trực tiêp, mạng xã hội hoặc có thể nhờ AI tư vấn",
    children: <p>{text2}</p>,
  },
];

const AdsSectionUpdate: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
  );
};

export default AdsSectionUpdate;
