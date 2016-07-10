return (persona) => {
  persona.id = 'stocks';
  persona.setIndicator('show_chart');

  var companies = persona.config.plugins.stocks.companies;
  var promises = [];

  companies.forEach((company) => {
    promises.push(fetch(`http://finance.yahoo.com/webservice/v1/symbols/${company}/quote?format=json`)
      .then((res) => res.json()));
  });

  Promise.all(promises).then((quotes) => {
    persona.setText('');
    quotes.forEach((quote, i) => {
      var company = companies[i];
      var parts = persona.getText().split(' ');

      parts.push(`${company}:`);

      var price = quote.list.resources[0].resource.fields.price;
      price = '$' + price.split('.')[0] + '.' + price.split('.')[1].substring(0, 2);

      parts.push(`<span style="color: rgba(255,255,255,0.5)">${price}</span>`);

      persona.setText(parts.join(' '));
    });
  });

  persona.setText(`Loading stocks for ${companies.join(', ')}`);
};
