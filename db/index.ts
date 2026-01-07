import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Get database instance (safe)
 */
export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("inventory.db");
  }
  return db;
};

/**
 * Initialize tables
 */
export const initDB = async () => {
  const database = await getDB();

  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      unit TEXT NOT NULL,
      unitPrice REAL NOT NULL,
      stock REAL NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      change REAL NOT NULL,
      previousStock REAL NOT NULL,
      newStock REAL NOT NULL,
      reason TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id)
    );

  `);
};

/**
 * Seed categories
 */
export const seedCategories = async () => {
  const database = await getDB();

  const categories = [
    "Syrup",
    "Milk",
    "Disposable Cups",
    "Straw",
    "Soda",
    "Powder",
  ];

  for (const name of categories) {
    await database.runAsync(
      `INSERT OR IGNORE INTO categories (name) VALUES (?);`,
      [name]
    );
  }
};

/**
 * Get categories
 */
export const getCategories = async () => {
  const database = await getDB();

  return await database.getAllAsync<{ id: number; name: string }>(
    `SELECT * FROM categories;`
    // `SELECT * FROM categories ORDER BY name ASC;`
  );
};

/**
 * Add product
 */
export const addProduct = async (
  name: string,
  unit: string,
  unitPrice: number,
  stock: number,
  categoryId: number
) => {
  const db = await getDB();

  await db.execAsync("BEGIN TRANSACTION;");

  try {
    const result = await db.runAsync(
      `
      INSERT INTO products (name, unit, unitPrice, stock, categoryId)
      VALUES (?, ?, ?, ?, ?);
      `,
      [name, unit, unitPrice, stock, categoryId]
    );

    const productId = result.lastInsertRowId;

    // Log initial stock
    await db.runAsync(
      `
      INSERT INTO stock_movements
        (productId, change, previousStock, newStock, reason, createdAt)
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [
        productId,
        stock, // change
        0, // previousStock
        stock, // newStock
        "restock", // reason
        new Date().toISOString(),
      ]
    );

    await db.execAsync("COMMIT;");
  } catch (e) {
    await db.execAsync("ROLLBACK;");
    throw e;
  }
};

export const getProductById = async (id: number) => {
  const db = await getDB();

  const result = await db.getFirstAsync<{
    id: number;
    name: string;
    unit: string;
    unitPrice: number;
    stock: number;
    categoryId: number;
  }>(
    `
    SELECT *
    FROM products
    WHERE id = ?;
    `,
    [id]
  );

  return result ?? null;
};

/**
 * Get products
 */
export const getProducts = async (categoryId: number) => {
  const database = await getDB();

  if (categoryId) {
    return await database.getAllAsync(
      `
      SELECT p.*, c.name AS category
      FROM products p
      JOIN categories c ON p.categoryId = c.id
      WHERE categoryId = ?
      ORDER BY p.name ASC;
      `,
      [categoryId]
    );
  }

  return await database.getAllAsync(
    `
    SELECT p.*, c.name AS category
    FROM products p
    JOIN categories c ON p.categoryId = c.id
    ORDER BY p.name ASC;
    `
  );
};

export const updateProduct = async (
  id: number,
  name: string,
  unit: string,
  unitPrice: number,
  stock: number,
  categoryId: number
) => {
  const database = await getDB();

  await database.runAsync(
    `
    UPDATE products
    SET name = ?, unit = ?, unitPrice = ?, stock = ?, categoryId = ?
    WHERE id = ?;
    `,
    [name, unit, unitPrice, stock, categoryId, id]
  );
};

export const updateProductStock = async (
  productId: number,
  newStock: number,
  reason: "sale" | "restock" | "adjustment"
) => {
  const db = await getDB();

  // Get current stock
  // const result = await db.getFirstAsync<{
  //   stock: number;
  // }>(
  //   `SELECT stock FROM stock_movements WHERE productId = ?;`,
  //   [productId]
  // );
  // if (!result) return;

  const lastMovement = await db.getFirstAsync<{
    newStock: number;
  }>(
    `
  SELECT newStock
  FROM stock_movements
  WHERE productId = ?
  ORDER BY createdAt DESC, id DESC
  LIMIT 1;
`,
    [productId]
  );

  const previousStock = lastMovement?.newStock ?? 0;

  const change = newStock - previousStock;

  await db.execAsync("BEGIN TRANSACTION;");

  try {
    await db.runAsync(`UPDATE products SET stock = ? WHERE id = ?;`, [
      newStock,
      productId,
    ]);

    await db.runAsync(
      `
      INSERT INTO stock_movements
        (productId, change, previousStock, newStock, reason, createdAt)
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [
        productId,
        change,
        previousStock,
        newStock,
        reason,
        new Date().toISOString(),
      ]
    );

    await db.execAsync("COMMIT;");
  } catch (e) {
    await db.execAsync("ROLLBACK;");
    throw e;
  }
};

export const getStockHistory = async (productId: number) => {
  const db = await getDB();

  return await db.getAllAsync(
    `
    SELECT *
    FROM stock_movements
    WHERE productId = ?
    ORDER BY createdAt DESC;
    `,
    [productId]
  );
};

export const deleteProduct = async (productId: number) => {
  const db = await getDB();

  await db.execAsync('BEGIN;');
  try {
    await db.runAsync(`DELETE FROM stock_movements WHERE productId = ?;`, [productId]);
    await db.runAsync(`DELETE FROM products WHERE id = ?;`, [productId]);

    await db.execAsync('COMMIT;');
  } catch (e) {
    await db.execAsync('ROLLBACK;');
    throw e;
  }
};