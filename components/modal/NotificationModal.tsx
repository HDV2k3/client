// NotificationModal.js
import { useEffect, useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaSort,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Your profile has been updated successfully!",
      timestamp: "2024-01-20T10:30:00",
      isRead: false,
    },
    {
      id: 2,
      type: "error",
      message: "Failed to upload document. Please try again.",
      timestamp: "2024-01-20T09:45:00",
      isRead: false,
    },
    {
      id: 3,
      type: "warning",
      message: "Your subscription will expire in 3 days.",
      timestamp: "2024-01-20T08:15:00",
      isRead: false,
    },
    {
      id: 4,
      type: "info",
      message: "New features have been added to the platform.",
      timestamp: "2024-01-20T07:30:00",
      isRead: false,
    },
  ]);
  const [sortType, setSortType] = useState("date");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheck className="text-green-500" />;
      case "error":
        return <FaTimes className="text-red-500" />;
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaExclamationCircle className="text-blue-500" />;
    }
  };

  const handleSort = (type) => {
    setSortType(type);
    let sortedNotifications = [...notifications];

    switch (type) {
      case "date":
        sortedNotifications.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        break;
      case "type":
        sortedNotifications.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }

    setNotifications(sortedNotifications);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filterType === "all") return true;
    return notification.type === filterType;
  });

  return (
    isOpen && (
      <div
        className="fixed inset-0  bg-opacity-50 flex items-end justify-end z-50 mb-16"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="bg-white rounded-lg w-full max-w-md mx-4 animate-modal-enter"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 id="modal-title" className="text-xl font-semibold">
              Notifications
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-4 mb-4">
              <div className="flex items-center">
                <FaSort className="mr-2" />
                <select
                  value={sortType}
                  onChange={(e) => handleSort(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="date">Date</option>
                  <option value="type">Type</option>
                </select>
              </div>
              <div className="flex items-center">
                <FaFilter className="mr-2" />
                <select
                  value={filterType}
                  onChange={(e) => handleFilter(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="all">All</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 ${
                    notification.isRead ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                  role="article"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <span className="mt-1">{getIcon(notification.type)}</span>
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(notification.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                          aria-label="Mark as read"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        aria-label="Delete notification"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;
