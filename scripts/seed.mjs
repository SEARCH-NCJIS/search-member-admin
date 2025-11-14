import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://tim_db_user:9B7hn5PFxcOk3wMZ@cluster0.4yb4szq.mongodb.net/?appName=Cluster0';
const dbName = process.env.MONGO_DB;

if (!uri) {
  console.error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection('members');

  await col.createIndex({ email: 1 }, { unique: true, sparse: true });
  await col.createIndex({ isBoard: 1 });
  await col.createIndex({ status: 1 });
  await col.createIndex({ tags: 1 });

  await col.insertMany([
    {
      state: 'New York',
      firstName: 'Adam',
      lastName: 'Dean',
      email: 'adam.dean@dcjs.ny.gov',
      agency: 'New York State Division of Criminal Justice Services',
      isBoard: true,
      boardRole: 'Chair',
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      state: 'Alabama',
      title: 'Captain',
      firstName: 'Mike',
      lastName: 'Trotter',
      email: 'mike.trotter@alea.gov',
      agency: 'Alabama Law Enforcement Agency',
      isBoard: false,
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.close();
  });
