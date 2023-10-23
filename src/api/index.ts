
export const getData = () => {
       return fetch("https://bgaa.by/test")
              .then((data) => {
                     if (data.ok) {
                            return data.json();
                     }
                     throw new Error("network is offline");
              });
}

export const postData = (body: any) => {
       const headers = {
              "Content-Type": "application/json",
       };
       return fetch("https://bgaa.by/test_result", {
              method: "POST",
              mode: "cors",
              body: JSON.stringify(body),
              headers,
       })
};