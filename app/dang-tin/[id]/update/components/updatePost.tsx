import React from "react";
import { Form, Button, message } from "antd";
import { notificationService } from "../../../service/notificationService";

import AdsSectionUpdate from "./AdsSection";
import BasicInfoSectionUpdate from "./BasicInfoSection";
import RoomDetailsSectionUpdate from "./RoomInfoEdit";
import RoomPricingSectionUpdate from "./PricingDetails";
import RoomUtilitiesSectionUpdate from "./RoomUtilities";
import ContactInfoSectionUpdate from "./ContactInfoSection";

interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const RoomListingFormUpdate: React.FC<RoomFormProps> = ({
  roomData,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const roomListingData = {
      ...values,
      // availableFromDate: values.availableFromDate.toISOString(),
      roomInfo: {
        ...values.roomInfo,
        // availableFromDate: values.availableFromDate.toISOString(),
        width: values.roomInfo.width,
        height: values.roomInfo.height,
        totalArea: values.roomInfo.width * values.roomInfo.height,
      },
      roomUtility: {
        furnitureAvailability: Object.fromEntries(
          Object.entries(values.roomUtility?.furnitureAvailability || {}).map(
            ([key, value]) => [key, !!value]
          )
        ),
        amenitiesAvailability: Object.fromEntries(
          Object.entries(values.roomUtility?.amenitiesAvailability || {}).map(
            ([key, value]) => [key, !!value]
          )
        ),
      },
      pricingDetails: {
        ...values.pricingDetails,
        additionalFees: values.pricingDetails?.additionalFees || [],
      },
    };
    localStorage.setItem("fixPrice", values.fixPrice);
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
        initialValues={{
          ...roomData,
        }}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        <AdsSectionUpdate />
        <BasicInfoSectionUpdate />
        <RoomDetailsSectionUpdate />
        <RoomPricingSectionUpdate />
        <RoomUtilitiesSectionUpdate />
        <ContactInfoSectionUpdate />
        {/* Room Images */}

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

export default RoomListingFormUpdate;
