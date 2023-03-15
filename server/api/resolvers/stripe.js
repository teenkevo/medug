const {
  getCustomerPaymentMethods,
  setupIntent,
  updateCustomer,
  createSubscription,
  finalizeInvoice,
  updateSubscription,
  cancelSubscription,
  updateProduct,
  createProduct,
  createPrice,
  getSubscriptions,
  createCustomer,
  deleteCustomer,
  getCustomer,
  getInvoices,
  getCharges,
  detachPaymentMethod,
} = require("./controllers/payment/paymentController");

const queries = {
  // stripe - get customer's payment methods
  getPaymentMethods: (_, args) => {
    const { customer } = args;
    return getCustomerPaymentMethods(customer);
  },
  // stripe - get subscriptions
  getSubscriptions: (_, args) => {
    const { input } = args;
    return getSubscriptions(input);
  },
  // stripe - get customer
  getCustomer: (_, args) => {
    const { customerId } = args;
    return getCustomer(customerId);
  },
  // stripe - get customers invoices
  getRestInvoices: (_, args) => {
    const { customerId } = args;
    return getInvoices(customerId);
  },
  // stripe - get customers charges
  getCharges: (_, args) => {
    const { customerId } = args;
    return getCharges(customerId);
  },
};

const mutations = {
  // stripe - setup intent
  setupIntent: (_, args) => {
    const { customerId } = args;
    return setupIntent(customerId);
  },
  // stripe - update customer
  updateCustomer: (_, args) => {
    const { customerId, paymentMethod } = args;
    return updateCustomer(customerId, paymentMethod);
  },
  // stripe - create subscription
  createSubscription: (_, args) => {
    const { input } = args;
    return createSubscription(input);
  },
  // stripe - finalize invoice
  finalizeInvoice: (_, args) => {
    const { invoiceId } = args;
    return finalizeInvoice(invoiceId);
  },
  // stripe - update subscription
  updateSubscription: (_, args) => {
    const { input } = args;
    return updateSubscription(input);
  },
  // stripe - cancel subscription
  cancelSubscription: (_, args) => {
    const { subscriptionId } = args;
    return cancelSubscription(subscriptionId);
  },
  // stripe - update product
  updateProduct: (_, args) => {
    const { input } = args;
    return updateProduct(input);
  },
  // stripe - create product
  createProduct: (_, args) => {
    const { input } = args;
    return createProduct(input);
  },
  // stripe - create price
  createRestPrice: (_, args) => {
    const { input } = args;
    return createPrice(input);
  },
  // stripe - create customer
  createCustomer: (_, args) => {
    const { name, email, type } = args;
    return createCustomer(name, email, type);
  },
  // stripe - delete customer
  deleteCustomer: (_, args) => {
    const { customerId } = args;
    return deleteCustomer(customerId);
  },
  // stripe - detach payment method
  detachPaymentMethod: (_, args) => {
    const { paymentMethod } = args;
    return detachPaymentMethod(paymentMethod);
  },
};

module.exports = {
  queries,
  mutations,
};
