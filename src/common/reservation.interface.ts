import { Status } from "@prisma/client";

export interface Reservation {
  id?: string;
  customerName: string;
  numberOfPeople: number;
  dateAndTime: Date;
  status?: string;
}
  
export interface ResponseData<T> {
  success: boolean;
  data?: T[] | {};
  message?: string;
  errorDetails?: {
      statusCode: number;
      errorMessage: string;
  };
}