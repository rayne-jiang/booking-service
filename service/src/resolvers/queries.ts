import { QueryResolvers } from "__generated__/resolvers-types";
import { UserRoleEnum } from "../datastore/types/User.js";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  Reservations: async(_, args, { ReservationModel, userInfo}) => {
    const queryParams = args.queryParams || {}; 
    if(!queryParams.filter) {
      queryParams.filter = {};
    }
    if (userInfo.user?.roleId == UserRoleEnum.GUEST) {
      queryParams.filter.userId = userInfo.user.userId; // only allow guests to see their own reservations
    }
    return await ReservationModel.queryReservations(queryParams);
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
