export type PlaceCategory = "landmark" | "museum" | "experience" | "restaurant" | "nature";

export type RecommendedPlace = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: PlaceCategory;
  address: string;
  priceHint?: string;
  featured?: boolean;
};

export type DestinationCatalogEntry = {
  key: string;
  displayName: string;
  aliases: string[];
  places: RecommendedPlace[];
};

export type DiscoveryDestination = {
  key: string;
  displayName: string;
  image: string;
  tagline: string;
  highlight: string;
  planDestination: string;
};

export type TripRecommendationGroup = {
  tripId: string;
  tripTitle: string;
  destination: string;
  displayName: string;
  recommendations: RecommendedPlace[];
  hasCuratedPicks: boolean;
};

export type PersonalizedDestinationSection = {
  mode: "personalized";
  tripGroups: TripRecommendationGroup[];
  totalTripCount: number;
};

export type CommunityDestination = {
  destination: string;
  tripCount: number;
  placesCount: number;
};

export type CommunityDestinationSection = {
  mode: "community";
  destinations: CommunityDestination[];
};

export type DestinationSectionData =
  | PersonalizedDestinationSection
  | CommunityDestinationSection;
