const { Sequelize } = require('sequelize');
const FAQModel = require('./models/faq');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'faq.db' // SQLite database file
});

const FAQ = FAQModel(sequelize, Sequelize);

// Define a function to create a new FAQ
async function createFAQ(question, answer) {
  try {
    await FAQ.create({
      question,
      answer
    });
    console.log('FAQ created successfully!');
  } catch (error) {
    console.error('Error creating FAQ:', error);
  }
}

// Define a function to retrieve all FAQs
async function getAllFAQs() {
  try {
    const faqs = await FAQ.findAll();
    console.log('All FAQs:', faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
}

// Example usage:
async function main() {
  await sequelize.sync(); // Sync models with the database
  await createFAQ('What is driveu?', 'It is a platform for so and so use');
  await createFAQ('Why driveu?', 'driveu is one of the best applications');
  await getAllFAQs();
  await sequelize.close(); // Close the database connection
}

main();
