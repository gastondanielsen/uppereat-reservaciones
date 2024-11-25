"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useCreateReservation } from "@/services/reservation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

export default function CreateReservation() {
  const { mutate: createReservation } = useCreateReservation();

  const [customerName, setCustomerName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!customerName || !numberOfPeople || !dateAndTime) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const dataReservation = {
      customerName,
      numberOfPeople: Number(numberOfPeople),
      dateAndTime: new Date(dateAndTime).toISOString(),
    };

    createReservation(dataReservation as any);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre del cliente"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ingrese el nombre del cliente"
          />
          <Input
            label="Número de personas"
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="Ingrese la cantidad de personas"
          />
          <Input
            label="Fecha y hora"
            type="datetime-local"
            value={dateAndTime}
            onChange={(e) => setDateAndTime(e.target.value)}
            placeholder="Ingrese fecha y hora de reserva"
          />
          <Button text="Crear reserva" />
        </form>
      </div>
    </div>
  );
}
