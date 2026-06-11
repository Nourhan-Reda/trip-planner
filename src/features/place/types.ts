export interface Place {
  id: string;
  name: string;
  address: string | null;
  visited: boolean;
  tripId: string;
  createdAt: Date;
}

export interface CreatePlaceInput {
  name: string;
  address?: string;
  tripId: string;
}
