import express from 'express';
import { getInventoryByBatch , getTableValues} from '../controllers/inventoryController.js';

const router = express.Router();

// GET ALL INVENTORY DETAILS BY BATCH ID
router.get('/:batchId', getInventoryByBatch);

router.get('/', getTableValues);



export default router;
