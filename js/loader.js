const checkFetch = (res) => {
  if(res.status !== 200)
    throw new Error('bad status code');
  return res;
};

// will implement Electron later
const loadPersona = () => {
  var config;

  return fetch('/persona.json')
    .then((res) => checkFetch(res).json())
    .then((json) => {
      config = json;

      var pluginNames = Object.keys(config.plugins);
      var promises = [];

      console.log(`Loading ${pluginNames.length} plugins: ${pluginNames.join(', ')}`);
      pluginNames.forEach((plugin) => {
        promises.push(fetch(`/plugins/${plugin}.js`)
          .then((res) => checkFetch(res).text())
          .catch(() => console.log(`Failed loading plugin ${plugin}`)));
      });

      return Promise.all(promises);
    })
    .then((plugins) => {
      plugins.forEach((plugin) => {
        if(!plugin)
          return;
        var returned = (new Function(plugin))();

        if(typeof returned !== 'function') {
          return;
        }

        var persona = new PersonaApi(config);
        returned(persona);

        if(!persona.id) {
          return;
        }

        if(persona[SYMBOL_INDICATOR] != null) {
          addIndicator(persona);
        }
      });
    });
}
