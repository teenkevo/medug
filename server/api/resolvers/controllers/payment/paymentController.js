const dotenv = require("dotenv");
const Stripe = require("stripe");
dotenv.config();

const stripe = Stripe(
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_SECRET_TEST
    : process.env.STRIPE_SECRET_LIVE
);

const createPrice = async (input) => {
  const { priceData } = input;
  return stripe.prices
    .create(priceData)
    .then((price) => price)
    .catch((err) => console.log(err));
};

const createProduct = async (input) => {
  const { name, default_price_data } = input;
  return stripe.products
    .create({
      name,
      description: `Vlearned ${name} Subscription Plan`,
      default_price_data,
    })
    .then((product) => product)
    .catch((err) => console.log(err));
};

const updateProduct = async (input) => {
  const { product, object } = input;
  return stripe.products.update(product, object).then((product) => product);
};

const createCustomer = async (name, email, type) => {
  return stripe.customers
    .create({
      name,
      email,
      description: `${type} organization - ${name}`,
    })
    .then((customer) => customer)
    .catch((err) => console.log(err));
};

const deleteCustomer = async (customer) => {
  return stripe.customers
    .del(customer)
    .then((customer) => customer)
    .catch((err) => console.log(err));
};

const createSubscription = async (input) => {
  const { customer, price, collection_method, metadata } = input;
  return stripe.subscriptions
    .create(
      collection_method === "send_invoice"
        ? {
            customer,
            items: [{ price }],
            collection_method,
            days_until_due: "30",
            metadata,
          }
        : {
            customer,
            items: [{ price }],
            collection_method,
            metadata,
            payment_behavior: "error_if_incomplete",
          }
    )
    .then((subscription) => subscription)
    .catch((err) => err);
};

const getSubscriptions = async (input) => {
  const { filter } = input;
  return stripe.subscriptions
    .list(filter)
    .then((subscriptions) => subscriptions)
    .catch((err) => console.log(err));
};

const updateSubscription = async (input) => {
  const { subscription, object } = input;
  return stripe.subscriptions
    .update(subscription, object)
    .then((subscription) => subscription)
    .catch((err) => console.log(err));
};

const cancelSubscription = async (subscription) => {
  return stripe.subscriptions
    .del(subscription)
    .then((subscription) => subscription)
    .catch((err) => console.log(err));
};

const setupIntent = async (customer) => {
  return stripe.setupIntents
    .create({
      customer,
      payment_method_types: ["card"],
    })
    .then((setupIntent) => ({ client_secret: setupIntent.client_secret }))
    .catch((err) => console.log(err));
};

const getCustomerPaymentMethods = (customer) => {
  return stripe.customers
    .listPaymentMethods(customer, { type: "card" })
    .then((paymentMethods) => {
      return paymentMethods;
    })
    .catch((err) => console.log(err));
};

const getInvoices = async (customer) => {
  return stripe.invoices
    .list({ customer })
    .then((invoices) => invoices)
    .catch((err) => console.log(err));
};

const getCustomer = async (customer) => {
  return stripe.customers
    .retrieve(customer)
    .then((customer) => customer)
    .catch((err) => console.log(err));
};

const updateCustomer = async (customer, paymentMethod) => {
  return stripe.customers
    .update(customer, {
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    })
    .then((customer) => customer)
    .catch((err) => console.log(err));
};

const detachPaymentMethod = async (paymentMethod) => {
  return stripe.paymentMethods
    .detach(paymentMethod)
    .then((paymentMethod) => paymentMethod)
    .catch((err) => console.log(err));
};

const getCharges = async (customer) => {
  return stripe.charges
    .list({ customer })
    .then((charges) => charges)
    .catch((err) => console.log(err));
};

const finalizeInvoice = async (invoice) => {
  return stripe.invoices
    .finalizeInvoice(invoice)
    .then((invoice) => invoice)
    .catch((err) => console.log(err));
};

module.exports = {
  createPrice,
  createProduct,
  updateProduct,
  createCustomer,
  createCustomer,
  deleteCustomer,
  createSubscription,
  getSubscriptions,
  finalizeInvoice,
  getCharges,
  detachPaymentMethod,
  updateCustomer,
  getCustomer,
  getInvoices,
  getCustomerPaymentMethods,
  setupIntent,
  cancelSubscription,
  updateSubscription,
};
