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
export default async function getAllFamilies() {
    const uri = build_path(api_url, "/list_family");
    return await axios.get(uri);
}
export async function getSubFamilies(params) {
    const uri = build_path(api_url, "/sub_family");
    return await axios.get(uri,{params});
}
export async function possibleValues(params) {
    const uri = build_path(api_url, "/possible_values");
    return await axios.post(uri,params);
}

export async function predictionOneShot(params) {
    const uri = build_path(api_url, "/prediction_async");
    return await axios.post(uri,params);
}
export async function checkResult(params) {
    const uri = build_path(api_url, '/check_result');
    return await axios.get(uri,{params});
}
export async function download_file(params) {
    const uri = build_path(api_url, '/check_result');
    return await axios.get(uri,{params});
}
export async function upload(params) {
    const uri = build_path(api_url, "/upload");
    return await axios.post(uri, params,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export async function predictionManyShop(params) {
    const uri = build_path(api_url, "/prediction_batch_async");
    return await axios.post(uri, {params});
}

