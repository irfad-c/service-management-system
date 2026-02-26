import pool from "../config/db.js";

//Create service

export const createService = async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res
      .status(400)
      .json({ message: "title, description and price are required" });
  }

  await pool.query(
    "INSERT INTO services (title, description, price, user_id) VALUES (?, ?, ?, ?)",
    [title, description, price, req.user.id],
  );

  res.status(201).json({ message: "Service created" });
};

// Get Logged-in User’s Services

export const getServices = async (req, res) => {
  const [services] = await pool.query(
    "SELECT * FROM services WHERE user_id = ?",
    [req.user.id],
  );

  res.json(services);
};

// Update Service

export const updateService = async (req, res) => {
  const { title, description, price } = req.body;
  const serviceId = req.params.id;

  const [rows] = await pool.query(
    "SELECT * FROM services WHERE id = ? AND user_id = ?",
    [serviceId, req.user.id],
  );

  console.log("rows:", rows);

  if (!rows.length) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await pool.query(
    "UPDATE services SET title=?, description=?, price=? WHERE id=?",
    [title, description, price, serviceId],
  );

  res.json({ message: "Service updated" });
};

// Delete Service

export const deleteService = async (req, res) => {
  const serviceId = req.params.id;

  const [rows] = await pool.query(
    "SELECT id FROM services WHERE id = ? AND user_id = ?",
    [serviceId, req.user.id],
  );

  if (!rows.length) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await pool.query("DELETE FROM services WHERE id = ?", [serviceId]);

  res.json({ message: "Service deleted" });
};
