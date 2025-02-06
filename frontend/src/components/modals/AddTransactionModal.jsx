import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FormHelperText } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import pesoIcon from '../../assets/pesoSign.svg';

const AddTransactionModal = ({ isOpen, handleClose, handleAddTransaction, currentBatch }) => {
    const [transactionDate, setTransactionDate] = useState(dayjs());
    const [transactionType, setTransactionType] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [contactName, setContactName] = useState('');
    const [batchId, setBatchId] = useState(null);
    const [itemType, setItemType] = useState('');
    const [isPriceFocused, setIsPriceFocused] = useState(false);
    const [isTotalCostFocused, setIsTotalCostFocused] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (currentBatch && currentBatch.batchId !== undefined) {
            setBatchId(currentBatch.batchId);
        }
        console.log(batchId);
    }, [currentBatch]);

    // Dynamic Item Type options based on transactionType
    const getItemTypeOptions = () => {
        if (transactionType === "Sale") {
            return ["Liveweight", "Dressed"];
        } else if (transactionType === "Expense") {
            return [
                "Chicks",
                "Feeds: Chick Booster",
                "Feeds: Starter",

              
                "Vitamins: Atobe",
                "Vitamins: Molases",
                "Labor",
                "Water",
                "Electricity",
                "Gasoline"
            ];
        }
        return [];
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const isFormValid = itemType && quantity && pricePerUnit && transactionType && itemType;

        if (!isFormValid) return; // Prevent submission if any field is empty

        const newTransactionData = {
            batchId: batchId,
            transactionDate: transactionDate,
            transactionType: transactionType,
            contactName: contactName || " ",
            itemType: itemType,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            totalCost: totalCost,
        };

        console.log(newTransactionData);
        handleAddTransaction(newTransactionData);
        handleClose();
    };

    useEffect(() => {
        const calculatedCost = quantity && pricePerUnit ? quantity * pricePerUnit : '';
        setTotalCost(calculatedCost);
    }, [quantity, pricePerUnit]);

    return (
        <Modal
            open={isOpen}
            onClose={(e, reason) => {
                if (reason === 'backdropClick') return;
                handleClose();
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 28,
                    p: 4,
                    borderRadius: '8px',
                }}
            >
                <label className="font-semibold text-2xl text-center block mb-5">Add Transaction</label>
                <form>
                    <FormControl fullWidth margin="normal" error={isSubmitted && !transactionDate}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Transaction Date"
                                value={transactionDate}
                                onChange={(newDate) => setTransactionDate(newDate)}
                                required
                                slotProps={{
                                    field: { clearable: true, onClear: () => setTransactionDate(null) },
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderColor: 'red',
                                    },
                                }}
                            />
                        </LocalizationProvider>
                        {isSubmitted && !transactionDate && (
                            <FormHelperText style={{ color: 'red' }}>Transaction Date is required</FormHelperText>
                        )}
                    </FormControl>

                    <div className='flex gap-4'>
                        {/* TRANSACTION TYPE */}
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={isSubmitted && !transactionType} // Error handling for transactionType
                        >
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                                label="Transaction Type"
                            >
                                <MenuItem value="" disabled>
                                    Select Transaction Type
                                </MenuItem>
                                <MenuItem value="Sale">Sale</MenuItem>
                                <MenuItem value="Expense">Expense</MenuItem>
                            </Select>
                            {isSubmitted && !transactionType && (
                                <FormHelperText style={{ color: 'red' }}>  Transaction Type is required</FormHelperText>
                            )}
                        </FormControl>

                        {/* DATE */}
                        <TextField
                            label="Quantity"
                            type="number"
                            fullWidth
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            margin="normal"
                            required
                            error={isSubmitted && !quantity}
                            helperText={isSubmitted && !quantity ? "Quantity is required" : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {itemType === "Liveweight" && " Kilos"}
                                        {itemType === "Dressed" && " Kilos"}
                                        {itemType === "Chicks" && " Heads"}
                                        {itemType === "Feeds: Starter" && " Sacks"}
                                        {itemType === "Feeds: Chick Booster" && " Sacks"}
                                        {itemType === "Vitamins: Atobe" && " Kilos"}
                                        {itemType === "Vitamins: Molases" && " Bottles"}
                                        {itemType === "Labor" && " Heads"}
                                        {itemType === "Water" && " Gallons"}
                                        {itemType === "Electricity" && " Kilowatts"}
                                        {itemType === "Gasoline" && " Liters"}
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    style: { appearance: 'textfield' },
                                },
                            }}
                            sx={{
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            }}
                        />
                    </div>

                    <div className='flex gap-4'>
                        {/* Item Type Select */}
                        <FormControl
                            label="Item Type"
                            fullWidth
                            margin="normal"
                            error={isSubmitted && !itemType} // Error handling for itemType
                        >
                            <InputLabel>Item Type</InputLabel>
                            <Select
                                value={itemType}
                                onChange={(e) => {
                                    setItemType(e.target.value);
                                    console.log("Selected Item Type:", e.target.value); // Debugging
                                }}
                                label="Item Type"
                                disabled={!transactionType} // Disable until a transactionType is selected
                            >
                                <MenuItem value="" disabled>Select Item Type</MenuItem>
                                {getItemTypeOptions().map((type, index) => (
                                    <MenuItem key={index} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                            {isSubmitted && !itemType && (
                                <FormHelperText style={{ color: 'red' }}>Item Type is required</FormHelperText>
                            )}
                        </FormControl>

                        <TextField
                            label="Price Per Unit"
                            type="number"
                            fullWidth
                            value={pricePerUnit}
                            onChange={(e) => setPricePerUnit(e.target.value)}
                            margin="normal"
                            onFocus={() => setIsPriceFocused(true)}
                            onBlur={() => setIsPriceFocused(false)}
                            required
                            error={isSubmitted && !pricePerUnit}
                            helperText={isSubmitted && !pricePerUnit ? "Price Per Unit is required" : ""}
                            InputProps={{
                                startAdornment: (pricePerUnit || isPriceFocused) && (
                                    <InputAdornment position="start">
                                        <img
                                            src={pesoIcon}
                                            alt="Peso Icon"
                                            style={{ width: '32px', height: '32px' }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {itemType === "Liveweight" && "Per Kilo"}
                                        {itemType === "Dressed" && "Per Kilo"}
                                        {itemType === "Chicks" && "Per Head"}
                                        {itemType === "Feeds: Starter" && "Per Sack"}
                                        {itemType === "Feeds: Chick Booster" && "Per Sack"}
                                        {itemType === "Vitamins: Atobe" && "Per Kilo"}
                                        {itemType === "Vitamins: Molases" && "Per Bottle"}
                                        {itemType === "Labor" && "Per Head"}
                                        {itemType === "Water" && "Per Gallon"}
                                        {itemType === "Electricity" && "Per Kilowatt"}
                                        {itemType === "Gasoline" && "Per Liter"}
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    style: { appearance: 'textfield' },
                                },
                            }}
                            sx={{
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            }}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <TextField
                            label="Contact Name"
                            fullWidth
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            margin="normal"
                        // error={isSubmitted && !contactName} 
                        // helperText={isSubmitted && !contactName ? "Contact Name is required" : ""}
                        />
                        <TextField
                            label="Total Cost"
                            type="number"
                            fullWidth
                            value={totalCost}
                            onClick={(e) => e.stopPropagation()}
                            margin="normal"
                            onFocus={() => setIsTotalCostFocused(true)}
                            onBlur={() => setIsTotalCostFocused(false)}
                            required
                            InputProps={{
                                readOnly: true,
                                startAdornment: (totalCost || isTotalCostFocused) && (
                                    <InputAdornment position="start">
                                        <img
                                            src={pesoIcon}
                                            alt="Peso Icon"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    style: { appearance: 'textfield' },
                                },
                            }}
                            sx={{
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            }}
                            error={isSubmitted && !totalCost}  // Apply red border when there's no total cost
                        />

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-3">
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            onClick={handleFormSubmit}
                            disabled={!transactionDate || !itemType || !quantity || !pricePerUnit || !transactionType || !itemType}
                            sx={{
                                width: '90px',
                                height: '45px',
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                handleClose();
                                setTransactionDate(null);

                                setQuantity('');
                                setPricePerUnit('');
                                setTotalCost('');
                                setContactName('');
                            }}
                            sx={{
                                width: '90px',
                                height: '45px',
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal >
    );
};

export default AddTransactionModal;
