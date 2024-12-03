import React, { useState } from 'react';
import { Tabs } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface Post {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    views: number;
}
interface PostListProps {
    posts: Post[];
}
const PostList: React.FC<PostListProps> = ({ posts }) => {

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              post.status === 'active' ? 'bg-green-100 text-green-800' :
              post.status === 'expired' ? 'bg-gray-100 text-gray-800' :
              post.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {post.status}
            </span>
          </div>
          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            <span>Ngày đăng: {post.createdAt}</span>
            <span>Lượt xem: {post.views}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const PostManagement = () => {
  const [activeTab, setActiveTab] = useState('1');

  const mockPosts = {
    active: [
      { id: 1, title: 'Tin đang hiển thị 1', description: 'Mô tả tin...', status: 'active', createdAt: '2024-12-04', views: 150 },
      { id: 2, title: 'Tin đang hiển thị 2', description: 'Mô tả tin...', status: 'active', createdAt: '2024-12-04', views: 120 },
    ],
    expired: [
      { id: 3, title: 'Tin hết hạn 1', description: 'Mô tả tin...', status: 'expired', createdAt: '2024-11-20', views: 200 },
    ],
    rejected: [
      { id: 4, title: 'Tin bị từ chối 1', description: 'Mô tả tin...', status: 'rejected', createdAt: '2024-12-01', views: 0 },
    ],
    pending: [
      { id: 5, title: 'Tin chờ duyệt 1', description: 'Mô tả tin...', status: 'pending', createdAt: '2024-12-04', views: 0 },
    ],
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="flex items-center gap-2">
          <CheckCircleOutlined />
          Tin đang hiển thị
        </span>
      ),
      children: <PostList posts={mockPosts.active} />,
    },
    {
      key: '2',
      label: (
        <span className="flex items-center gap-2">
          <CalendarOutlined />
          Tin hết hạn
        </span>
      ),
      children: <PostList posts={mockPosts.expired} />,
    },
    {
      key: '3',
      label: (
        <span className="flex items-center gap-2">
          <CloseCircleOutlined />
          Tin bị từ chối
        </span>
      ),
      children: <PostList posts={mockPosts.rejected} />,
    },
    {
      key: '4',
      label: (
        <span className="flex items-center gap-2">
          <ClockCircleOutlined />
          Tin chờ duyệt
        </span>
      ),
      children: <PostList posts={mockPosts.pending} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Quản lý tin đăng</h2>
        <Tabs
          activeKey={activeTab}
          items={items}
          onChange={setActiveTab}
          className="bg-white p-6 rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default PostManagement;