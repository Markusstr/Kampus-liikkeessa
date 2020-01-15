import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
}));
  

const CreateRes = (props) => {
    const classes = useStyles();
    const open = props.open;
    const handleClose = props.handleClose;

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
            
        </Dialog>
      </div>)
};

export default CreateRes;