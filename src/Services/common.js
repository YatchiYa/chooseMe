export default function build_path(...args) {
    return args
        .map((part, i) => {
            if (i === 0) {
                //return part.toString().trim().replace(/[\/]*$/g, "");
                return part.toString().trim().replace(/[/]*$/g, "");
            } else {
                //return part.toString().trim().replace(/(^[\/]*|[\/]*$)/g, "");
                return part.toString().trim().replace(/(^[/]*|[/]*$)/g, "");
            }
        })
        .filter((x) => x.length)
        .join("/");
};

