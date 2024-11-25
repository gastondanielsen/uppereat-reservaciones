import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { Reservation, ResponseData } from '@/common/reservation.interface';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const reservation = await prisma.reservation.findFirst({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        customerName: true,
        numberOfPeople: true,
        dateAndTime: true,
        status: true,
      },
    });

    if (!reservation)
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );

    return NextResponse.json(reservation);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();

    const updatedReservation = await prisma.reservation.update({
      where: {
        id: params.id,
      },
      data,
    });

    const responseData: ResponseData<Reservation> = {
      success: true,
      data: updatedReservation,
      message: "Reserva actualizada correctamente",
    };
    return NextResponse.json(responseData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Reserva no encontrada",
          },
          {
            status: 404,
          }
        );
      }
    }

    let responseData: ResponseData<Reservation> = {
      success: false,
      errorDetails: {
        statusCode: 400,
        errorMessage: "Ocurrió un error al procesar la solicitud",
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
        errorMessage: "Ocurrió un error interno del servidor",
      };
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedReservation = await prisma.reservation.delete({
      where: {
        id: params.id,
      },
    });
    const responseData: ResponseData<Reservation> = {
      success: true,
      data: deletedReservation,
      message: "Reserva eliminada correctamente",
    };
    return NextResponse.json(responseData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Reserva no encontrada",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    let responseData: ResponseData<Reservation> = {
      success: false,
      errorDetails: {
        statusCode: 400,
        errorMessage: "Ocurrió un error al procesar la solicitud",
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
        errorMessage: "Ocurrió un error interno del servidor",
      };
    }
  }
}
