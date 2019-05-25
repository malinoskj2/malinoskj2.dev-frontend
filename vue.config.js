const posts = require('./build/posts.json');


const postPaths = posts.entries.map(post => `/posts/${post._id}`);


postPaths.forEach(post => console.log(post));

let pluginOptions = {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
	      '/',
	      '/404',
	      ...postPaths
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
};


module.exports =  () => { return { pluginOptions }; }
