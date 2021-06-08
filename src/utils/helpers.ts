export const validate = (source: string, destination: any, data: any) => {
    if (data.lists[source].restricted.includes(destination)) return false;
    return true;
};
