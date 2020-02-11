import React, {useState, useEffect} from 'react';
import './profile.css';
import { List, ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Profile = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!loading) {
            return undefined;
        }

        async function fetchData() {
            const bodyData = {
                location: "Monitoimisali"
            }
            try {
                let response = await fetch('http://localhost:8080/api/getReservations', {
                    method: 'post',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify(bodyData)
                });
                response = await response.json();
                let parsedResponse = response.map(elem => ({
                    name: elem.name,
                    start: new Date(elem.start),
                    end: new Date(elem.end),
                    location: elem.location,
                    info: elem.info,
                    id: elem._id
                }));
                parsedResponse.sort((a,b)=>a.start.getTime()-b.start.getTime());
                setData(parsedResponse);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [loading]);


    return (
        <div className="page-wrapper">
            <div className="profile">
                Profiili
            </div>
            <div className="list">
                Omat varaukset:
                {data.map(elem =>
                <div key={elem.id}>
                    <List>
                        <ListItem button>
                            <ListItemText
                                primary={elem.info}
                                secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary">
                                    {elem.location}
                                </Typography>
                                {" — " + elem.start.getDate()}.{elem.start.getMonth()+1}.{elem.start.getFullYear()} klo {elem.start.getHours()}:
                                {elem.start.getMinutes() < 10 ? String(0) + String(elem.start.getMinutes()) : elem.start.getMinutes()} - {elem.end.getHours()}:
                                {elem.end.getMinutes() < 10 ? String(0) + String(elem.end.getMinutes()) : elem.end.getMinutes()}
                                </React.Fragment>
                                }
                                />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Divider />
                </div>
                )}
                

            </div>
        </div>
    );
}

export default Profile;