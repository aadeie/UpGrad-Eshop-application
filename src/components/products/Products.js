import { useEffect, useState } from "react";

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Navbar
from "../navbar/Navbar";

import ProductCard
from "../productCard/ProductCard";

import api from "../../common/api";

import "./Products.css";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("ALL");

  const [sort, setSort] =
    useState("default");

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts = async () => {

    try {

      const response =
        await api.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const categories = [
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "ALL"
          ? true
          : product.category ===
            category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const sortedProducts = [
    ...filteredProducts,
  ].sort((a, b) => {

    if (sort === "high") {

      return b.price - a.price;
    }

    if (sort === "low") {

      return a.price - b.price;
    }

    if (sort === "newest") {

      return (
        b.id?.localeCompare(a.id)
      );
    }

    return 0;
  });

  return (
    <div className="products-page">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="filters-container">

        <div className="category-tabs">

          <Button
            variant={
              category === "ALL"
                ? "contained"
                : "outlined"
            }
            onClick={() =>
              setCategory("ALL")
            }
          >
            ALL
          </Button>

          {categories.map((cat) => (

            <Button
              key={cat}
              variant={
                category === cat
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                setCategory(cat)
              }
            >
              {cat.toUpperCase()}
            </Button>
          ))}

        </div>

        <FormControl
          className="sort-dropdown"
        >

          <InputLabel>
            Sort By
          </InputLabel>

          <Select
            value={sort}
            label="Sort By"
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
          >

            <MenuItem value="default">
              Default
            </MenuItem>

            <MenuItem value="high">
              Price: High to Low
            </MenuItem>

            <MenuItem value="low">
              Price: Low to High
            </MenuItem>

            <MenuItem value="newest">
              Newest
            </MenuItem>

          </Select>

        </FormControl>

      </div>

      <Grid
        container
        className="products-grid"
      >

        {sortedProducts.map(
          (product) => (

            <Grid
              item
              key={product.id}
            >

              <ProductCard
                product={product}
                reload={loadProducts}
              />

            </Grid>
          )
        )}

      </Grid>

    </div>
  );
}

export default Products;