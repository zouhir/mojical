import idb from "idb";

/**
 * if (newProps.lastSync && newProps.user.uid) {
      let odb = offlinedb(newProps.user.uid, "feeling");
      odb.set("calendar", newProps.calendar);
    }
 */

const FEELINGS_KEY = "feelings";
const ACTIVITY_KEY = "activity";

function OfflineDb(uid, entity) {
  const dbPromise = idb.open(uid, 1, upgradeDB => {
    upgradeDB.createObjectStore(entity);
  });

  const idbKeyval = {
    get(key) {
      return new Promise(function(resolve, reject) {
        dbPromise
          .then(db => {
            resolve(
              db
                .transaction(entity)
                .objectStore(entity)
                .get(key)
            );
          })
          .catch(error => reject(error));
      });
    },
    set(key, val) {
      return new Promise(function(resolve, reject) {
        dbPromise
          .then(db => {
            const tx = db.transaction(entity, "readwrite");
            tx.objectStore(entity).put(val, key);
            resolve(tx.complete);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    delete(key) {
      return dbPromise.then(db => {
        const tx = db.transaction(entity, "readwrite");
        tx.objectStore(entity).delete(key);
        return tx.complete;
      });
    },
    clear() {
      return dbPromise.then(db => {
        const tx = db.transaction(entity, "readwrite");
        tx.objectStore(entity).clear();
        return tx.complete;
      });
    },
    keys() {
      return dbPromise.then(db => {
        const tx = db.transaction(entity);
        const keys = [];
        const store = tx.objectStore(entity);

        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // openKeyCursor isn't supported by Safari, so we fall back
        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
          if (!cursor) return;
          keys.push(cursor.key);
          cursor.continue();
        });

        return tx.complete.then(() => keys);
      });
    }
  };

  return idbKeyval;
}

export default OfflineDb;
