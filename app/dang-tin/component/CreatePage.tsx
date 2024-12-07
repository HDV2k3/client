import React from "react";
import { Form, Button, message } from "antd";
import { notificationService } from "../service/notificationService";
import BasicInfoSection from "./BasicInfoSection";
import RoomDetailsSection from "./RoomInfoEdit";
import RoomPricingSection from "./PricingDetails";
import RoomUtilitiesSection from "./RoomUtilities";
import ContactInfoSection from "./ContactInfoSection";
import AdsSection from "./AdsSection";
interface RoomFormProps {
  onSubmit: (data: RoomFinal) => void;
  roomData?: RoomFinal;
}
const RoomListingForm: React.FC<RoomFormProps> = ({ roomData, onSubmit }) => {
  const [form] = Form.useForm();
  const furnitures = [];
  const amenities = [];
  if (roomData?.roomUtility.furnitureAvailability) {
    furnitures.push(
      ...Object.entries(roomData?.roomUtility.furnitureAvailability).map(
        ([key, value]) => ({
          key,
          value,
        })
      )
    );
  }

  if (roomData?.roomUtility.amenitiesAvailability) {
    amenities.push(
      ...Object.entries(roomData?.roomUtility.amenitiesAvailability).map(
        ([key, value]) => ({
          key,
          value,
        })
      )
    );
  }
  const handleSubmit = (values: any) => {
    // Khai báo kiểu cho các đối tượng để tránh lỗi
    const furnituresObj: { [key: string]: boolean } = {};
    const amenitiesObj: { [key: string]: boolean } = {};

    if (values.furnitureAvailability) {
      values.furnitureAvailability.forEach((item: any) => {
        furnituresObj[item.key] = item.value;
      });
    }
    if (values.amenitiesAvailability) {
      values.amenitiesAvailability.forEach((item: any) => {
        amenitiesObj[item.key] = item.value;
      });
    }
    const roomListingData = {
      ...values,
      availableFromDate: values.availableFromDate.toISOString(),
      roomInfo: {
        ...values.roomInfo,
        availableFromDate: values.availableFromDate.toISOString(),
        width: values.roomInfo.width,
        height: values.roomInfo.height,
        totalArea: values.roomInfo.width * values.roomInfo.height,
      },
      pricingDetails: {
        ...values.pricingDetails,
        additionalFees: values.pricingDetails?.additionalFees
          ? values.pricingDetails.additionalFees.map((fee: any) => ({
              type: fee.type,
              amount: fee.amount,
            }))
          : [],
      },
      roomUtility: {
        furnitureAvailability: furnituresObj,
        amenitiesAvailability: amenitiesObj,
      },
    };
    try {
      onSubmit(roomListingData);
      notificationService.room.saveSuccess(values.title);
      message.success("Room listing submitted successfully!");
    } catch (error) {
      notificationService.room.saveError();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        <AdsSection />
        <BasicInfoSection />
        <RoomDetailsSection />
        <RoomPricingSection />
        <RoomUtilitiesSection />
        <ContactInfoSection />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Tiếp tục thêm ảnh
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RoomListingForm;
