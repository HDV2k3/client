// import React, { useState } from "react";
// import { Form, Switch, Input, Button } from "antd";
// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// interface RoomUtility {
//   furnitureAvailability: Record<string, boolean>;
//   amenitiesAvailability: Record<string, boolean>;
// }

// interface RoomUtilityFormProps {
//   roomUtility?: RoomUtility;
// }
// const RoomUtilitiesSectionUpdate: React.FC<RoomUtilityFormProps> = ({
//   roomUtility,
// }) => {
//   const [furnitureUtilities, setFurnitureUtilities] = useState<string[]>([]);

//   const [amenitiesUtilities, setAmenitiesUtilities] = useState<string[]>([]);

//   const [newUtility, setNewUtility] = useState<string>("");

//   const addUtility = (type: "furniture" | "amenities") => {
//     if (newUtility.trim()) {
//       const setUtilities =
//         type === "furniture" ? setFurnitureUtilities : setAmenitiesUtilities;
//       setUtilities((prev) => [...prev, newUtility.trim()]);
//       setNewUtility("");
//     }
//   };

//   const removeUtility = (type: "furniture" | "amenities", utility: string) => {
//     const setUtilities =
//       type === "furniture" ? setFurnitureUtilities : setAmenitiesUtilities;
//     setUtilities((prev) => prev.filter((item) => item !== utility));
//   };

//   return (
//     <div>
//       {/* Furniture Section */}
//       <div className="bg-gray-100 p-6 rounded-lg mt-6">
//         <h3 className="text-xl font-semibold mb-4">Nội thất có sẵn</h3>
//         <div className="grid md:grid-cols-3 gap-4">
//           {furnitureUtilities.map((utility) => (
//             <Form.Item
//               key={utility}
//               name={[
//                 "roomUtility",
//                 "furnitureAvailability",
//                 utility.replace(/\s/g, ""),
//               ]}
//               valuePropName="checked"
//             >
//               <div className="flex items-center">
//                 <Switch
//                   checkedChildren={utility}
//                   unCheckedChildren={utility}
//                   defaultValue={roomUtility?.furnitureAvailability[utility]}
//                 />
//                 <Button
//                   danger
//                   icon={<MinusOutlined />}
//                   onClick={() => removeUtility("furniture", utility)}
//                   className="ml-2"
//                 />
//               </div>
//             </Form.Item>
//           ))}
//         </div>
//         <div className="mt-4 flex">
//           <Input
//             placeholder="Add new furniture utility"
//             value={newUtility}
//             onChange={(e) => setNewUtility(e.target.value)}
//             className="mr-2"
//           />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => addUtility("furniture")}
//           >
//             Add
//           </Button>
//         </div>
//       </div>

//       {/* Amenities Section */}
//       <div className="bg-gray-100 p-6 rounded-lg mt-6">
//         <h3 className="text-xl font-semibold mb-4">Tiện nghi có sẵn</h3>
//         <div className="grid md:grid-cols-3 gap-4">
//           {amenitiesUtilities.map((utility) => (
//             <Form.Item
//               key={utility}
//               name={[
//                 "roomUtility",
//                 "amenitiesAvailability",
//                 utility.replace(/\s/g, ""),
//               ]}
//               valuePropName="checked"
//             >
//               <div className="flex items-center">
//                 <Switch
//                   checkedChildren={utility}
//                   unCheckedChildren={utility}
//                   defaultValue={roomUtility?.amenitiesAvailability[utility]}
//                 />
//                 <Button
//                   danger
//                   icon={<MinusOutlined />}
//                   onClick={() => removeUtility("amenities", utility)}
//                   className="ml-2"

//                 />
//               </div>
//             </Form.Item>
//           ))}
//         </div>
//         <div className="mt-4 flex">
//           <Input
//             placeholder="Add new amenity"
//             value={newUtility}
//             onChange={(e) => setNewUtility(e.target.value)}
//             className="mr-2"
//           />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => addUtility("amenities")}
//           >
//             Add
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomUtilitiesSectionUpdate;
import React, { useState } from "react";
import { Form, Switch, Input, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

interface RoomUtility {
  furnitureAvailability: Record<string, boolean>;
  amenitiesAvailability: Record<string, boolean>;
}

interface RoomUtilityFormProps {
  roomUtility?: RoomUtility;
}

const RoomUtilitiesSectionUpdate: React.FC<RoomUtilityFormProps> = ({
  roomUtility,
}) => {
  const [furnitureUtilities, setFurnitureUtilities] = useState<string[]>([]);
  const [amenitiesUtilities, setAmenitiesUtilities] = useState<string[]>([]);
  const [newUtility, setNewUtility] = useState<string>("");

  const addUtility = (type: "furniture" | "amenities") => {
    if (newUtility.trim()) {
      const setUtilities =
        type === "furniture" ? setFurnitureUtilities : setAmenitiesUtilities;
      setUtilities((prev) => [...prev, newUtility.trim()]);
      setNewUtility("");
    }
  };

  const removeUtility = (type: "furniture" | "amenities", utility: string) => {
    const setUtilities =
      type === "furniture" ? setFurnitureUtilities : setAmenitiesUtilities;
    setUtilities((prev) => prev.filter((item) => item !== utility));
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        roomUtility: {
          furnitureAvailability: roomUtility?.furnitureAvailability || {},
          amenitiesAvailability: roomUtility?.amenitiesAvailability || {},
        },
      }}
    >
      {/* Furniture Section */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4">Nội thất có sẵn</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {furnitureUtilities.map((utility) => (
            <Form.Item
              key={utility}
              name={[
                "roomUtility",
                "furnitureAvailability",
                utility.replace(/\s/g, ""),
              ]}
              valuePropName="checked"
            >
              <div className="flex items-center">
                <Switch
                  checkedChildren={utility}
                  unCheckedChildren={utility}
                  checked={roomUtility?.furnitureAvailability[utility]}
                />
                <Button
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => removeUtility("furniture", utility)}
                  className="ml-2"
                />
              </div>
            </Form.Item>
          ))}
        </div>
        <div className="mt-4 flex">
          <Input
            placeholder="Add new furniture utility"
            value={newUtility}
            onChange={(e) => setNewUtility(e.target.value)}
            className="mr-2"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => addUtility("furniture")}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4">Tiện nghi có sẵn</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {amenitiesUtilities.map((utility) => (
            <Form.Item
              key={utility}
              name={[
                "roomUtility",
                "amenitiesAvailability",
                utility.replace(/\s/g, ""),
              ]}
              valuePropName="checked"
            >
              <div className="flex items-center">
                <Switch
                  checkedChildren={utility}
                  unCheckedChildren={utility}
                  checked={roomUtility?.amenitiesAvailability[utility]}
                />
                <Button
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => removeUtility("amenities", utility)}
                  className="ml-2"
                />
              </div>
            </Form.Item>
          ))}
        </div>
        <div className="mt-4 flex">
          <Input
            placeholder="Add new amenity"
            value={newUtility}
            onChange={(e) => setNewUtility(e.target.value)}
            className="mr-2"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => addUtility("amenities")}
          >
            Add
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RoomUtilitiesSectionUpdate;
