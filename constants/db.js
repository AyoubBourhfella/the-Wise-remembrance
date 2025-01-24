import * as SQLite from 'expo-sqlite/legacy'
import * as FileSystem from 'expo-file-system';

const dbName = 'dbName';
const db = SQLite.openDatabase(dbName);

export const storeData = async (data, language) => {
  try {
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`DROP TABLE IF EXISTS surahs_${language};`, [], resolve, (tx, error) => {
          console.error('Error dropping surahs table:', error);
          reject(error);
        });
        tx.executeSql(`DROP TABLE IF EXISTS ayahs_${language};`, [], resolve, (tx, error) => {
          console.error('Error dropping ayahs table:', error);
          reject(error);
        });
      });
    });

    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS surahs_${language} (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              number INTEGER NOT NULL,
              name TEXT,
              englishName TEXT,
              ayahs_len INTEGER,
              englishNameTranslation TEXT,
              revelationType TEXT
          );
        `, [], resolve, (tx, error) => {
          console.error('Error creating surahs table:', error);
          reject(error);
        });

        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS ayahs_${language} (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              surah_id INTEGER,
              number INTEGER NOT NULL,
              text TEXT,
              numberInSurah INTEGER,
              juz INTEGER,
              manzil INTEGER,
              page INTEGER,
              ruku INTEGER,
              hizbQuarter INTEGER,
              sajda BOOLEAN,
              FOREIGN KEY (surah_id) REFERENCES surahs_${language}(id)
          );
        `, [], resolve, (tx, error) => {
          console.error('Error creating ayahs table:', error);
          reject(error);
        });
      });
    });

    const { surahs } = data.data;

    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        surahs.forEach(surah => {
          tx.executeSql(
            `INSERT INTO surahs_${language} (number, name, englishName, ayahs_len, englishNameTranslation, revelationType)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [surah.number, surah.name, surah.englishName, surah.ayahs.length, surah.englishNameTranslation, surah.revelationType],
            (_, { insertId }) => {
              surah.ayahs.forEach(ayah => {
                tx.executeSql(
                  `INSERT INTO ayahs_${language} (surah_id, number, text, numberInSurah, juz, manzil, page, ruku, hizbQuarter, sajda)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [insertId, ayah.number, ayah.text, ayah.numberInSurah, ayah.juz, ayah.manzil, ayah.page, ayah.ruku, ayah.hizbQuarter, ayah.sajda]
                );
              });
            },
            (tx, error) => {
              console.error(`Error inserting surah ${surah.number}:`, error);
              reject(error);
            }
          );
        });
        resolve();
      });
    });

    console.log(`Data for ${language} stored successfully`);
  } catch (error) {
    console.error(`Error storing data for ${language}:`, error);
  }
};

export const getData = async (language) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM surahs_${language};`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (tx, error) => {
            console.error(`Error getting data for ${language}:`, error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error(`Error getting data for ${language}:`, error);
  }
};
export const searchsourat = async (language , param) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM surahs_${language} WHERE name LIKE '%${param}%' OR number LIKE '%${param}%' OR englishName LIKE '%${param}%' ;`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (tx, error) => {
            console.error(`Error getting data for ${language}:`, error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error(`Error getting data for ${language}:`, error);
  }
};
export const getDataUnique = async (language , id) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM surahs_${language} WHERE id = ?;`,
          [id],
          (_, { rows }) => {
            resolve(rows._array.length > 0 ? rows._array[0] : null);
          },
          (tx, error) => {
            console.error(`Error getting data for ${language}:`, error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error(`Error getting data for ${language}:`, error);
  }
};
export const getAyahs = async (language, surahNumber) => {
  try {
    return new Promise(

      (resolve, reject) => 
        db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ayahs_${language} WHERE surah_id = ?;`,
          [surahNumber],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (tx, error) => {
            console.error(`Error getting data for ${language}:`, error);
            reject(error);
          }
        )})
    );
  } catch (error) {
    console.error(`Error getting data for ${language}:`, error);
  }
}

export const reset = async () => {
  try {
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
    await FileSystem.deleteAsync(dbFilePath, { idempotent: true });
    console.log('Database deleted successfully');
  } catch (error) {
    console.error('Error deleting database:', error);
    throw error; // rethrow the error to be handled by the caller
  }
};
