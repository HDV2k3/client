interface PostImage {
  name: string;
  type: string;
  urlImagePost: string;
}

// types/Room.ts
interface RoomInfo {
  name: string;
  description: string;
  address: string;
  type: string;
  style: string;
  floor: string;
  postImages: PostImage[];
  width: number;
  height: number;
  totalArea: number;
  capacity: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  availableFromDate?: string;
}

interface RoomUtility {
  furnitureAvailability: Record<string, boolean>;
  amenitiesAvailability: Record<string, boolean>;
}

interface AdditionalFee {
  type: string;
  amount: number;
}

interface PricingDetails {
  basePrice: number;
  electricityCost: number;
  waterCost: number;
  additionalFees: AdditionalFee[];
}

interface RoomFinal {
  id: string;
  roomId: string;
  title: string;
  description: string;
  roomInfo: RoomInfo;
  roomUtility: RoomUtility;
  pricingDetails: PricingDetails;
  contactInfo: string;
  additionalDetails: string;

  createdDate: number;
  lastModifiedDate: number;
  availableFromDate?: string;
  createdBy: string;
  modifiedBy: string;
  fixPrice: number | null;
  created: string;
  furnitureAvailability?: { key: string; value: boolean }[];
  amenitiesAvailability?: { key: string; value: boolean }[];
  statusShowCheck: String;

}
