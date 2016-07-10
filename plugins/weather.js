return (persona) => {
  persona.id = 'weather';
  persona.setIndicator('wb_sunny');

  var weather = persona.config.plugins.weather;

  fetch(`https://api.forecast.io/forecast/${weather.apiKey}/${weather.latitude},${weather.longitude}`)
    .then((res) => res.json())
    .then((json) => {
      var tempColor = parseFloat(json.currently.temperature) > 75 ? 'rgba(239,83,80,0.5)' : 'rgba(52,152,219,0.7)';
      var temperature = `<span style="color: ${tempColor}">${json.currently.temperature}°F</span>`;
      persona.setText(`Currently ${temperature} and <span style="color: rgba(255,255,255,0.5)">${json.currently.summary}</span> in ${weather.niceName}`);
    });

  persona.setText('Loading weather');
};
