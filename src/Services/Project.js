import axios from "axios";
import api_url from "Config/Api";

import build_path from "./common"

export default async function list_projects(params) {
    const uri = build_path(api_url, "/project/list", params.user_id);
    return await axios.get(uri);
}
export async function get_project(params) {
    const uri = build_path(api_url, "/project", params.project_id);
    return await axios.get(uri, { params });
}
export async function insert_project(params) {
    const uri = build_path(api_url, "/project");
    return await axios.post(uri, params);
}

export async function update_project(params) {
    const uri = build_path(api_url, "/project", params.id);
    return await axios.put(uri, params);
}

export async function delete_project(params) {
    const uri = build_path(api_url, '/project', params.project_id + "");
    return await axios.delete(uri);
}

export async function upload_univer(params) {
    const uri = build_path(api_url, "/univers");
    return await axios.post(uri, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


// delete phase

export async function delete_phase(params) {
    const uri = build_path(api_url, '/phase', params.phase_id + "");
    return await axios.delete(uri);
}
