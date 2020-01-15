import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white",
    height: 70
  },
  tuki: {
    color: "black",
    position: "absolute",
    left: '50%',
    transform: 'translate(-50%)',
    top: 200,
  },
}));

export default function ButtonAppBar(props) {

  const classes = useStyles();
  const handlePage = props.handleCurrentPage;

  useEffect(() => {
    handlePage("support");
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.tuki} color="inherit" variant="h3" gutterBottom>
        Täällä ei ole mitään elä hättäile.
      </Typography>
    </div>
  );
}