import React from "react";
import { Form, Button, message, UploadFile } from "antd";
import { notificationService } from "../../../service/notificationService";

import AdsSectionUpdate from "./AdsSection";
import BasicInfoSectionUpdate from "./BasicInfoSection";
import RoomDetailsSectionUpdate from "./RoomInfoEdit";
import RoomPricingSectionUpdate from "./PricingDetails";
import RoomUtilitiesSectionUpdate from "./RoomUtilities";
import ContactInfoSectionUpdate from "./ContactInfoSection";
import RoomImageUpload from "@/app/dang-tin/component/UploadImages";
import dayjs from "dayjs";

import type { DatePickerProps } from "antd";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
interface RoomFormProps {
  roomData?: RoomFinal;
  onSubmit: (data: RoomFinal) => void;
}

const RoomListingFormUpdate: React.FC<RoomFormProps> = ({
  roomData,
  onSubmit,
}) => {
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
      availableFromDate: values.availableFromDate,
      roomInfo: {
        ...values.roomInfo,
        availableFromDate: values.availableFromDate,
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
  const handleImagesChange = (images: UploadFile[]) => {
    form.setFieldsValue({
      roomImages: images.map((file) => ({
        name: file.name,
        urlImagePost: file.url || file.response?.url,
        type: file.type,
      })),
    });
  };
  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          ...roomData,
          amenitiesAvailability: amenities,
          furnitureAvailability: furnitures,
          roomInfo: {
            ...roomData?.roomInfo,
            availableFromDate: roomData?.roomInfo?.availableFromDate
              ? dayjs(roomData.roomInfo.availableFromDate)
              : null,
          },
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
          <RoomImageUpload
            postId={roomData?.id || ""}
            initialImages={roomData?.roomInfo?.postImages}
            onChange={handleImagesChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Hoàn Tất Chỉnh Sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoomListingFormUpdate;
