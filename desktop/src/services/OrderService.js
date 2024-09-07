import api from "./TokenService";

export const fetchOrders = async (orderType, page, filters = {}) => {
  const endpoint =
    orderType === "b2b"
      ? "/order-history/b2b-history/"
      : "/order-history/b2c-history/";

  const response = await api.get(endpoint, {
    params: {
      ...filters,
      page,
      city: filters.city?.id,
    },
  });
  return response.data;
};

export const fetchCities = async () => {
  const response = await api.get("/employers/dashboard/list-cities/");
  return response.data.cities;
};
