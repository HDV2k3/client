import React from "react";

type TitleRoomProps = {
  title: string;
  className?: string;
};

const TitleRoom = ({ title, className }: TitleRoomProps) => {
  return (
    <div className=" ">
      <h2 className={`text-black text-2xl ${className}`}>{title}</h2>
    </div>
  );
};
export default TitleRoom;
