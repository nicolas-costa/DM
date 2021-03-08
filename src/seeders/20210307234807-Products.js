"use strict";
const fs = require("fs").promises;
const path = require("path");
const parse = require("csv-parse/lib/sync");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface
     * .bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const file = await fs.readFile(path.join(__dirname, "/../../products.csv"));
    const csvRows = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }).map((row) => {
      return {
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return await queryInterface.bulkInsert("Products", csvRows, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
