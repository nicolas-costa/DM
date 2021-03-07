exports.byName = async (req) => {
  try {
    const {
      params: { name = '' },
    } = req;

    const { Product } = req.app.src.models.index;
    return await Product.findOne({
      where: {
        name: name,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
  } catch (e) {
    throw e;
  }
};
