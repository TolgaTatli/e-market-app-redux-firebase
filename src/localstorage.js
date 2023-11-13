
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

export const getInitialStateFromLocalStorage = () => {
  const initialState = JSON.parse(localStorage.getItem("cartState")) || {};
  const productIds = Object.keys(initialState).filter((key) => key !== "totalValue");

  if (productIds.length > 0 && initialState[productIds[0]].value === 1) {
    initialState[productIds[0]].value = 0;
    initialState.totalValue -= 1;
    saveStateToLocalStorage(initialState);
  }

  const productOnlyState = {};
  productIds.forEach((productId) => {
    productOnlyState[productId] = initialState[productId];
  });

  return productOnlyState;
};

