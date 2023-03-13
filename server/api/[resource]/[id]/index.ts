function convert(value: any, values: string[]) {
    if(value.startsWith('$')) {
        return values[Number(value.substring(1))]
    } else {
        return value
    }
}

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    const type = "fuse"

    const debug = false

    const res: any = {
        //type,
        //debug
    }

    if (type === "fuse" && !debug) {

        let data2 = {}

        const data_: any = await import(`../../../data/index_map.json`);
        data2 = data_.default;
        

        // const data2: any = {}

        /*

        const data = data2.mappings

        const keys = data2.keys

        const values = data2.values

        //res.total = data.length

        // let flg = true

        if(data[id]) {
            const item: any = {}

            const obj = data[id]

            for(const key in obj){
                const key_label = keys[Number(key)]
                const value = obj[key]
                if(typeof value === 'object') {
                    const item_values = []
                    for(const v of value) {
                        item_values.push(convert(v, values))
                    }
                    item[key_label] = item_values
                } else {
                    item[key_label] = convert(value, values)
                }
            }

            return item
        }

        */

        return data2[id]
        
        /*

        return {}

        */

        /*
        for(const item of data) {
            if (String(item._id) === id) {
                return item
            }

            if(flg) {
                flg = false
            }
        }
        */
    } else {
        //res.total = -1
    }

    //res["message"] = "Not Found"

    return res
})