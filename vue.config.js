module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/404'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
