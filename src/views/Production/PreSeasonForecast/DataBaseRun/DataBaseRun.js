import React, {useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CardBody from "../../../../components/Card/CardBody";
import {withSnackbar} from "notistack";
import {checkResult, predictionManyShop, upload} from "../services";
import LinearProgress from "@material-ui/core/LinearProgress";

function DataBaseRun(props) {
    const [file,setFile] = useState("")
    const [error,setError] = useState("")
    const [runName,setRunName] = useState(null)
    const [loading,setLoading] = useState(null)
    const validate = () => {
        if (error !== "success"){
            props.enqueueSnackbar('Run Name is required', {
                variant: "warning",
            });
            return false
        }else if (!file){
            props.enqueueSnackbar('Select file before launch simulation', {
                variant: "warning",
            });
            return false
        }
        return true
    }
    const submit = async () => {
        if(validate()){
            const formData = new FormData();
            formData.append('file', file)
            formData.append('run_name', runName)

            try {
                const res = await upload(formData)
                props.enqueueSnackbar('file uploaded successfully', {
                    variant: "success",
                });
                await getResults(res.data.run_id)
                props.enqueueSnackbar('prediction launched successfully', {
                    variant: "success",
                });
                console.log(res)
            }catch (e) {
                console.error(e)
                props.enqueueSnackbar('error when uploading file', {
                    variant: "error",
                });
            }
        }
    }
    const sleep = m => new Promise(r => setTimeout(r, m))
    const getResults = async (run_id,retry=10) =>{
        const params = {
            run_id: run_id,
            run_name: runName,
            mode_batch: true,
            mode_rc: true,
            learn: false,
        }
        let goON=true
        let res={}
        let i=1
        setLoading(true)
        while (goON) {
            try {
                res = await predictionManyShop(params)
                console.log(res.data)
                goON=!res.data.success
                await sleep(5000)

            } catch (err) {
                props.enqueueSnackbar('error when fetching results', {
                    variant: "error",
                });
                goON=false
                setLoading(false)
            }

            if(i>=retry){
                goON=false;
                props.enqueueSnackbar('fetching results takes a long time', {
                    variant: "warning",
                });
            }
            i++;
        }
        console.log(res)
        setLoading(false)
    }
    return (
        <GridContainer spacing={3} justify="center">
            <GridItem xs={12} sm={10}>
                <CustomInput
                    labelText="Run Name"
                    id="runname"
                    success={error === "success"}
                    error={error === "error"}
                    helperText={error === "error" && "field required"}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    inputProps={{
                        onChange: (event) => {
                            setRunName(event.target.value)
                            setError("success")
                        },
                        onBlur: (event) => {
                            if (runName) setError("success"); else setError("error")
                        },
                        required: true,
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={10}>
                <DropzoneArea
                    onChange={(files) => {
                        if(files.length) setFile(files[0])
                    }}
                    filesLimit={1}
                    previewGridProps={{
                        container: {
                            justify: "center",
                            spacing: 3,
                        },
                    }}
                    showFileNames
                    acceptedFiles={[
                        "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    ]}
                />
            </GridItem>

            <GridItem xs={12} sm={10}>
                <Button color="success" round onClick={submit}>
                    Launch Simulation
                </Button>
                <Button round>Reset</Button>
            </GridItem>
            {loading && <GridItem xs={12} sm={10} md={10}>
                <LinearProgress />
            </GridItem>}
        </GridContainer>
    );
}
export default withSnackbar(DataBaseRun);