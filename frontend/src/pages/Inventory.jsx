import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Inventory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inventoryData, setInventoryData] = useState([]);
    const [itemType, setItemType] = useState('');
    const [currentBatch, setCurrentBatch] = useState("");

    function formatDateToReadableString(date) {
        return new Date(date).toLocaleDateString('en-PH', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    // Fetch inventory data when itemType or batchId changes
    // Fetch inventory data when itemType changes
    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get(`/api/inventory?itemType=${itemType}`);
                setInventoryData(response.data); // Assuming the data returned is in the correct format
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        // Fetch data only when itemType is selected

        fetchInventoryData();

    }, [itemType]); // Fetch data when itemType changes

    return (
        <>
            <Navbar />
            <div className="flex flex-row bg-blue-100">
                <div className="mb-4 bg-red-200 flex flex-col p-4">
                    <label className="text-center">Item Types</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="itemType"
                                value="Flocks"
                                checked={itemType === 'Flocks'}
                                onChange={(event) => setItemType(event.target.value)}
                            />
                            Flocks
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="itemType"
                                value="Feeds: Chick Booster"
                                checked={itemType === 'Feeds: Chick Booster'}
                                onChange={(event) => setItemType(event.target.value)}
                            />
                            Feeds: Chick Booster
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="itemType"
                                value="Feeds: Starter"
                                checked={itemType === 'Feeds: Starter'}
                                onChange={(event) => setItemType(event.target.value)}
                            />
                            Feeds: Starter
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="itemType"
                                value="Vitamins: Atobe"
                                checked={itemType === 'Vitamins: Atobe'}
                                onChange={(event) => setItemType(event.target.value)}
                            />
                            Vitamins: Atobe
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="itemType"
                                value="Vitamins: Molases"
                                checked={itemType === 'Vitamins: Molases'}
                                onChange={(event) => setItemType(event.target.value)}
                            />
                            Vitamins: Molases
                        </label>
                    </div>
                </div>

                <div className="main container mx-auto p-4 bg-orange-200">
                    {/* Inventory table */}
                    <table className="min-w-full bg-white border border-gray-900">
                        <thead>
                            <tr className="bg-green-800 text-white border border-black">
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Amount Left</th>
                                <th className="py-2 px-4 border">Amount Consumed</th>
                                <th className="py-2 px-4 border">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No Items Found</td>
                                </tr>
                            ) : (
                                inventoryData.map((item) => (
                                    <tr key={item.item_id}>
                                        <td className="py-2 px-4 border">{formatDateToReadableString(item.date)}</td>
                                        <td className="py-2 px-4 border">{item.quantity}</td>
                                        <td className="py-2 px-4 border">{item.amount_consumed}</td>
                                        <td className="py-2 px-4 border"></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Inventory;
