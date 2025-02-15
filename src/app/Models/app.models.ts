export interface docketFile {
    show: string,
    upload:File,
    index ?: any
  }

  export interface DeliveryPartner {
    freight_charge: number;
    courier_company_id: string;
    courier_name: string;
    estimated_delivery_days: number;
    // Add other properties if needed
  }
  