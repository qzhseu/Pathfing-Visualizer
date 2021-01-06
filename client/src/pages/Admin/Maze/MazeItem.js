import React, {useState }from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmbededGridBoard from "../../../components/GridBoard/EmbededGridBoard/embededGridBoard.js";
import {stringToMaze, clearMaze} from "../../../action/editMaze.js"
import ConfirmDialog from "../../../components/ConfirmDialog/index";
import './styles.css';
import { Link } from 'react-router-dom';

export default function MazeItem(props) {
    const {mazeItem, mazePage, history }=props;

    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle: ''})

    const grid= stringToMaze(mazeItem.encodedMaze, mazeItem.startNode, mazeItem.endNode, false)

    return (
        <>
        <ConfirmDialog 
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
        />
        <Card className="Card_Maze_Item">
            <CardActionArea>
                <EmbededGridBoard 
                    grid={grid} 
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {"Round"+mazeItem.round}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"Created Time : "+ mazeItem.createdTime}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"Modified Time : "+ mazeItem.modifiedTime}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={`/admin/editmaze/${mazeItem.round}`}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={()=>{
                        setConfirmDialog({
                            isOpen:true,
                            title: 'Are you sure to clear this maze?',
                            subTitle: "This is an irreversible operation. If you clear this round, this maze will be cleared and all users' scores at this round will also be cleared!",
                            onConfirm:()=>{clearMaze(mazePage, mazeItem.round)},
                            onCancle:()=>{setConfirmDialog({...confirmDialog, isOpen:false})},
                        }) 
                    }}>
                   Clear
                </Button>
            </CardActions>
        </Card>
        </>
    )
}
    