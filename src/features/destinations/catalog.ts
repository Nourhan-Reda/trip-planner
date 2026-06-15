import type { DestinationCatalogEntry } from "./types";

export const DESTINATION_CATALOG: DestinationCatalogEntry[] = [
  {
    key: "paris",
    displayName: "Paris",
    aliases: ["paris", "france", "île-de-france", "ile-de-france"],
    places: [
      {
        id: "paris-eiffel-tower",
        name: "Eiffel Tower",
        description:
          "Iconic iron lattice tower with panoramic city views from the summit.",
        image:
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80",
        category: "landmark",
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
        priceHint: "From €29",
        featured: true,
      },
      {
        id: "paris-louvre",
        name: "Louvre Museum",
        description:
          "World-famous art museum home to the Mona Lisa and centuries of masterpieces.",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        category: "museum",
        address: "Rue de Rivoli, 75001 Paris",
        priceHint: "From €22",
      },
      {
        id: "paris-notre-dame",
        name: "Notre-Dame Cathedral",
        description:
          "Gothic cathedral on the Île de la Cité — a masterpiece of medieval architecture.",
        image:
          "https://images.unsplash.com/photo-1502602898657-3b917797cb13?w=800&q=80",
        category: "landmark",
        address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris",
        priceHint: "Free entry",
      },
      {
        id: "paris-arc-de-triomphe",
        name: "Arc de Triomphe",
        description:
          "Monument at the top of the Champs-Élysées with sweeping views down twelve avenues.",
        image:
          "https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=800&q=80",
        category: "landmark",
        address: "Pl. Charles de Gaulle, 75008 Paris",
        priceHint: "From €16",
      },
      {
        id: "paris-musee-dorsay",
        name: "Musée d'Orsay",
        description:
          "Impressionist and post-impressionist treasures in a stunning former railway station.",
        image:
          "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        category: "museum",
        address: "1 Rue de la Légion d'Honneur, 75007 Paris",
        priceHint: "From €16",
      },
      {
        id: "paris-seine-cruise",
        name: "Seine River Dinner Cruise",
        description:
          "Evening cruise past illuminated landmarks with dinner and live music.",
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        category: "experience",
        address: "Port de la Bourdonnais, 75007 Paris",
        priceHint: "From €89",
      },
    ],
  },
  {
    key: "tokyo",
    displayName: "Tokyo",
    aliases: ["tokyo", "japan", "shibuya", "shinjuku"],
    places: [
      {
        id: "tokyo-shibuya",
        name: "Shibuya Crossing",
        description:
          "The world's busiest pedestrian scramble — the pulse of modern Tokyo.",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        category: "landmark",
        address: "Shibuya City, Tokyo",
        priceHint: "Free",
        featured: true,
      },
      {
        id: "tokyo-sensoji",
        name: "Senso-ji Temple",
        description:
          "Tokyo's oldest temple in Asakusa, framed by the iconic Kaminarimon gate.",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        category: "landmark",
        address: "2 Chome-3-1 Asakusa, Taito City, Tokyo",
        priceHint: "Free entry",
      },
      {
        id: "tokyo-skytree",
        name: "Tokyo Skytree",
        description:
          "634m broadcasting tower with observation decks and sweeping Kanto views.",
        image:
          "https://images.unsplash.com/photo-1536098561742-f9985c85d196?w=800&q=80",
        category: "landmark",
        address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
        priceHint: "From ¥2,100",
      },
      {
        id: "tokyo-meiji",
        name: "Meiji Shrine",
        description:
          "Serene Shinto shrine set in a forested park in the heart of the city.",
        image:
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
        category: "landmark",
        address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
        priceHint: "Free entry",
      },
      {
        id: "tokyo-tsukiji",
        name: "Tsukiji Outer Market",
        description:
          "Bustling food market famous for fresh sushi, street snacks, and kitchenware.",
        image:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
        category: "restaurant",
        address: "4 Chome-16-2 Tsukiji, Chuo City, Tokyo",
        priceHint: "Varies",
      },
      {
        id: "tokyo-teamlab",
        name: "teamLab Planets",
        description:
          "Immersive digital art museum where you walk through water and light installations.",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        category: "experience",
        address: "6 Chome-1-16 Toyosu, Koto City, Tokyo",
        priceHint: "From ¥3,800",
      },
    ],
  },
  {
    key: "london",
    displayName: "London",
    aliases: ["london", "england", "uk", "united kingdom"],
    places: [
      {
        id: "london-tower",
        name: "Tower of London",
        description:
          "Historic castle housing the Crown Jewels and nearly 1,000 years of royal history.",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        category: "landmark",
        address: "London EC3N 4AB",
        priceHint: "From £34",
        featured: true,
      },
      {
        id: "london-buckingham",
        name: "Buckingham Palace",
        description:
          "Official residence of the monarch — watch the Changing of the Guard ceremony.",
        image:
          "https://images.unsplash.com/photo-1529655683829-aba9b3e77383?w=800&q=80",
        category: "landmark",
        address: "London SW1A 1AA",
        priceHint: "Seasonal tours",
      },
      {
        id: "london-british-museum",
        name: "British Museum",
        description:
          "Vast collection spanning human history, from the Rosetta Stone to Egyptian mummies.",
        image:
          "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        category: "museum",
        address: "Great Russell St, London WC1B 3DG",
        priceHint: "Free entry",
      },
      {
        id: "london-eye",
        name: "London Eye",
        description:
          "Giant riverside observation wheel with 360° views across the Thames.",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        category: "experience",
        address: "Riverside Building, County Hall, London SE1 7PB",
        priceHint: "From £32",
      },
      {
        id: "london-borough-market",
        name: "Borough Market",
        description:
          "London's oldest food market — artisan producers, global street food, and coffee.",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        category: "restaurant",
        address: "8 Southwark St, London SE1 1TL",
        priceHint: "Varies",
      },
      {
        id: "london-west-end",
        name: "West End Theatre",
        description:
          "World-class musicals and plays in London's legendary theatre district.",
        image:
          "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
        category: "experience",
        address: "Covent Garden, London",
        priceHint: "From £25",
      },
    ],
  },
  {
    key: "rome",
    displayName: "Rome",
    aliases: ["rome", "roma", "italy", "vatican"],
    places: [
      {
        id: "rome-colosseum",
        name: "Colosseum",
        description:
          "Ancient amphitheatre where gladiators fought — the symbol of Imperial Rome.",
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
        category: "landmark",
        address: "Piazza del Colosseo, 1, 00184 Roma RM",
        priceHint: "From €18",
        featured: true,
      },
      {
        id: "rome-vatican",
        name: "Vatican Museums",
        description:
          "Michelangelo's Sistine Chapel and one of the world's greatest art collections.",
        image:
          "https://images.unsplash.com/photo-1555992336-03a23c7b087d?w=800&q=80",
        category: "museum",
        address: "00120 Vatican City",
        priceHint: "From €17",
      },
      {
        id: "rome-trevi",
        name: "Trevi Fountain",
        description:
          "Baroque masterpiece — toss a coin over your shoulder for good luck.",
        image:
          "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80",
        category: "landmark",
        address: "Piazza di Trevi, 00187 Roma RM",
        priceHint: "Free",
      },
      {
        id: "rome-pantheon",
        name: "Pantheon",
        description:
          "Best-preserved ancient Roman building with a breathtaking domed ceiling.",
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
        category: "landmark",
        address: "Piazza della Rotonda, 00186 Roma RM",
        priceHint: "Free entry",
      },
      {
        id: "rome-forum",
        name: "Roman Forum",
        description:
          "Ruins of temples and government buildings at the heart of ancient Rome.",
        image:
          "https://images.unsplash.com/photo-1525874684645-3852e067bcda?w=800&q=80",
        category: "landmark",
        address: "Via della Salara Vecchia, 5/6, 00186 Roma RM",
        priceHint: "From €18",
      },
      {
        id: "rome-trastevere",
        name: "Trastevere Food Tour",
        description:
          "Guided evening walk through cobbled lanes with wine, pasta, and gelato stops.",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        category: "experience",
        address: "Trastevere, Rome",
        priceHint: "From €65",
      },
    ],
  },
  {
    key: "barcelona",
    displayName: "Barcelona",
    aliases: ["barcelona", "catalonia", "catalunya", "spain"],
    places: [
      {
        id: "barcelona-sagrada",
        name: "Sagrada Família",
        description:
          "Gaudí's unfinished basilica — a surreal fusion of Gothic and Art Nouveau.",
        image:
          "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
        category: "landmark",
        address: "C/ de Mallorca, 401, 08013 Barcelona",
        priceHint: "From €26",
        featured: true,
      },
      {
        id: "barcelona-park-guell",
        name: "Park Güell",
        description:
          "Whimsical Gaudí park with mosaic terraces and views over the city.",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        category: "landmark",
        address: "08024 Barcelona",
        priceHint: "From €10",
      },
      {
        id: "barcelona-rambla",
        name: "La Rambla",
        description:
          "Famous tree-lined boulevard from Plaça de Catalunya to the waterfront.",
        image:
          "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
        category: "landmark",
        address: "La Rambla, Barcelona",
        priceHint: "Free",
      },
      {
        id: "barcelona-gothic",
        name: "Gothic Quarter",
        description:
          "Medieval maze of narrow streets, hidden squares, and Roman ruins.",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        category: "landmark",
        address: "Barri Gòtic, Barcelona",
        priceHint: "Free",
      },
      {
        id: "barcelona-casa-batllo",
        name: "Casa Batlló",
        description:
          "Gaudí's dragon-scaled townhouse on Passeig de Gràcia.",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        category: "museum",
        address: "Passeig de Gràcia, 43, 08007 Barcelona",
        priceHint: "From €35",
      },
      {
        id: "barcelona-beach",
        name: "Barceloneta Beach",
        description:
          "City beach with seafood restaurants, sun loungers, and Mediterranean views.",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        category: "nature",
        address: "Platja de la Barceloneta, Barcelona",
        priceHint: "Free",
      },
    ],
  },
  {
    key: "new-york",
    displayName: "New York",
    aliases: ["new york", "nyc", "manhattan", "brooklyn"],
    places: [
      {
        id: "nyc-statue-liberty",
        name: "Statue of Liberty",
        description:
          "America's symbol of freedom — ferry ride and optional crown access.",
        image:
          "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80",
        category: "landmark",
        address: "Liberty Island, New York, NY",
        priceHint: "From $24",
        featured: true,
      },
      {
        id: "nyc-central-park",
        name: "Central Park",
        description:
          "843 acres of green in Manhattan — lakes, meadows, and the Bethesda Terrace.",
        image:
          "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80",
        category: "nature",
        address: "New York, NY 10024",
        priceHint: "Free",
      },
      {
        id: "nyc-times-square",
        name: "Times Square",
        description:
          "Neon-lit crossroads of Broadway — the energy of New York at its peak.",
        image:
          "https://images.unsplash.com/photo-1496442226666-8d0d0ee62a56?w=800&q=80",
        category: "landmark",
        address: "Manhattan, NY 10036",
        priceHint: "Free",
      },
      {
        id: "nyc-brooklyn-bridge",
        name: "Brooklyn Bridge",
        description:
          "Historic suspension bridge walk with skyline views over the East River.",
        image:
          "https://images.unsplash.com/photo-1496442226666-8d0d0ee62a56?w=800&q=80",
        category: "landmark",
        address: "Brooklyn Bridge, New York, NY",
        priceHint: "Free",
      },
      {
        id: "nyc-met",
        name: "The Metropolitan Museum of Art",
        description:
          "One of the world's largest art museums spanning 5,000 years of culture.",
        image:
          "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        category: "museum",
        address: "1000 5th Ave, New York, NY 10028",
        priceHint: "Pay what you wish",
      },
      {
        id: "nyc-broadway",
        name: "Broadway Show",
        description:
          "Catch a world premiere musical or classic play in the Theatre District.",
        image:
          "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
        category: "experience",
        address: "Theatre District, Manhattan",
        priceHint: "From $59",
      },
    ],
  },
  {
    key: "bali",
    displayName: "Bali",
    aliases: ["bali", "ubud", "indonesia", "seminyak"],
    places: [
      {
        id: "bali-rice-terraces",
        name: "Tegallalang Rice Terraces",
        description:
          "Stunning emerald-green paddies carved into the hills north of Ubud.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        category: "nature",
        address: "Tegallalang, Gianyar, Bali",
        priceHint: "From IDR 15,000",
        featured: true,
      },
      {
        id: "bali-tanah-lot",
        name: "Tanah Lot Temple",
        description:
          "Sea temple perched on a rock formation — spectacular at sunset.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        category: "landmark",
        address: "Beraban, Kediri, Tabanan Regency, Bali",
        priceHint: "From IDR 60,000",
      },
      {
        id: "bali-uluwatu",
        name: "Uluwatu Temple",
        description:
          "Clifftop temple with Kecak fire dance performances at golden hour.",
        image:
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
        category: "landmark",
        address: "Pecatu, South Kuta, Badung Regency, Bali",
        priceHint: "From IDR 50,000",
      },
      {
        id: "bali-swing",
        name: "Bali Swing Experience",
        description:
          "Soar over jungle valleys on giant swings with rice terrace backdrops.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        category: "experience",
        address: "Ubud, Gianyar, Bali",
        priceHint: "From $35",
      },
      {
        id: "bali-seminyak",
        name: "Seminyak Beach",
        description:
          "Upscale beach town with beach clubs, boutiques, and sunset cocktails.",
        image:
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
        category: "nature",
        address: "Seminyak, Badung Regency, Bali",
        priceHint: "Free",
      },
      {
        id: "bali-batur",
        name: "Mount Batur Sunrise Trek",
        description:
          "Pre-dawn hike to an active volcano summit with breakfast at the crater.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "experience",
        address: "Kintamani, Bangli Regency, Bali",
        priceHint: "From $45",
      },
    ],
  },
  {
    key: "dubai",
    displayName: "Dubai",
    aliases: ["dubai", "uae", "emirates"],
    places: [
      {
        id: "dubai-burj-khalifa",
        name: "Burj Khalifa",
        description:
          "World's tallest building — observation decks on the 124th and 148th floors.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        category: "landmark",
        address: "1 Sheikh Mohammed bin Rashid Blvd, Dubai",
        priceHint: "From AED 149",
        featured: true,
      },
      {
        id: "dubai-mall",
        name: "Dubai Mall",
        description:
          "Massive shopping complex with aquarium, ice rink, and Dubai Fountain shows.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        category: "experience",
        address: "Financial Center Rd, Downtown Dubai",
        priceHint: "Free entry",
      },
      {
        id: "dubai-desert-safari",
        name: "Desert Safari",
        description:
          "Dune bashing, camel rides, and a Bedouin camp dinner under the stars.",
        image:
          "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a9?w=800&q=80",
        category: "experience",
        address: "Dubai Desert Conservation Reserve",
        priceHint: "From AED 200",
      },
      {
        id: "dubai-palm",
        name: "Palm Jumeirah",
        description:
          "Iconic man-made island with luxury resorts and the Atlantis waterpark.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        category: "landmark",
        address: "Palm Jumeirah, Dubai",
        priceHint: "Varies",
      },
      {
        id: "dubai-marina",
        name: "Dubai Marina",
        description:
          "Waterfront promenade with yachts, dining, and a stunning skyline walk.",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
        category: "landmark",
        address: "Dubai Marina, Dubai",
        priceHint: "Free",
      },
      {
        id: "dubai-al-fahidi",
        name: "Al Fahidi Historical Neighbourhood",
        description:
          "Restored wind-tower district showcasing old Dubai's trading heritage.",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
        category: "landmark",
        address: "Al Fahidi, Dubai",
        priceHint: "Free",
      },
    ],
  },
];

export function getCatalogByKey(key: string) {
  return DESTINATION_CATALOG.find((entry) => entry.key === key) ?? null;
}
