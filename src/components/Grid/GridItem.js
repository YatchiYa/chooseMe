import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components

import Grid from "@material-ui/core/Grid";

export default function GridItem(props) {
    const {children, className, ...rest} = props;
    return (
        <Grid item {...rest} className={className}>
            {children}
        </Grid>
    );
}

GridItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};
