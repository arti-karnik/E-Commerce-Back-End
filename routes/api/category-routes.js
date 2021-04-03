const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products4r5
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product, attributes: ['category_id']}]
      });

      if (!categoryData) {
      res.status(200).json({ message: 'No Category found with this id!' });
      return;
      }
      res.status(200).json(categoryData);
  } 
  catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
    Category.create(req.body)
    .then((category) => {
        res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update(req.body, {
      where: {
        id: req.params.id
    } 
})
  
  .then(async (categoryData) => {
    if (!categoryData) {
      res.status(200).json({ message: 'No Category found with this id!' });
      return;
    }
    try {
      const updatedCategoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product, attributes: ['category_id']}]
      }); 
      if (!updatedCategoryData) {
        res.status(200).json({ message: 'No Category found with this id!' });
        return;
      }
      res.status(200).json(updatedCategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .catch((err) => {
    res.status(404).json({ message: 'Something wrong happened. Please check id and try again!' });
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(200).json({ message: 'No Category found with this ID, Please try again !' });
      return;
    }
    res.status(200).json({ message: 'Category Deleted!!!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
