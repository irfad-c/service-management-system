const SERVICE_API_URL = "http://localhost:5000/api/services";
const token = localStorage.getItem("token");

if (!token) {
  alert("Session expired. Please login again.");
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

  if (services.length === 0) {
    table.innerHTML = `<tr><td colspan="4">No services found</td></tr>`;
    return;
  }
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

// ADD or UPDATE SERVICE - This will run when we click the submit button

const serviceForm = document.getElementById("serviceForm");

if (serviceForm) {
  serviceForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("serviceId").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = Number(document.getElementById("price").value);

    if (price <= 0) {
      alert("Price must be a positive number");
      return;
    }

    const url = id ? `${SERVICE_API_URL}/${id}` : `${SERVICE_API_URL}`;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price }),
      });

      const data = await res.json();

      // 401 - Unauthorized
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Clears the hidden id.
      if (method === "PUT") {
        document.getElementById("serviceId").value = "";
      }

      e.target.reset();
      loadServices();
    } catch (error) {
      console.error(error);
      alert("Server not reachable. Please try again later.");
    }
  });
}

// EDIT
function editService(id, title, description, price) {
  document.getElementById("serviceId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
}

// DELETE
async function deleteService(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this service?",
  );
  if (!confirmDelete) return;

  try {
    await fetch(`${SERVICE_API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadServices();
  } catch (error) {
    alert("Failed to delete service");
  }
}

loadServices();
