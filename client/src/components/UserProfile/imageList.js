import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import Image from "./image";

// Importing actions/required methods
import { getImages } from "../../action/image";

import "./styles.css";

/* Component for the List of Images */
class ImageList extends React.Component {

    // image list state
    state = {
        image:""
    }

    render() {
        const { dashboard } = this.props;

        return (
            <React.Fragment>
                <Button
                    onClick={() => { this.setState({ image: dashboard.state.imageURL})}}
                    className="image-list__button app__horizontal-center"
                    variant="contained"
                >
                    Show Images
                </Button>

                <Image
                    key="image"
                    image={this.state.image}
                />

            </React.Fragment >
        );
    }
}

export default ImageList;
