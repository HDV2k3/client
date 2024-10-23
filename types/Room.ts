interface Room {
  [x: string]: any;
  id: string;
  roomInfo: {
    name: string;
    description: string;
    address: string;
    type: string;
    style: string;
    floor: string;
    postImages: Array<{ urlImagePost: string }>;
    width: number;
    height: number;
    totalArea: number;
    capacity: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    availableFromDate: number[];
  };
  roomUtility: {
    furnitureAvailability: Record<string, boolean>;
    amenitiesAvailability: Record<string, boolean>;
  };
  pricingDetails: {
    basePrice: number;
    electricityCost: number;
    waterCost: number;
    additionalFees: Array<{
      type: string;
      amount: number;
    }>;
  };
  title: string;
  description: string;
  contactInfo: string;
  fixPrice?: number;
  createdBy: string;
  createdDate: number;
  lastModifiedDate: number;
  status: string;
}
