import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

export default function FormDialog(props) {
 const { open, handleClose, makeTable, modalRestaurant} = props 

 const [table, setTable] = useState({seats: 2, time: new Date('2014-08-18T21:11:54')});
//  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));


 const handleChange = (event) => {
   setTable({...table, seats: event.target.value});
 };

 const seatOptions = (n) => {
     let seatOptions = []
        for (let i = 0; i < n; i++) {
            seatOptions.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
        }
     return seatOptions
 }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3 },
            }}
        >
        <DialogTitle>Make Table for {modalRestaurant.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Select a Time and Table Size
          </DialogContentText>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <TimePicker
                label="Seat Time"
                value={table.time}
                onChange={(newValue) => {
                setTable({...table, time: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            <FormControl fullWidth>
                <InputLabel id="seat-input-label">Table Size</InputLabel>
                    <Select
                    labelId="seat-input-label"
                    id="seat-input"
                    value={table.seats}
                    label="Table Size"
                    onChange={handleChange}
                    size="small"
                    >
                        {seatOptions(10)}
                    </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => makeTable(e, modalRestaurant)}>Make Table</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}