import * as Yup from "yup";

 const ProductValidation = Yup.object().shape({
    id: Yup.number()
      .integer("ID must be an integer")
      .positive("ID must be positive")
      // .required("ID is required")
      ,
    title: Yup.string().required("Name is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    // image: Yup.mixed().required("Please attach image")
  });


  export default ProductValidation;
