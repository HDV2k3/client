import { useState } from "react";
import { Button, Tooltip, Popover } from "antd";
import {
  SettingOutlined,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

type Props = {
  viewportWidth?: number;
};

const SettingsButton = ({ viewportWidth = 1024 }: Props) => {
  const [theme, setTheme] = useState("light"); // Trạng thái cho chế độ sáng/tối
  const [language, setLanguage] = useState("vi"); // Trạng thái ngôn ngữ

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  const content = (
    <div className="flex flex-col space-y-2">
      <Button onClick={toggleTheme} icon={<BulbOutlined />} type="text">
        {theme === "light" ? "Chế độ Tối" : "Chế độ Sáng"}
      </Button>
      <Button onClick={toggleLanguage} icon={<GlobalOutlined />} type="text">
        {language === "vi" ? "English" : "Tiếng Việt"}
      </Button>
    </div>
  );

  return (
    <Popover content={content} trigger="hover" placement="bottom">
      <Tooltip title="Cài đặt">
        <Button
          type="text"
          icon={<SettingOutlined />}
          style={{
            color: viewportWidth < 1000 ? 'black' : "#FFF",
          }}
        >
          {viewportWidth < 1000 && <span>Cài dặt</span>}
        </Button>
      </Tooltip>
    </Popover>
  );
};

export default SettingsButton;
