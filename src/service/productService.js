import axios from "axios";

const API_URL = "https://fakestoreapi.com";

const getProducts = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL + "/products?limit=10")
      .then((res) => {
        // console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getProductById = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL + "/products/" + id)
      .then((res) => {
        // console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getProducts, getProductById };

// const baseUrl = "https://reqres.in";

// // Passing configuration object to axios
// axios({
//   method: "get",
//   url: `${baseUrl}/api/users/1`,
// }).then((response) => {
//   // console.log(response.data);
// });

// // Invoking the get method to perform a GET request

// axios.get(`${baseUrl}/api/users/1`).then((response) => {
//   // console.log(response.data);
// });

// //async await method
// const fetchUsers = async () => {
//   const configurationObject = {
//     method: "get",
//     url: `${baseUrl}/api/users/1`,
//   };
//   const response = await axios(configurationObject);
//   // console.log(response.data);
// };

// // Invoking get method to perform a GET request
// const fetchUser = async () => {
//   const url = `${baseUrl}/api/users/1`;
//   const response = await axios.get(url);
//   // console.log(response.data);
// };

// const concurrentRequests = [
//   axios.get(`${baseUrl}/api/users/1`),
//   axios.get(`${baseUrl}/api/users/2`),
//   axios.get(`${baseUrl}/api/users/3`),
// ];

// promises
//   .all(concurrentRequests)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //using promise .allSettled() method to handle errors for concurrent requests
// const concurrentRequests1 = [
//   axios.get(`${baseUrl}/api/users/1`),
//   axios.get(`${baseUrl}/api/users/2`),
//   axios.get(`${baseUrl}/api/users/3`),
// ];

// promises
//   .allSettled(concurrentRequests1)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
