"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import { statusSelect } from "@/constants";
import {
  useUpdateReservation,
} from "@/services/reservation";
import useReservationStore from "@/store/reservationStore";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function EditReservation() {
  const { selectedReservation } =
    useReservationStore();
  const { mutate: updateReservation } = useUpdateReservation();

  const [customerName, setCustomerName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerName || !numberOfPeople || !dateAndTime) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const dataReservation = {
      ...selectedReservation,
      customerName,
      numberOfPeople: Number(numberOfPeople),
      dateAndTime: new Date(dateAndTime).toISOString(),
      status
    };

    updateReservation(dataReservation as any);
  };

  useEffect(() => {
    if (selectedReservation) {
      setCustomerName(selectedReservation.customerName);
      setNumberOfPeople(selectedReservation.numberOfPeople);
      setDateAndTime(formatDate(selectedReservation.dateAndTime));
      setStatus(selectedReservation.status);
    }
  }, [selectedReservation]);

  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return (
      date.toISOString().split("T")[0] +
      "T" +
      date.toTimeString().split(" ")[0].slice(0, 8)
    );
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
          <Select
            label="Estado"
            options={statusSelect}
            value={status}
            className="w-full px-4 py-2 border text-black
              border-gray-300 rounded-md
              focus:outline-none focus:ring-2
              focus:ring-indigo-500"
            onChange={(e: any) => setStatus(e.target.value)}
          />
          <Button
            text="Actualizar reserva"
            disabled={
              selectedReservation.status === status &&
              selectedReservation.customerName === customerName &&
              Number(selectedReservation.numberOfPeople) ===
                Number(numberOfPeople) &&
              formatDate(selectedReservation.dateAndTime) ===
                formatDate(dateAndTime)
                ? true
                : false
            }
          />
        </form>
      </div>
    </div>
  );
}
