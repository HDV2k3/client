// // app/messages/layout.tsx
// "use client";
// import React, { ReactNode } from "react"; // Import ReactNode
// import MessageList from "./users";

// interface MessagesLayoutProps {
//   children: ReactNode; // Specify that children is of type ReactNode
// }

// export default function MessagesLayout({ children }: MessagesLayoutProps) {
//   return (
//     <div className=" flex container mx-auto px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl h-[900px]">
//       {/* Message List Sidebar */}
//       <div className="w-96 bg-white border-r">
//         <MessageList />
//       </div>

//       {/* Chat Detail or Placeholder */}
//       <div className="flex-1 bg-gray-100 h-[883px]">{children}</div>
//     </div>
//   );
// }
"use client";
import React, { ReactNode } from "react";
import MessageList from "./users";

interface MessagesLayoutProps {
  children: ReactNode;
}

export default function MessagesLayout({ children }: MessagesLayoutProps) {
  return (
    <div className="flex flex-col sm:flex-row container mx-auto px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl h-auto sm:h-[900px]">
      {/* Message List Sidebar */}
      <div className="w-full sm:w-96 bg-white border-r h-[300px] sm:h-full overflow-y-auto">
        <MessageList />
      </div>

      {/* Chat Detail or Placeholder */}
      <div className="flex-1 bg-gray-100 h-[500px] sm:h-full">{children}</div>
    </div>
  );
}
