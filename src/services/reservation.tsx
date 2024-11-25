"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import API from "@/services/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useReservationStore from "@/store/reservationStore";
import { Status } from "@prisma/client";
import { Reservation, ResponseData } from "@/common/reservation.interface";

// ---------> GET ALL RESERVATIONS <---------
const getAllReservations = async (status?: string) => {
  const { data } = await API.get("/api/reservations", {
    params: {
      ...(status && {status})
    }
  });
  return data.data;
};

export const useGetReservations = (status: string) => {
  return useQuery<any[]>({
    queryKey: ["reservations", status],
    queryFn: () => getAllReservations(status),
  });
};

// ---------> CREATE RESERVATION <---------
const createReservation = async (newReservation: Reservation) => {
  const { data } = await API.post("/api/reservations", newReservation);
  return data;
};

export const useCreateReservation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (newReservation: Reservation) =>
      createReservation(newReservation),
    onSuccess: (data: ResponseData<Reservation>) => {
      toast.success(`${data.message}`);
      router.push("/reservations");
    },
  });
};

// ---------> GET ONE RESERVATION <---------
const getReservationById = async (id: string) => {
  const res = await API.get(`/api/reservations/${id}`);
  return res.data;
};

export const useGetReservationById = () => {
  const { setSelectedReservation } = useReservationStore();
  return useMutation({
    mutationFn: (id: string) => getReservationById(id),
    onSuccess: async (data) => {
      setSelectedReservation(data);
    },
  });
};

// ---------> UPDATE RESERVATIONS <---------
const updateReservation = async (reservation: Reservation) => {
  const { data } = await API.put(
    `/api/reservations/${reservation.id}`,
    reservation
  );
  return data;
};

export const useUpdateReservation = () => {
  const router = useRouter();
  const { setReservations } = useReservationStore();
  return useMutation({
    mutationFn: (data: Reservation) => updateReservation(data),
    onSuccess: async (data: ResponseData<Reservation>) => {
      const reservations = await getAllReservations();
      setReservations(reservations);
      toast.success(`${data.message}`);
      router.push("/reservations");
    },
  });
};

// ---------> DELETE RESERVATION <---------
const deleteReservation = async (id: string) => {
  const { data } = await API.delete(`/api/reservations/${id}`);
  return data;
};

export const useDeleteReservation = () => {
  const { setReservations } = useReservationStore();
  return useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    onSuccess: async (data: ResponseData<Reservation>) => {
      const reservations = await getAllReservations();
      setReservations(reservations);
      toast.success(`${data.message}`);
    },
  });
};
