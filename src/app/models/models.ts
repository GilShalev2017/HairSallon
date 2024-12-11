export interface Treatment {
  date: string; // ISO 8601 format
  description: string;
  price: number;
}

export interface Client {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  treatments: Treatment[];
}
