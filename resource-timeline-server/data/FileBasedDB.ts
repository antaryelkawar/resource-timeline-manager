import { JsonDB, Config } from 'node-json-db';

interface FileBasedDBProps {
    type: string
}

export class FileBasedDB {

    db: JsonDB;

    constructor(props: FileBasedDBProps) {
        this.db = new JsonDB(new Config("temp/" + props.type, true, false, '/', true));
    }

    async get(id?: string) {

        if(id != undefined) {
            return this.db.getData("/" + id);
        }

        const data = await this.db.getData("/");
        return Object.values(data);
    }

    put(id: string, obj: object) {
        this.db.push("/" + id, obj)
    }

    delete(id: string) {
        this.db.delete("/" + id)
    }

}
