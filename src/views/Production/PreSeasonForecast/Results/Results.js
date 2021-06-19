import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Button from "../../../../components/CustomButtons/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import {DeleteFileFromStorage, downloadFilesFromStorage, listFilesFromStrorage} from "../../../Design/CusomerKnowledge/services";
import FileDownload from 'js-file-download';
import {withSnackbar} from "notistack";
import SweetAlert from "react-bootstrap-sweetalert";
import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(styles);

function Results(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        data: [],

    });
    const [alert, setAlert] = React.useState(null);

    const columns = [
        {
            name: "date",
            options: {
                filter: true,
            },
        },
        {
            label: "file name",
            name: "file name",
            options: {
                filter: true,
            },
        },
        {
            name: "google storage file path",
            options: {
                filter: false,
            },
        },

        {
            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <div style={{width: 100}}>
                            <Button justIcon round color="success" onClick={() => {
                                download(dataIndex)
                            }}>
                                <CloudDownloadIcon/>
                            </Button>
                            <Button justIcon round color="danger" onClick={() => {
                                warningWithConfirmAndCancelMessage(dataIndex)
                            }}>
                                <DeleteIcon/>
                            </Button>
                        </div>
                    );
                },
            },
        },
    ];


    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        onColumnSortChange: (changedColumn, direction) =>
            console.log("changedColumn: ", changedColumn, "direction: ", direction),
        onChangeRowsPerPage: (numberOfRows) =>
            console.log("numberOfRows: ", numberOfRows),
        onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
    };
    useEffect(() => {
        getResults()
    }, []);
    const warningWithConfirmAndCancelMessage = (index) => {
        setAlert(
            <SweetAlert
                warning
                style={{display: "block", marginTop: "-100px"}}
                title="Are you sure?"
                onConfirm={() => deleteFile(index)}
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
    const deleteFile = (index) => {
        DeleteFileFromStorage({name: state.data[index].name}).then(res => {

            successDelete()

            setState(state => {
                state.data.splice(index, 1)
                return state
            })
        }).catch(err => {
            console.error(err)
            props.enqueueSnackbar('error deleting file', {
                variant: "error",
            });

        })
    }
    const successDelete = () => {
        setAlert(
            <SweetAlert
                success
                style={{display: "block", marginTop: "-100px"}}
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
                style={{display: "block", marginTop: "-100px"}}
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

    const getResults = () => {
        listFilesFromStrorage({folder: "output/previnit/result"}).then(res => {
            setState({...state, data: res.data})

        }).catch(err => {
            console.error(err)
            props.enqueueSnackbar('error fetching result', {
                variant: "error",
            });
        })
    }
    const download = (index) => {
        downloadFilesFromStorage({name: state.data[index].name}).then(res => {
            FileDownload(res.data,  parseFileName(state.data[index].gs_filepath)+"_"+state.data[index].file_name);
            props.enqueueSnackbar('file downloaded successfully', {
                variant: "success",
            });
        }).catch(err => {
            console.error(err)
            props.enqueueSnackbar('error downloading file', {
                variant: "error",
            });
        })
    }
    const parseFileName = (path) =>{
        const d = path.split("/")
        return d[d.length-2]
    }


    return (
        <GridContainer justify="center" spacing={3}>
            {alert}
            <GridItem xs={12} sm={11}>

                <MUIDataTable
                    title={"Results files"}
                    data={state.data.map(v => [v.date, parseFileName(v.gs_filepath), v.gs_filepath])}
                    columns={columns}
                    options={options}
                />
            </GridItem>
        </GridContainer>
    );
}

export default withSnackbar(Results);
