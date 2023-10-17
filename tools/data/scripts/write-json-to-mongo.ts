import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';

const SCRIPT_CONFIG = {
    // farms
    farmsFilepath: 'tools/data/raw/agri-cart.farms.json',
    farmsCollectionName: 'farms',
    farmsObjectIDFields: ['_id'],
    // products
    productsFilepath: 'tools/data/raw/agri-cart.products.json',
    productsCollectionName: 'products',
    productsObjectIDFields: ['_id', 'farm_id'],
};

/**
 * Takes local JSON and uploads to mongodb
 */
async function genWriteJSONToMongoDB(): Promise<void> {
    console.log('Begin: genWriteJSONToMongoDB');
    console.log('Connecting to MongoDB...');
    const mongoClient = new MongoClient(process.env['MONGODB_URI'] ?? '');
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    await Promise.all([
        uploadJSONToMongoDB(
            mongoClient,
            SCRIPT_CONFIG.farmsFilepath,
            SCRIPT_CONFIG.farmsCollectionName,
            SCRIPT_CONFIG.farmsObjectIDFields,
        ),
        uploadJSONToMongoDB(
            mongoClient,
            SCRIPT_CONFIG.productsFilepath,
            SCRIPT_CONFIG.productsCollectionName,
            SCRIPT_CONFIG.productsObjectIDFields,
        ),
    ]);
    console.log('Closing MongoDB connection...');
    await mongoClient.close();
    console.log('End: genWriteJSONToMongoDB');
};


async function uploadJSONToMongoDB(
    mongoClient: MongoClient,
    filePath: string,
    collectionName: string,
    objectIDJSONFields: string[],
) {
    console.log(`Uploading ${filePath} to MongoDB...`);
    // Read the JSON files
    const jsonArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const jsonArrayWithObjectIDs = (jsonArray as any[]).map(doc => {
        const docWithObjectIDs = objectIDJSONFields.reduce<{ [key: string]: ObjectId; }>(
            (memo, field) => {
                memo[field] = new ObjectId(doc[field]['$oid']);
                return memo;
            }, {});

        return {
            ...doc,
            ...docWithObjectIDs,
        };
    });
    // Select the database and collection
    const collection = mongoClient.db().collection(collectionName);
    // Insert the JSON data into MongoDB
    await collection.insertMany(jsonArrayWithObjectIDs);
    console.log('Data uploaded to MongoDB successfully.');
}

genWriteJSONToMongoDB()
    .then(() => {
        console.log('Script completed');
        process.exit();
    })
    .catch((err) => {
        console.log(`Script completed with err: ${err}`);
        process.exit(1);
    });