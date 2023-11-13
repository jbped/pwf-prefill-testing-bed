window.onload = function() {
  const inputBlock = document.getElementById('input-block');
  const textDisplay = document.getElementById('prefill-object');
  const variablesDisplay = document.getElementById('variables-object');
  const pwf = document.getElementById('prefill-pwf');

  const prefillables = pwf.getPrefillableValues();
  const prefillData = {};
  Object.keys(prefillables).forEach( key => {
    const dataType = prefillables[key];
    prefillData[key] = null;
    buildInput(key, dataType);
  })
  textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
  variablesDisplay.innerText = JSON.stringify(pwf.getPrefillableValues(), undefined, 2);

  
  document.getElementById('prefill-test').addEventListener('click', () => {
    console.log('Sourced prefill data:', prefillData);
    pwf.setPrefill(prefillData);
  });
  
  document.getElementById('prefill-variables').addEventListener('click', () => {
    const variables = pwf.getPrefillableValues();
    console.log( 'Available Prefill Variables:', variables);
    variablesDisplay.innerText = JSON.stringify(variables, undefined, 2);
  });

  // document.getElementById('customQuestions').addEventListener('input', (e) => {
  //   pwf.questions = JSON.parse(e.target.value);
  // });

  function buildInput(id, type) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', id);
    inputLabel.innerText = `${camelCaseToTitle(id)}: `

    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('id', `${id}Input`);
    inputEl.setAttribute('name', id);
    inputEl.setAttribute('data-type', type);

    inputEl.addEventListener('input', (e) => {
      const regex = /[0-9]/g;
      if (type === 'number' && regex.test(e.target.value)) {
        prefillData[id] = parseInt(e.target.value);
      } else if (e.target.value.length > 0) {
        prefillData[id] = e.target.value;
      } else {
        prefillData[id] = null;
      }

      textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
    });

    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputEl);
    inputBlock.appendChild(inputContainer);
  }
  
  function camelCaseToTitle(val) {
    return val.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  };
}