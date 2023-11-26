import React, { useEffect, useRef, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  productSelectors,
  getProductsByCategory,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../redux/slice/product";
import {
  productCategoriesSelectors,
  getProductCategories,
  deleteProductCategories,
  updateProductCategories,
} from "../../redux/slice/product-categories";
import Modify from "../../components/atoms/button/modify/modify-product-categories";
import ModifyProduct from "../../components/atoms/button/modify/modify-product";

const Product = () => {
  const gridStyle = { minHeight: 200 };

  const columnProducts = [
    {
      name: "product_identity",
      header: "Product Identity",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "product_name",
      header: "Product Name",
      minWidth: 50,
      defaultFlex: 2,
    },
    { name: "price", header: "Price", maxWidth: 1000, defaultFlex: 1 },
    { name: "unit", header: "Unit", maxWidth: 1000, defaultFlex: 1 },
    { name: "desc", header: "Desc", maxWidth: 1000, defaultFlex: 1 },
  ];
  const columnProductCategories = [
    {
      name: "product_category_name",
      header: "Product Category Name",
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: "desc",
      header: "Desc",
      maxWidth: 1000,
      defaultFlex: 1,
    },
  ];
  const dispatch = useDispatch();
  const productCategories = useSelector(productCategoriesSelectors.selectAll);
  const products = useSelector(productSelectors.selectAll);
  console.log("pppan", products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProductCategories, setFilteredProductCategories] = useState(
    []
  );
  const [enableSelection, setEnableSelection] = useState(true);
  const [enableSelectionProduct, setEnableSelectionProduct] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchTextProduct, setSearchTextProduct] = useState("");
  const gridRef = useRef(null);
  const [trigger, setTrigger] = useState(false);
  const [triggerProduct, setTriggerProduct] = useState(false);

  // search categori list
  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current?.visibleColumns || [];

    setSearchText(value);

    const newDataSource = productCategories.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
      }, false);
    });

    // Update the local state with the filtered data
    dispatch(getProductCategories(newDataSource));
  };

  // search list product
  const onSearchChangeProduct = ({ target: { value } }) => {
    const visibleColumns = gridRef.current?.visibleColumns || [];

    setSearchTextProduct(value);

    const newDataSource = products.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
      }, false);
    });

    // Update the local state with the filtered data
    dispatch(getProductsByCategory(newDataSource));
  };

  const handleCategoryRowClick = (row) => {
    setSelectedCategory(row);
    setFilteredProducts([]);
  };

  const handleCategoryRowClickProduct = (row) => {
    setSelectedProduct(row);
  };
  // product categories=====================
  const handleDelete = () => {
    dispatch(deleteProductCategories(selectedCategory?.data?.id))
      .then(() => {
        console.log("Deletion success"); // Set the flag after deletion
        dispatch(getProductsByCategory(selectedCategory?.data?.id));
        setSelectedCategory(undefined);
        setEnableSelection(false);
      })
      .catch((error) => {
        console.log("Deletion error:", error);
      });
  };
  const handleUpdate = async (formData, selectedCategoryId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateProductCategories({
        id: selectedCategoryId,
        formData,
        config,
      })
    ).then(() => {
      console.log("Product category updated!");
      dispatch(getProductCategories());
      setEnableSelection(false);
      // dispatch(getProductsByCategory());
    });
  };

  // product=================================
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(selectedProduct?.data?.id))
      .then(() => {
        console.log("Deletion success"); // Set the flag after deletion
        dispatch(getProductsByCategory(selectedCategory?.data?.id));
        setSelectedProduct(undefined);
        setEnableSelectionProduct(false);
      })
      .catch((error) => {
        console.log("Deletion error:", error);
      });
  };
  const handleUpdateProduct = async (formData, selectedProductId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateProduct({
        id: selectedProductId,
        formData,
        config,
      })
    ).then(() => {
      console.log("Product category updated!");
      dispatch(getProductsByCategory(selectedCategory?.data?.id));
      setSelectedProduct(undefined);
      setEnableSelectionProduct(false);
    });
  };

  // Fetch product categories
  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  // Fetch products by category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsByCategory(selectedCategory?.data?.id));
    }
  }, [dispatch, selectedCategory]);

  // Update filtered products when products or selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const productsForCategory = products.filter(
        (product) => product.IDCategoryProduct === selectedCategory.id
      );
      const filteredProducts = productsForCategory.filter((p) => {
        const values = Object.values(p).map((value) =>
          (value + "").toLowerCase()
        );
        return values.some((v) => v.includes(searchTextProduct.toLowerCase()));
      });
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]); // Reset filtered products when no category is selected
    }
  }, [selectedCategory, products, searchTextProduct]);

  useEffect(() => {
    const filteredCategories = productCategories.filter((p) => {
      const values = Object.values(p).map((value) =>
        (value + "").toLowerCase()
      );
      return values.some((v) => v.includes(searchText.toLowerCase()));
    });
    setFilteredProductCategories(filteredCategories);
  }, [productCategories, searchText]);

  return (
    <>
      <div>
        <div className="border-b border-gray-200 mb-6 uppercase text-sm font-bold py-3">
          <h2>Product</h2>
        </div>
        {/* Product Categories Table */}
        <div className="mb-10">
          <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
            <h3>Category List</h3>
            <input
              type="text"
              className="border rounded py-2 px-1"
              placeholder="Cari data..."
              value={searchText}
              onChange={onSearchChange}
            />
          </div>
          <div className="relative hover:z-50">
            <ReactDataGrid
              idProperty="id"
              columns={columnProductCategories}
              dataSource={filteredProductCategories ?? []}
              style={gridStyle}
              pagination
              onRowClick={handleCategoryRowClick}
              enableSelection={enableSelection}
            />
          </div>
          <div>
            <Modify
              trigger={trigger}
              setTrigger={setTrigger}
              selectedCategory={selectedCategory?.data}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>

        {/* Filtered Products Table */}
        <div>
          <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
            <h3>Product List</h3>
            <input
              type="text"
              className="border rounded py-2 px-1"
              placeholder="Cari data..."
              value={searchTextProduct}
              onChange={onSearchChangeProduct}
            />
          </div>
          <div className="relative hover:z-50">
            <ReactDataGrid
              idProperty="id"
              columns={columnProducts}
              dataSource={filteredProducts ?? []}
              style={gridStyle}
              pagination
              onRowClick={handleCategoryRowClickProduct}
              enableSelection={enableSelectionProduct}
            />
          </div>
          <div>
            <ModifyProduct
              triggerProduct={triggerProduct}
              setTriggerProduct={setTriggerProduct}
              selectedCategory={selectedCategory?.data}
              selectedProduct={selectedProduct?.data}
              handleDelete={handleDeleteProduct}
              handleUpdate={handleUpdateProduct}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
