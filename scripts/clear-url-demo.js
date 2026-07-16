import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const databasePath = fileURLToPath(
  new URL("../data/tickets.sqlite", import.meta.url)
);
const database = new DatabaseSync(databasePath);

const result = database
  .prepare(
    `
      DELETE FROM tickets
      WHERE reference_url LIKE 'javascript:%'
         OR title = 'Riferimento malevolo L18'
    `
  )
  .run();

database.close();

console.log(`Rimossi ${result.changes} ticket URL dimostrativi.`);
