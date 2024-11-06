export enum AppRole {
  USER = 'user',
  ADMIN = 'admin',
}


export type Page<T> = {
  contents: T[],
  currentPage: number,
  perPage: number,
  totalElements: number,
  totalPage: number
}

export enum TripStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum TicketStatus {
  BOOKED = 'booked',
  ACTIVE = 'active',
}