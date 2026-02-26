const SERVICE_API_URL = "http://localhost:5000/api/services";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// FETCH SERVICES
async function loadServices() {
  const res = await fetch(`${SERVICE_API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const services = await res.json();
  const table = document.getElementById("serviceTable");
  table.innerHTML = "";

  services.forEach((service) => {
    table.innerHTML += `
      <tr>
        <td>${service.title}</td>
        <td>${service.description}</td>
        <td>${service.price}</td>
        <td>
          <button onclick="editService(${service.id}, '${service.title}', '${service.description}', ${service.price})">Edit</button>
          <button onclick="deleteService(${service.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ADD / UPDATE SERVICE - This will run when we click the submit button
document.getElementById("serviceForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("serviceId").value;
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = Number(document.getElementById("price").value);

  const url = id ? `${SERVICE_API_URL}/${id}` : `${SERVICE_API_URL}`;
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, price }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Something went wrong");
    return;
  }

  e.target.reset();
  loadServices();
});

// EDIT
function editService(id, title, description, price) {
  document.getElementById("serviceId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
}

// DELETE
async function deleteService(id) {
  await fetch(`${SERVICE_API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  loadServices();
}

loadServices();
