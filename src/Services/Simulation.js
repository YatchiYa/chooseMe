import axios from "axios";
import api_url from "Config/Api";

import build_path from "./common"

export default async function list_simulations(params) {
    const uri = build_path(api_url, "/simulation/list", params.user_id);
    return await axios.get(uri);
}

export async function insert_simulation(params) {
    const uri = build_path(api_url, "/simulation");
    return await axios.post(uri, params);
}

export async function get_results(params) {
    const uri = build_path(api_url, "/simulation");
    return await axios.post(uri, params);
}