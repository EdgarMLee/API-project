store = {
  session: {
    id,
    firstName,
    lastName,
    email
  },
  Spots: {
    findSpot: {
      id,
      name,
      city,
      state,
      country,
      price,
      description,
      avgRating,
      countReviews
    },
    createSpot: {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      image
    }
  },
  Reviews: {
    createReview: {
      review,
      stars
    },
    ReviewByUser: {
      review: {
        userId,
        stars,
        review,
      },
      date
    }
  }
}
