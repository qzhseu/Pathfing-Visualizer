import React from "react";
import { DialogContent } from '@material-ui/core';
// Importing components

import ImageList from "./imageList";
import ImageForm from "./imageForm";

class Dashboard extends React.Component {

    render() {
        const { dashboardPage } = this.props
        return (
            <div className="App">
                {/* Header component with text props. */}
                <DialogContent className="dialogContent">
                    <h3>Change Profile Photo</h3>
                </DialogContent>
                {/* Image Upload Form */}
                <ImageForm dashboard={dashboardPage} />

                {/* Images List */}
                <ImageList dashboard={dashboardPage} />
            </div>
        );
    }
}

export default Dashboard;
