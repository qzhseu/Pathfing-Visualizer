import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import "./styles.css";

class Image extends React.Component {
    render() {
        const { image} = this.props;
        return (
            <Card>
                <CardActionArea>

                    <CardMedia
                        className="image__card-media"
                        image={image}
                    />
                </CardActionArea>
            </Card>
        );
    }
}

export default Image;
