const Brand = require("../models/Brands");
const Product = require("../models/Product");

exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .sort(queries.sortBy)
    .select(queries.fields)
    .limit(queries.limits);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const {_id: productId, brand} = product;
  const res = await Brand.updateOne(
    {_id:brand.id},
    {$push : {products : productId}}
  )
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({_id: data.ids},data.data,{runValidators : true});
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = Promise.all(products);
  // console.log(result);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
