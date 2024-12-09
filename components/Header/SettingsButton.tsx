import { useState } from "react";
import { Button, Tooltip, Popover } from "antd";
import {
  SettingOutlined,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import useLanguge from "@/hooks/useLanguge";
type Props = {
  viewportWidth?: number;
};

const SettingsButton = ({ viewportWidth = 1024 }: Props) => {
  const { getLanguge, setLanguge, LangugeOptions } = useLanguge();
  const lang = getLanguge();
  const [theme, setTheme] = useState("light"); // Trạng thái cho chế độ sáng/tối

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguge(lang === 'vi' ? 'en' : 'vi');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const content = (
    <div className="flex flex-col space-y-2 w-[100px]">
      <Button onClick={toggleTheme} icon={<BulbOutlined />} type="text">
        {theme === "light" ? <>{LangugeOptions[lang]?.header?.darkMode}</> : <>{LangugeOptions[lang]?.header?.lightMode}</>}
      </Button>
      <Button onClick={toggleLanguage} icon={<GlobalOutlined />} type="text">
        {lang === "en" ? <>{LangugeOptions[lang]?.header?.VietNamese}</> : <>{LangugeOptions[lang]?.header?.English}</>}
      </Button>
    </div>
  );

  return (
    <Popover content={content} trigger="hover" placement="bottom" style={{ maxWidth: 120 }}>
      <Tooltip title={LangugeOptions[lang]?.header?.setting}>
        <Button
          type="text"
          icon={<SettingOutlined />}
          style={{
            color: viewportWidth < 1000 ? 'black' : "#FFF",
          }}
        >
          {viewportWidth < 1000 && <span>{LangugeOptions[lang]?.header?.setting}</span>}
        </Button>
      </Tooltip>
    </Popover>
  );
};

export default SettingsButton;
