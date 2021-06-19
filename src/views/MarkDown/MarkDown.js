
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Button from "components/CustomButtons/Button";
//import { useSnackbar } from 'notistack';
import { Button as Button1, Grid, Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
//import {DeleteFileFromStorage, downloadFilesFromStorage, listFilesFromStrorage} from "../services";
import SweetAlert from "react-bootstrap-sweetalert";
import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { deepPurple } from '@material-ui/core/colors';

import list_projects, { delete_project } from "Services/Project"
const useStyles = makeStyles((theme) => ({
    ...styles,
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

function MarkDown(props) {
    const classes = useStyles();
    //const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [alert, setAlert] = React.useState(null);
    const [projects, setProjects] = React.useState([]);

    const columns = [

        {
            name: "name",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="center" >
                            <Avatar className={classes.purple}>P</Avatar>
                            {/*<Button1 href="#text-buttons" color="primary" href={"/admin/markdown/project_details/" + value}>
                                {value}
                            </Button1>
                            */}
                            <Button1 color="primary" href={"/admin/markdown/project_details/" + value}>
                                {value}
                            </Button1>

                        </Grid>
                    );

                }
            },
        },

        {
            name: 'country', options: {
                customBodyRender: (value) => value.code
            },
        },
        {
            name: 'op_type', label: 'operation type'

        },
        { name: 'start_date', label: 'Start date' },
        { name: 'end_date', label: 'End date' },
        { name: 'last_updated', label: 'Last updated' },
        { name: 'created', label: 'Created' },


        {

            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,

                //setCellProps: () => ({ style: {display: 'flex', justifyContent: 'right'}}),
                // setCellHeaderProps: () => ({ style: {display: 'flex', justifyContent: 'right', flexDirection: 'row-reverse'}}),
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="center" >
                            <Tooltip title={"add simulation"}>
                                <Button justIcon round color="success" onClick={() => {
                                    history.push("/admin/markdown/" + projects[dataIndex].id + "/add_simulation")
                                }}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title={"edit project"}>
                                <Button justIcon round color="info" onClick={() => {
                                    history.push("/admin/markdown/update_project/" + projects[dataIndex].id)
                                }}>
                                    <EditIcon />
                                </Button>
                            </Tooltip>

                            <Tooltip title={"delete project"}>
                                <Button justIcon round color="danger" onClick={() => { warningWithConfirmAndCancelMessage(dataIndex) }}>
                                    <DeleteIcon />
                                </Button>
                            </Tooltip>

                        </Grid>
                    );
                },
            },
        },
    ];


    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        selectableRows: "none",
        onColumnSortChange: (changedColumn, direction) =>
            console.log("changedColumn: ", changedColumn, "direction: ", direction),
        onChangeRowsPerPage: (numberOfRows) =>
            console.log("numberOfRows: ", numberOfRows),
        onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
        customToolbar: () => {
            return (
                <Tooltip title={"add new project"}>
                    <IconButton href={"/admin/markdown/add_project"}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    };
    useEffect(() => {
        listProjects()
    }, []);
    const warningWithConfirmAndCancelMessage = (index) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => deleteProject(index)}
                onCancel={() => cancelDetele()}
                confirmBtnCssClass={classes.button + " " + classes.success}
                cancelBtnCssClass={classes.button + " " + classes.danger}
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
                You will not be able to recover this imaginary file!
            </SweetAlert>
        );
    };

    const deleteProject = (index) => {
        delete_project({ project_id: projects[index].id }).then(res => {

            successDelete()

            setProjects(state => {
                state.splice(index, 1)
                return state
            })
        }).catch(err => {
            console.error(err)


        })
    }
    const successDelete = () => {
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Deleted!"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={classes.button + " " + classes.success}
            >
                Your imaginary file has been deleted.
            </SweetAlert>
        );
    };
    const cancelDetele = () => {
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Cancelled"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={classes.button + " " + classes.success}
            >
                Your imaginary file is safe :)
            </SweetAlert>
        );
    };
    const hideAlert = () => {
        setAlert(null);
    };


    const listProjects = () => {
        list_projects({ user_id: "1" }).then((res) => {

            setProjects(res.data);
        }).catch((err) => {
            console.error(err)
        })

    }
    //const download = (index) => {
        // downloadFilesFromStorage({name: state.data[index].name}).then(res => {
        //     FileDownload(res.data, state.data[index].file_name);
        //     props.enqueueSnackbar('file downloaded successfully', {
        //         variant: "success",
        //     });
        // }).catch(err => {
        //     console.error(err)
        //     props.enqueueSnackbar('error downloading file', {
        //         variant: "error",
        //     });
        // })
    //}


    return (
        <GridContainer justify="center" spacing={5}>
            {alert}
            <GridItem xs={12} sm={11}>

                <MUIDataTable
                    title={"Projects List"}
                    data={projects}
                    columns={columns}
                    options={options}
                />
            </GridItem>
        </GridContainer>
    );
}
const mapStateToProps = (state, props) => ({ ...state, ...props });

export default connect(mapStateToProps)(MarkDown);

