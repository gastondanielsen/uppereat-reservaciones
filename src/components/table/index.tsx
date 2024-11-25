import { statusTranslations } from "@/constants";
import { useGetReservationById } from "@/services/reservation";
import { formatDate } from "@/utils/formatDate";
import { Reservation } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TableProps {
  columns: string[];
  data: Reservation[];
  onDelete: (id: string) => void;
}

export default function Table({ columns, data, onDelete }: TableProps) {
  const { mutate: getReservationById } = useGetReservationById();
  const [filteredData, setFilteredData] = useState([]);

  const onEdit = (id: string) => {
    getReservationById(id);
  };

  useEffect(() => {
    if (data) {
      const filterData = data.map((item) => ({
        ...item,
        status: statusTranslations[item.status] || item.status,
      }));
      setFilteredData(filterData as any);
    }
  }, [data]);

  return (
    <div className="mb-10">
      <div className="flex justify-center overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {columns.map((column: any) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-4 py-2 font-bold text-gray-900"
                >
                  {column}
                </th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.length === 0 && (
              <tr className="text-black">
                <td colSpan={columns.length + 1} className="py-4 text-center">
                  No hay reservaciones disponibles.
                </td>
              </tr>
            )}
            {data?.length > 0 &&
              filteredData?.map((data: any) => (
                <tr key={data.id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {data.customerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {data.numberOfPeople}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatDate(data.dateAndTime)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <p
                      className={`text-center text-xs font-semibold rounded-md px-2 py-1 uppercase ${
                        data.status === "Pendiente" && "bg-yellow-200"
                      } ${data.status === "Confirmada" && "bg-blue-200"} ${
                        data.status === "Cancelada" && "bg-red-200"
                      } ${data.status === "Completada" && "bg-green-200"}`}
                    >
                      {data.status}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-1 py-2">
                    <Link
                      href={`/reservations/edit`}
                      className="inline-block rounded-md bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700"
                      onClick={() => onEdit(data?.id)}
                    >
                      Editar
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-1 py-2">
                    <Link
                      href="#"
                      className="inline-block rounded-md bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                      onClick={() => onDelete(data.id)}
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
