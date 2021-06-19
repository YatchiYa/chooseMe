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
export default async function quadratique(params) {
    const uri = build_path(api_url, "/sizing/quadratique");
    return await axios.get(uri,  {
        params: params
    });
}
export  async function genetique(params) {
    const uri = build_path(api_url, "/sizing/genetique");
    return await axios.get(uri,  {
        params: params
    });
}
export async function waitResult(params) {
    const uri = build_path(api_url, "/sizing/session");
    return await axios.get(uri, {params});
}
export async function getResults(params) {
    const uri = build_path(api_url, "/sizing/get_results");
    return await axios.get(uri, {params});
}
export async function getData(params) {
    const uri = build_path(api_url, "/sizing/get_input_file");
    return await axios.get(uri, {params});
}
