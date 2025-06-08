/**
 * Generar las rutas en base al objeto routes
 * @param {*} app
 * @param {*} routes
 */
const generateRoutes = ({ app, routes }) => {
  for (const routeName in routes) {
    
    if (Object.hasOwnProperty.call(routes, routeName)) {
      /* Se toma el nombre de la propiedad como nombre base de la ruta, eje: api/products, 
      donde "products" en una propiedad del objeto routes */
      const parsedName = routeName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();// convert routename from routeName to route-name
      app.use(`/api/${parsedName}`, routes[routeName]);
    }
  }
};

module.exports = {
  generateRoutes,
};
