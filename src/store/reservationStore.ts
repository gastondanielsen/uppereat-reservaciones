import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Reservation = {
  reservations: any[]
  selectedReservation: any
  selectedStatus: string
}

type ReservationActions = {
  setReservations: (reservations: any[]) => void
  setSelectedReservation: (reservations: any) => void
  setSelectedStatus: (status: string) => void
}

const useReservationStore = create<Reservation & ReservationActions>()(
  persist(
    (set) => ({
      reservations: [],
      selectedReservation: {},
      selectedStatus: "PENDING",
      setReservations: (reservations) => set({ reservations }),
      setSelectedReservation: (selectedReservation) => set({ selectedReservation }),
      setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
    }),
    { name: 'reservation', storage: createJSONStorage(() => localStorage), }
  )
)

export default useReservationStore
