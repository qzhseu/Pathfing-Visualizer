import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import './styles.css';


export default function GameRankItem(props) {
    const { GameRankItem } = props;
    const userLists=GameRankItem.curUserList;
    return (
        <Card >
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {"Round " + GameRankItem.round}
                    </Typography>

                    {userLists.map(user=>(
                        <div>
                            <Divider variant="inset" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img
                                            className='icon'
                                            src={user.imgURL}
                                        ></img>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.username} secondary={
                                    <div>
                                        <div>{"Score: " +user.score}</div>
                                        <div>{"Complete Time: " +user.time}</div>
                                    </div>
                                    } />
                            </ListItem>
                        </div>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
