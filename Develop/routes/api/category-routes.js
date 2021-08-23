const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint



// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })

    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category!' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category!' });
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    res.status(500).json(err)
  });
});


router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(categoryData => res.json(categoryData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    res.json({ message: "Ok" })
  }
  ).catch(err => {
    res.status(500).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(categoryData => res.json(categoryData)
  ).catch(err => res.json(err))
});

module.exports = router;
