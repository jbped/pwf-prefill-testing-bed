window.onload = function() {
  const inputs = document.querySelectorAll('input[type="text"]');
  const textDisplay = document.getElementById('prefill-object');
  const variablesDisplay = document.getElementById('variables-object');
  const pwf = document.getElementById('prefill-pwf');
  const prefillData = {
    amountSeeking: null,
    timeInBusiness: null,
    averageMonthlySales: null,
    creditScore: null,
    entityType: null,
    businessName: null,
    first: null,
    last: null,
    email: null,
    phone: null,
  };

  const prefillBody = {};
  textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
  variablesDisplay.innerText = JSON.stringify(pwf.getPrefillableValues(), undefined, 2);

  
  document.getElementById('prefill-test').addEventListener('click', () => {
    Object.values(prefillData).forEach((v, i) => {
      if (v !== null) {
        prefillBody[Object.keys(prefillData)[i]] = v;
      }
    });
    console.log('Sourced prefill data:', prefillBody);
    pwf.setPrefill(prefillBody);
  });
  
  document.getElementById('prefill-variables').addEventListener('click', () => {
    const variables = pwf.getPrefillableValues();
    console.log( 'Available Prefill Variables:', variables);
    variablesDisplay.innerText = JSON.stringify(variables, undefined, 2);
  });



  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {

      const regex = /[0-9]/g
      if(e.target.dataset.type === 'number' && regex.test(e.target.value)) {
        prefillData[input.name] = parseInt(e.target.value);
      } else if (e.target.value.length > 0) {
        prefillData[input.name] = e.target.value;
      } else {
        prefillData[input.name] = null;
      }

      textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
    });
  });
}