const { randomBytes } = require("crypto");
const { sequelizeInstance } = require("../models/sequelize.js");
const Product = require("../models/Products.js");
const Customer = require("../models/Customers.js");
const Order = require("../models/Orders.js");
const Review = require("../models/Reviews.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../schema/config.js");

const productModel = Product(sequelizeInstance);
const customerModel = Customer(sequelizeInstance);
const orderModel = Order(sequelizeInstance);
const reviewModel = Review(sequelizeInstance);

const userModel = User(sequelizeInstance);

const resolvers = {
  Query: {
    user: async (_, { _id }) => await userModel.findByPk(_id),
    users: async () => await userModel.findAll(),

    product: async (parent, { id }) => {
      return await productModel.findByPk(id);
    },
    products: async () => {
      const products = await productModel.findAll();
      return products;
    },

    customer: (parent, { id }) => {
      return customerModel.findByPk(id);
    },
    customers: async () => {
      return await customerModel.findAll();
    },
    order: (parent, { id }) => {
      return orderModel.findByPk(id);
    },
    orders: async () => {
      return await orderModel.findAll();
    },
    review: (parent, { id }) => {
      return reviewModel.findByPk(id);
    },
    reviews: async () => {
      return await reviewModel.findAll();
    },
    getNumberofProducts :async()=>{
     const query = 'select COUNT(id) AS countOfProducts from products';
        const [results] = await sequelizeInstance.query(query, {
          type: sequelizeInstance.QueryTypes.SELECT,
        });
        return results.countOfProducts;
    },
    getNumberofCustomers :async()=>{
      const query = 'select COUNT(id) AS countOfUsers from customers';
         const [results] = await sequelizeInstance.query(query, {
           type: sequelizeInstance.QueryTypes.SELECT,
         });
         return results.countOfUsers;
     },
     getNumberofOrders :async()=>{
      const query = 'select COUNT(id) AS countOfOrders from orders';
         const [results] = await sequelizeInstance.query(query, {
           type: sequelizeInstance.QueryTypes.SELECT,
         });
         return results.countOfOrders;
     },
     getProductCounts:async()=>{
      const query ="select count(*) as Total, SUM(CASE WHEN category = 'Gizmo' THEN 1 ELSE 0 END) as Gizmo,SUM(CASE WHEN category = 'Gadget' THEN 1 ELSE 0 END) as Gadget,SUM(CASE WHEN category = 'Doohickey' THEN 1 ELSE 0 END) as Doohickey,SUM(CASE WHEN category = 'Widget' THEN 1 ELSE 0 END) as Widget from products;";
      const [results] = await sequelizeInstance.query(query, {
        type: sequelizeInstance.QueryTypes.SELECT,
      });
      return {
        Total:parseInt(results.Total),
        Gizmo: parseInt(results.Gizmo),
        Gadget: parseInt(results.Gadget),
        Doohickey: parseInt(results.Doohickey),
        Widget: parseInt(results.Widget)
      };
    },
    getCustomerOrderCounts: async () => {
      
        const query = `
          SELECT c.id as CustomerID, COUNT(o.id) as NumOrders
          FROM customers c
          LEFT JOIN orders o ON c.id = o.user_id
          GROUP BY c.id LIMIT 20;
        `;
        const results = await sequelizeInstance.query(query, {
          type: sequelizeInstance.QueryTypes.SELECT,
        });

        return results.map((row) => ({
          CustomerID: row.CustomerID,
          NumOrders: parseInt(row.NumOrders),
        }));
    },
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      try {
        const user = await userModel.findOne({
          where: { email: userNew.email },
        });
        if (user) {
          throw new Error("User already exists with that email");
        }
        const hashedPassword = await bcrypt.hash(userNew.password, 12);

        const newUser = new userModel({
          ...userNew,
          password: hashedPassword,
        });

        return await newUser.save();
      } catch (error) {
        throw new Error(`Error signing up: ${error.message}`);
      }
    },

    signinUser: async (_, { userSignin }) => {
      try {
        const user = await userModel.findOne({
          where: { email: userSignin.email },
        });
        if (!user) {
          throw new Error("User doesn't exist with that email");
        }

        const doMatch = await bcrypt.compare(
          userSignin.password,
          user.password
        );
        if (!doMatch) {
          throw new Error("Email or password is invalid");
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return {
          token,
        };
      } catch (error) {
        throw new Error(`Error signing in: ${error.message}`);
      }
    }, 
    createProduct: async (_, { productInput }) => {
      const newProduct = new productModel(productInput);
      const savedNewProduct = await newProduct.save();
      return savedNewProduct;
    },
    updateProduct: async (_, { id, productInput }) => {
      const [updatedProduct] = await productModel.update(productInput, {
        where: { id: id },
        returning: true,
      });
      // const savedNewProduct=await updatedProduct.save();

      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      try {
        const deleteProduct = await productModel.destroy({ where: { id: id } });
        if (deleteProduct) {
          return "Product deleted successfully";
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        throw new Error("Failed to delete product");
      }
    },

    
  },
};

module.exports = { resolvers };
