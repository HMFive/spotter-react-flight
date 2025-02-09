export interface SearchAirportResponse {
  data: SearchAirport[];
  status: boolean;
  timestamp: number;
}

export interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: "economy" | "premium_economy" | "business" | "first";
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?:
    | "best"
    | "price_high"
    | "fastest"
    | "outbound_take_off_time"
    | "outbound_landing_time"
    | "return_take_off_time"
    | "return_landing_time";
  limit?: number;
  carrierIds?: string;
  currency?: string;
  market?:string;
  countryCode?: string;
}

export interface SearchFlightsResponse {
  data: {
    context: {
      sessionId: string;
      status: string;
      totalResults: number;
    };
    destinationImageUrl: string;
    filterStats: {
      airports: Airports[];
      carriers: Carrier[];
      duration: {
        max: number;
        min: number;
        multiCityMax: number;
        multiCityMin: number;
      };
      stopPrices: {
        direct: {
          formatPrice: string;
          isPresent: boolean;
        };
        one: {
          isPresent: boolean;
        };
        twoOrMore: {
          isPresent: boolean;
        };
      };
    };
    itineraries: Itinerary[];
    flightSessionId: string;
    messages: [];
  };
  sessionId: string;
  status: boolean;
  timestamp: number;
}

export interface Itinerary {
  farePolicy: {
    isCancellationAllowed: boolean;
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isPartiallyRefundable: boolean;
  };
  hasFlexibleOptions: boolean;
  id: string;
  isMashUp: boolean;
  isProtectedSelfTransfer: boolean;
  isSelfTransfer: boolean;
  legs: Leg[];
  price: {
    formatted: string;
    pricingOptionId: string;
    raw: number;
  };
  score: number;
  tags: string[];
}

export interface Leg {
  arrival: string;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  departure: string;
  destination: {
    city: string;
    country: string;
    displayCode: string;
    id: string;
    isHighlighted: false;
    name: string;
  };
  durationInMinutes: number;
  id: string;
  isSmallestStops: string;
  //duplicate
  origin: {
    city: string;
    country: string;
    displayCode: string;
    id: string;
    isHighlighted: false;
    name: string;
  };
  segments: Segment[];
  stopCount: number;
  timeDeltaInDays: number;
}

export interface Segment {
  arrival: string;
  departure: string;
  destination: {
    country: string;
    displayCode: string;
    flightPlaceId: string;
    name: string;
    parent: {
      displayCode: string;
      flightPlaceId: string;
      name: string;
      type: string;
    };
    type: string;
  };
  durationInMinutes: number;
  flightNumber: string;
  id: string;
  marketingCarrier: {
    allianceId: number;
    alternateId: string;
    displayCode: string;
    id: number;
    name: string;
  };
  operatingCarrier: {
    allianceId: number;
    alternateId: string;
    displayCode: string;
    id: number;
    name: string;
  };
  origin: {
    country: string;
    displayCode: string;
    flightPlaceId: string;
    name: string;
    parent: {
      displayCode: string;
      flightPlaceId: string;
      name: string;
      type: string;
    };
    type: string;
  };
}

export interface Carrier {
  alternateId: string;
  id: number;
  logoUrl: string;
  name: string;
}

export interface Airports {
  airports: Airport[];
  city: string;
}

export interface Airport {
  entityId: string;
  id: string;
  name: string;
}

export interface SearchAirport {
  entityId: string;
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
      skyId: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
  presentation: {
    subtitle: string;
    suggestionTitle: string;
    title: string;
  };
  skyId: string;
}
