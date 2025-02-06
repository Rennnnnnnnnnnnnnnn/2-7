
import db from '../config/database.js'; // Assuming your DB connection is set up correctly
import express from 'express';
const router = express.Router();

// Controller for fetching inventory data by batchId
export const getInventoryByBatch = async (req, res, next) => {
    const { batchId } = req.params;  // Retrieve batchId from the request parameters

    try {
        const [results] = await db.execute(
            'SELECT * FROM inventory WHERE batch_id = ? ORDER BY inventory_date DESC',
            [batchId]  // Use the batchId as a parameter to filter the inventory data
        );
        res.json(results);  // Send the inventory data as a JSON response
    } catch (err) {
        console.log(err);
        const error = new Error('Unable to fetch inventory data');
        error.status = 500;
        return next(error);  // Pass the error to the next middleware (error handler)
    }
};


export const getTableValues = async (req, res, next) => {
    const itemType = req.query.itemType;
    let query = '';

    // Dynamically select the table based on itemType
    switch (itemType) {
        case 'Flocks':
            query = 'SELECT * FROM flocks_inventory'; // Replace with actual table for Flocks
            break;
        case 'Feeds: Chick Booster':
            query = 'SELECT * FROM feeds_chickbooster_inv'; // Replace with actual table
            break;
        case 'Feeds: Starter':
            query = 'SELECT * FROM feeds_starter_inv'; // Replace with actual table
            break;
        case 'Vitamins: Atobe':
            query = 'SELECT * FROM vitamins_atobe_inv'; // Replace with actual table
            break;
        case 'Vitamins: Molases':
            query = 'SELECT * FROM vitamins_molases_inv'; // Replace with actual table
            break;
        default:
            return res.status(400).json({ message: 'Invalid item type' });
    }

    try {
        // Use promise-based API for query
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching inventory data', error: err.message });
    }
}






// export const getTableValues = async (req, res, next) => {
//     const { itemType, batchId } = req.query; // Use req.query for GET requests

//     if (!batchId) {
//         return res.status(400).json({ message: 'Batch ID is required' });
//     }

//     let query = '';
//     switch (itemType) {
//         case 'Flocks':
//             query = 'SELECT * FROM flocks WHERE batch_id = ?';
//             break;
//         case 'Feeds: Chick Booster':
//             query = 'SELECT * FROM feeds_chickbooster_inv WHERE batch_id = ?';
//             break;
//         case 'Feeds: Starter':
//             query = 'SELECT * FROM feeds_starter_inv WHERE batch_id = ?';
//             break;
//         case 'Vitamins: Atobe':
//             query = 'SELECT * FROM vitamins_atobe_inv WHERE batch_id = ?';
//             break;
//         case 'Vitamins: Molases':
//             query = 'SELECT * FROM vitamins_molases_inv WHERE batch_id = ?';
//             break;
//         default:
//             return res.status(400).json({ message: 'Invalid item type' });
//     }

//     try {
//         const results = await db.execute(query, [batchId]);
//         res.json(results);
//         console.log('Query Results:', results);
//     } catch (err) {
//         res.status(500).json({
//             message: 'Error fetching data',
//             error: err.message
//         });
//     }
// };



