import axios from "axios";

const baseUrl: string = "http://localhost:8000";

export async function getGroups() {
    const response = await axios.get(`${baseUrl}/group`);
    return response.data;
}

export async function getItems() {
    const response = await axios.get(`${baseUrl}/item`);
    return response.data;
}

export async function createGroup(group: any) {
    const response = await axios.post(`${baseUrl}/group`, group);
    return response.data;
}

export async function createItem(item: any) {
    const response = await axios.post(`${baseUrl}/item`, item);
    return response.data;
}

export async function updateItem(item: any) {
    const response = await axios.put(`${baseUrl}/item/` + item.id, item);
    return response.data;
}

export async function deleteItem(id: string) {
    return await axios.delete(`${baseUrl}/item/` + id, {
        headers: {
            'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        }
    });
}