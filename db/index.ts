import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('inventory.db');

// Initialize table
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        unitPrice REAL NOT NULL,
        stock INTEGER NOT NULL
      );`,
      [],
      () => console.log('Products table ready'),
      (_, error) => {
        console.log('Error creating table', error);
        return false;
      }
    );
  });
};

// Fetch all products
export const getProducts = (callback: (products: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM products ORDER BY name ASC;`,
      [],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
};

// Add a new product
export const addProduct = (name: string, unitPrice: number, stock: number) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO products (name, unitPrice, stock) VALUES (?, ?, ?)`,
      [name, unitPrice, stock]
    );
  });
};

// Update stock
export const updateStock = (id: number, stock: number) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE products SET stock = ? WHERE id = ?`,
      [stock, id]
    );
  });
};

// Delete product
export const deleteProduct = (id: number) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM products WHERE id = ?`,
      [id]
    );
  });
};
