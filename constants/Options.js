export const SelectTravelesList = [
    {
      title: 'Just Me',
      desc: 'Solo traveler on an adventure.',
      icon: '🙎‍♂️',
      people: '1 People',
    },
    {
      title: 'Couple',
      desc: "Traveling with a partner.",
      icon: '🥂',
      people: '2 People',
    },
    {
      title: 'Family',
      desc: 'Enjoying a trip with family.',
      icon: '🏡',
      people: '4+ People',
    },
    {
      title: 'Friends',
      desc: 'Exploring with a group of friends.',
      icon: '⛵️',
      people: '3+ People',
    },
  ];
  
  export const SelectBudgetList = [
    {
      id:1,
      title:'Cheap',
      desc:'Stay conscious of costs',
      icon:'💵'
    },
    {
      id:2,
      title:'Moderate',
      desc:'Keep cost on the average',
      icon:'💰'
    },
    {
      id:3,
      title: 'Luxury',
      desc: 'Dont worry about cost',
      icon: '💸',
    }
  ];

  export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDay} Days and {totalNight} Night for {traveler} with a {budget} budget with Flight details, Flight Price with Booking URL, Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image URL, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDay} Days and {totalNight} with each day plan with best time to visit, provide flight price like starting range - ending range (approx) and just single airline name in JSON format.'