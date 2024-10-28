"use client";
import { useRouter } from "next/navigation";
import { Avatar, Input, Button } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";

const MessageList = () => {
  const router = useRouter();
  const userList = [
    {
      id: 1,
      avatar: "/api/placeholder/40/40",
      name: "Người dùng 1",
      time: "1 năm trước",
      title: "Cần người làm việc",
      description: "Đang tìm kiếm ứng viên...",
      status: "TỐT",
    },
    {
      id: 2,
      avatar: "/api/placeholder/40/40",
      name: "Người dùng 2",
      time: "2 năm trước",
      title: "Tuyển nhân viên",
      description: "Vị trí đang mở...",
      status: "TỐT",
    },
  ];

  const handleUserClick = (userId) => {
    router.push(`/messages/${userId}`);
  };

  return (
    <div>
      {/* Search header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <select className="px-4 py-2 border rounded-md text-gray-600">
            <option>Tất cả</option>
          </select>
          <Button
            type="text"
            icon={<SettingOutlined className="text-gray-600" />}
          />
        </div>
        <Input
          placeholder="Nhập ít nhất 3 ký tự để bắt đầu tìm kiếm"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full"
        />
      </div>

      {/* User List */}
      <div className="overflow-y-auto">
        {userList.map((user) => (
          <div
            key={user.id}
            className="flex items-start p-4 border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => handleUserClick(user.id)}
          >
            <Avatar src={user.avatar} className="flex-shrink-0" size={40} />
            <div className="ml-3 flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <span className="text-sm text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{user.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {user.description}
              </p>
            </div>
            <div className="ml-2 flex-shrink-0">
              <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
