import { MutationResolvers } from "../__generated__/resolvers-types";

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  addUser: async (_, args, { UserModel }) => {
    return await UserModel.addUser(args);
  },

  //  Modify Reservation
  makeReservation: async (_, args, { ReservationModel, userInfo }) => {
    return await ReservationModel.makeReservation(userInfo.user.userId, args.tableSize, args.arrivalDate, args.arrivalSlot);
  },

  cancelReservation: async (_, args, { ReservationModel }) => {
    return await ReservationModel.cancelReservation(args.reservationId);
  },

  updateReservation: async (_, args, { ReservationModel }) => {
    return await ReservationModel.updateReservation(args.reservationId, args.userId, args.updatedReservation);
  },

  completeReservation: async (_, args, { ReservationModel }) => {
    return await ReservationModel.completeReservation(args.reservationId);
  }
};

export default mutations;
