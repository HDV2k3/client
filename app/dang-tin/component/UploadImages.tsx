"use client";
import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps, RcFile } from "antd/es/upload/interface";
import axios from "axios";

interface RoomImageUploadProps {
  postId: string;
  initialImages?: Array<{
    name: string;
    urlImagePost: string;
    type: string;
  }>;
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
}

const RoomImageUpload: React.FC<RoomImageUploadProps> = ({
  postId,
  initialImages,
  value,
  onChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialFileList = initialImages.map((image, index) => ({
        uid: `-${index}`,
        name: image.name || `image-${index}`,
        status: "done" as const,
        url: image.urlImagePost,
        type: image.type || "image/jpeg",
      }));
      setFileList(initialFileList);
      onChange?.(initialFileList);
    }
  }, [initialImages, onChange]);

  useEffect(() => {
    if (value) {
      setFileList(value);
    }
  }, [value]);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }
    return true; // Changed to true to allow upload
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > 10) {
      message.error("You can only upload up to 10 images!");
      return;
    }

    setFileList(newFileList);

    // Only trigger onChange when the upload is complete
    const allUploaded = newFileList.every(
      (file) => file.status === "done" || file.url
    );

    if (allUploaded) {
      onChange?.(newFileList);
    }
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    const formData = new FormData();
    formData.append("files", file);
    formData.append("id", postId);

    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/upload-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            onProgress({ percent });
          },
        }
      );

      // Assuming the server returns the URL in response.data
      const uploadedFile = {
        ...file,
        url: response.data.url,
        status: "done",
      };
      onSuccess(response.data, uploadedFile);
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} upload failed`);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let previewUrl = file.url;
    if (!previewUrl && file.originFileObj) {
      previewUrl = await getBase64(file.originFileObj);
    }

    if (previewUrl) {
      const image = new Image();
      image.src = previewUrl;
      const imgWindow = window.open(previewUrl);
      imgWindow?.document.write(image.outerHTML);
    }
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      onPreview={onPreview}
      multiple
      maxCount={10}
      accept="image/*"
    >
      {fileList.length >= 10 ? null : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default RoomImageUpload;
