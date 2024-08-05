import { QueryResolvers } from "__generated__/resolvers-types";


// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  Reservations: async(_, args, { ReservationModel }) => {
      return await ReservationModel.queryReservations(args.queryParams);
  },

  ReservationDetail: async(_, args, { ReservationModel, UserModel }) => {
     const reservation = await ReservationModel.getReservation(args.reservationId);
     if (!reservation) {
         throw new Error("Reservation not found");
     }
     const user = await UserModel.getUserById(reservation.userId);
     return {
      ...reservation,
      user,
    };
  },
};

export default queries;
