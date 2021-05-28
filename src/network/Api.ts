export const fetchUsers = async (): Promise<any> => {
  return await new Promise((resolve) => {
    fetch("https://randomuser.me/api/?results=5")
      .then(async (response) => {
        if (response.ok)
          response.json().then((data) => {
            resolve(data);
            return data;
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
