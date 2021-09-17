/*Objeto XMLHttpRequest*/

(() => {
  const xhr = new XMLHttpRequest();
  const $xhr = document.getElementById("xhr");
  const $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Nombre: ${el.name}--Mail: ${el.email}`;
        $fragment.appendChild($li);
      });

      $xhr.appendChild($fragment);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}:${message}`;
      console.log("error");
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

/*API FETCH*/

(() => {
  const $fetch = document.getElementById("fetch");
  const $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Nombre: ${el.name}--Mail: ${el.email}`;
        $fragment.appendChild($li);
      });

      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}:${message}`;
    })
    .finally(() =>
      console.log(
        "El finally se ejecuta independiente del resultado de la promesa fetch"
      )
    );
})();

/*API FETCH ASYNC*/
(() => {
  const $fetchAsync = document.getElementById("fetch-async");
  const $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Nombre: ${el.name}--Mail: ${el.email}`;
        $fragment.appendChild($li);
      });

      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}:${message}`;
    } finally {
    }
  }

  getData();
})();

/*AXIOS*/
(() => {
  const $axios = document.getElementById("axios");
  const $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      let json = res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Nombre: ${el.name}--Mail: ${el.email}`;
        $fragment.appendChild($li);
      });

      $axios.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.response.statusText || "Ocurrio un error";
      $axios.innerHTML = `Error ${err.response.status}:${message}`;
    })
    .finally(() => console.log("Se ejecuta indep. del resultado"));
})();

/*AXIOS ASYNC*/
(() => {
  const $axiosAsync = document.getElementById("axios-async");
  const $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      let json = await res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Nombre: ${el.name}--Mail: ${el.email}`;
        $fragment.appendChild($li);
      });

      $axiosAsync.appendChild($fragment);
    } catch (err) {
      let message = err.response.statusText || "Ocurrio un error";
      $axiosAsync.innerHTML = `Error ${err.response.status}:${message}`;
    }
  }
  getData();
})();
