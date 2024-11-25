"use client";

import Loading from "@/components/loading";
import Select from "@/components/select";
import Table from "@/components/table";
import { columns, statusSelect } from "@/constants";
import {
  useDeleteReservation,
  useGetReservations,
} from "@/services/reservation";
import useReservationStore from "@/store/reservationStore";
import { ChangeEvent, useEffect, useState } from "react";

export default function ReservationsPage() {
  const { reservations, setReservations, setSelectedStatus } =
    useReservationStore();
    const { mutate: deleteReservation } = useDeleteReservation();
    let options = [{ label: "Todos", value: "" }].concat(statusSelect.slice());
    const [selectedValue, setSelectedValue] = useState(options[0].value);
    const { data, isLoading } = useGetReservations(selectedValue);

  useEffect(() => {
    if (data) {
      setReservations(data);
    }
  }, [data]);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedValue(value);
    setSelectedStatus(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Select options={options} value={selectedValue} className="text-black px-2 py-1 rounded-md" onChange={handleChange} />
      <Table
        columns={columns}
        data={reservations}
        onDelete={deleteReservation}
      />
    </div>
  );
}
