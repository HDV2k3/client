// app/messages/layout.tsx
"use client";
import MessageList from "./MessageList";

export default function MessagesLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Message List Sidebar */}
      <div className="w-96 bg-white border-r">
        <MessageList />
      </div>

      {/* Chat Detail or Placeholder */}
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
}
