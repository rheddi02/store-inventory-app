import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Get database instance (safe)
 */
export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('inventory.db');
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
  `);
};

/**
 * Seed categories
 */
export const seedCategories = async () => {
  const database = await getDB();

  const categories = [
    'Syrup',
    'Milk',
    'Disposable Cups',
    'Straw',
    'Soda',
    'Powder',
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
    `SELECT * FROM categories ORDER BY name ASC;`
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
  const database = await getDB();

  await database.runAsync(
    `
    INSERT INTO products (name, unit, unitPrice, stock, categoryId)
    VALUES (?, ?, ?, ?, ?);
    `,
    [name, unitPrice, stock, categoryId]
  );
};

/**
 * Get products
 */
export const getProducts = async (categoryId?: number) => {
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
