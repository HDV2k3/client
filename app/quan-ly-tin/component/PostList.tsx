import React from "react";
import { Spin, Pagination } from "antd";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Room[];
  loading: boolean;
  onPageChange: (page: number) => void;
  total: number;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  onPageChange,
  total,
}) => {
  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      <Pagination
        className="mt-4"
        total={total}
        pageSize={5}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PostList;
