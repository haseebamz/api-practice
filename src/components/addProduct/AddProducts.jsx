import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";

import ProductValidation from "../validations/ProductValidation";

function AddProducts({ onClose }) {
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (
    values,
    { resetForm, setFieldValue, setSubmitting }
  ) => {
    let imageURL = values.image ? URL.createObjectURL(values.image) : "";

    let payLoad = {
      id: values.id,
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      image: imageURL,
    };

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        payLoad,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
      resetForm();
      setPreview(null);
      setFieldValue("image", null);
    }
  };

  const initialValues = {
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add New Product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ProductValidation}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field
                type="number"
                name="id"
                placeholder="Product ID"
                className="form-control mb-2"
              />
              <ErrorMessage
                name="id"
                component="div"
                className="text-danger small"
              />
              <Field
                type="text"
                placeholder="Product Name"
                name="title"
                className="form-control mb-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger small"
              />
              <Field
                type="number"
                placeholder="Price"
                className="form-control mb-2"
                name="price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-danger small"
              ></ErrorMessage>
              <Field
                as="textarea"
                placeholder="Description"
                name="description"
                className="form-control mb-2"
              ></Field>
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger small"
              ></ErrorMessage>
              <Field
                className="form-control mb-2"
                placeholder="Add Category"
                name="category"
              ></Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger small"
              ></ErrorMessage>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("image", file);

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt={preview}
                  style={{ width: "150px", marginTop: "10px" }}
                />
              )}
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button className="btn btn-secondary " onClick={onClose}>
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddProducts;
