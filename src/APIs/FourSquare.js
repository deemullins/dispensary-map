// Get venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(`https://api.foursquare.com/v2/venues/search?client_id=FK3KTBUB3HXD41R1WZZNEWYDY0EETC4NTTKGNR3FQUK10LUO
  &client_secret=ZBHLKNGN5OLDFJFJ4ZAKUZEEJZFWY0MNPAURL5MERLTRVL15&v=20181101&limit=1&ll=${lat},${lng}&query=${name}`)
  .then((response) => response.json())
  .then((response) => response.response.venues[0].id);
}

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = (venueId) => {
  return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=FK3KTBUB3HXD41R1WZZNEWYDY0EETC4NTTKGNR3FQUK10LUO
  &client_secret=ZBHLKNGN5OLDFJFJ4ZAKUZEEJZFWY0MNPAURL5MERLTRVL15&v=20181101`)
  .then((response) => response.json())
  .then((response) => response.response.venue);
}