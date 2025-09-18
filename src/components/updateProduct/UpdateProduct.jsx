import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ProductValidation from "../validations/ProductValidation";
import axios from "axios";

function UpdateProduct({ onClose, product }) {
  const [preview, setPreview] = useState(null);

  const initialValues = {
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  };

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    // let imageURL =  URL.createObjectURL(values.image);

    let imageURL;
    if (values.image instanceof File) {
      imageURL = URL.createObjectURL(values.image);
    } else {
      imageURL = values.image; // already a string (existing image)
    }

    let payLoad = {
      id: product.id,
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      image: imageURL,
    };

    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${product.id}`,
        payLoad,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data, "Product has been updated" );
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
      //   resetForm();
      //   setPreview(null);
      //   setFieldValue("image", null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {product.id}
        <Formik
          initialValues={initialValues}
          validationSchema={ProductValidation}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field name="title" className="form-control mb-2"></Field>
              <ErrorMessage
                component="div"
                name="title"
                className="text-danger small"
              ></ErrorMessage>
              <Field name="price" type="number" className="form-control mb-2"></Field>
              <ErrorMessage
                component="div"
                name="price"
                className="text-danger small"
              ></ErrorMessage>
              <Field
                as="textarea"
                name="description"
                className="form-control mb-2"
              ></Field>
              <ErrorMessage
                component="div"
                name="description"
                className="text-danger small"
              ></ErrorMessage>
              <Field name="category" className="form-control mb-2"></Field>
              <ErrorMessage
                component="div"
                name="category"
                className="text-danger small"
              ></ErrorMessage>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("image", file);

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              <img
                src={preview ? preview : product.image}
                alt=""
                width={50}
                height={50}
              />
              <div className="d-flex justify-content-between" >
              <button type="submit" className="btn btn-success" > Save </button>
               <button onClick={onClose} className="btn btn-secondary" >Close</button>
               </div>
            </Form>
          )}
        </Formik>

       
      </div>
    </div>
  );
}

export default UpdateProduct;
