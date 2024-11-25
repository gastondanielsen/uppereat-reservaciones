import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Status } from "@prisma/client";
import { Reservation, ResponseData } from "@/common/reservation.interface";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');

    const reservations = await prisma.reservation.findMany({
      where: {
       ...(status && {status: status as Status})
      },
      orderBy: {
        dateAndTime: 'desc'
      },
      select: {
        id: true,
        customerName: true,
        numberOfPeople: true,
        dateAndTime: true,
        status: true
      },
    });

    const responseData: ResponseData<Reservation> = {
      success: true,
      data: reservations
    };
    return NextResponse.json(responseData);
  } catch (error) {
    let responseData: ResponseData<Reservation> = {
      success: false,
      errorDetails: {
        statusCode: 400,
        errorMessage: 'Ocurrió un error al procesar la solicitud',
      },
    };

    if (error instanceof Error) {
      responseData.errorDetails = {
        statusCode: 400,
        errorMessage: error.message,
      };
    } else {
      responseData.errorDetails = {
        statusCode: 500,
        errorMessage: 'Ocurrió un error interno del servidor',
      };
    }

    return NextResponse.json(responseData);
  }
}

export async function POST(request: Request) {
  try {
    const newReservation = await request.json();

    const reservation = await prisma.reservation.create({
      data: newReservation
    });

    const responseData: ResponseData<Reservation> = {
      success: true,
      data: reservation,
      message: "Reserva creada correctamente"
    };
    return NextResponse.json(responseData);
  } catch (error) {
      let responseData: ResponseData<Reservation> = {
        success: false,
        errorDetails: {
          statusCode: 400,
          errorMessage: 'Ocurrió un error al procesar la solicitud',
        },
      };

      if (error instanceof Error) {
        responseData.errorDetails = {
          statusCode: 400,
          errorMessage: error.message,
        };
      } else {
        responseData.errorDetails = {
          statusCode: 500,
          errorMessage: 'Ocurrió un error interno del servidor',
        };
      }
  }
}