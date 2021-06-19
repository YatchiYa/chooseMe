import axios from "axios";
import api_url from "Config/Api";

const build_path = (...args) => {
    return args
        .map((part, i) => {
            if (i === 0) {
                return part.trim().replace(/[\/]*$/g, "");
            } else {
                return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
            }
        })
        .filter((x) => x.length)
        .join("/");
};
export default async function predictionTaillant(params) {
    const uri = build_path(api_url, "/design/sizing_system/pred_mensuration");
    return await axios.post(uri, params);
}

export async function predictionMorpho(params) {
    const uri = build_path(api_url, "/design/sizing_system/pred_morpho");
    return await axios.post(uri, params);
}
export async function predictionMensurationMorpho(params) {
    const uri = build_path(api_url, "/design/sizing_system/pred_mensuration_morpho");
    return await axios.post(uri, params,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export async function listFilesFromStrorage(params) {
    const uri = build_path(api_url, "/commun/list_files");
    return await axios.get(uri,  {
        params: params
    });
}
export async function downloadFilesFromStorage(params) {
    const uri = build_path(api_url, "/commun/download");
    return await axios.get(uri,  {
        responseType: 'blob',
        params: params
    });
}
export async function DeleteFileFromStorage(params) {
    const uri = build_path(api_url, "/commun/delete");
    return await axios.get(uri,  {
        params: params
    });
}