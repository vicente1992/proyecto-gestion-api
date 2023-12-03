const Category = require('../../models/category');
const Rating = require('../../models/rating');

const categoriesData = [
  {
    "name": "Patrimonio material",
    rating: [
      {
        name: 'Estado de Conservación',
        score: 21
      },
      {
        name: 'Constitución del Bien',
        score: 21
      },
      {
        name: 'Representatividad',
        score: 28
      },
      {
        name: 'Local',
        score: 8
      },
      {
        name: 'Regional',
        score: 12
      },
      {
        name: 'Nacional',
        score: 18
      },
      {
        name: 'Internacional',
        score: 30
      },
    ]
  },
  {
    "name": "Patrimonio inmaterial",
    rating: [
      {
        name: 'Colectivo',
        score: 14
      },
      {
        name: 'Tradicional',
        score: 14
      },
      {
        name: 'Anónimo',
        score: 14
      },
      {
        name: 'Espontáneo',
        score: 14
      },
      {
        name: 'Popular',
        score: 14
      },
      {
        name: 'Local',
        score: 8
      },
      {
        name: 'Regional',
        score: 12
      },
      {
        name: 'Nacional',
        score: 18
      },
      {
        name: 'Internacional',
        score: 30
      },
    ]
  },
  {
    "name": "Festividades y eventos",
    rating: [
      {
        name: 'Organización del evento',
        score: 30
      },
      {
        name: 'Beneficios socioculturales',
        score: 20
      },
      {
        name: 'Beneficios económicos',
        score: 20
      },
      {
        name: 'Local',
        score: 20
      },
      {
        name: 'Locales',
        score: 6
      },
      {
        name: 'Regional',
        score: 12
      },
      {
        name: 'Nacional',
        score: 18
      },
      {
        name: 'Internacional',
        score: 30
      },
    ]
  },
  {
    "name": "Grupos de especial interes",
    rating: [
      {
        name: 'Respeto por las Costumbres',
        score: 10
      },
      {
        name: 'Locales',
        score: 6
      },
      {
        name: 'Regional',
        score: 12
      },
      {
        name: 'Nacional',
        score: 18
      },
      {
        name: 'Internacional',
        score: 30
      },
    ]
  }

]

async function seedCategories(req, res) {
  try {
    await Category.deleteMany();
    await Rating.deleteMany();

    const categoriesWithRatings = [];

    for (const categoryData of categoriesData) {
      // 
      const category = new Category({ ...categoryData });
      const categorySave = await category.save();
      const ratingsMap = categoryData.rating.map((r) => ({ ...r, categoryId: categorySave._id }));
      await Rating.insertMany(ratingsMap)
      // const ratings = ratingsMap.map((rating) => new Rating(rating));

      // await Promise.all(ratings.map((r) => r.save()));

    }
    res.status(201);
    res.send({ messgae: 'secces' });
  } catch (error) {
    console.error('Error al insertar categorías:', error);
  }
}


module.exports = { seedCategories }