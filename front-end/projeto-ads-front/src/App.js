import React from "react";
import SupplierForm from "./components/SupplierForm";
import ProductForm from "./components/ProductForm";
import AssociationForm from "./components/AssociationForm";

const App = () => {
  return (
    <div>
      <h1>Gestão de Fornecedores e Produtos</h1>
      <SupplierForm />
      <ProductForm />
      <AssociationForm />
    </div>
  );
};

export default App;
