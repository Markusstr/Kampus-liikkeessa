import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white",
    height: 70
  }
}));

export default function ButtonAppBar(props) {

  const classes = useStyles();
  const handlePage = props.handleCurrentPage;

  useEffect(() => {
    handlePage("support");
  }, []);

  return (
    <div className={classes.root}>
    </div>
  );
}