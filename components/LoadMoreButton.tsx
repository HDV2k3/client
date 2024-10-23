import React from "react";
import { Button } from "antd";

interface LoadMoreButtonProps {
  isLoadingInitialData: boolean;
  isReachingEnd: boolean;
  loadMore: () => void;
  reset: () => void;
  roomsLength: number;
  isLoadingMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoadingInitialData,
  isReachingEnd,
  loadMore,
  reset,
  roomsLength,
  isLoadingMore,
}) => {
  return (
    <div className="text-center mt-4">
      {isLoadingInitialData ? (
        <div>Loading...</div>
      ) : (
        <>
          {!isReachingEnd && roomsLength > 0 && (
            <Button onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? "Loading..." : "Xem thêm"}
            </Button>
          )}
          {isReachingEnd && <Button onClick={reset}>Rút gọn</Button>}
        </>
      )}
    </div>
  );
};

export default LoadMoreButton;
