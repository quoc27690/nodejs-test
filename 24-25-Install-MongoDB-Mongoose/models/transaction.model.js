var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
  userName: String,
  bookTitle: String,
  isComplete: Boolean
});

var Transaction = mongoose.model("Transaction", transactionSchema, "transactions"); // 'transactions': lưu vào collection transactions

module.exports = Transaction;
