window.onload = function() {
  const inputsEl = document.getElementById('inputs');
  const textDisplay = document.getElementById('prefill-object');
  const variablesDisplay = document.getElementById('variables-object');
  const pwf = document.getElementById('prefill-pwf');
  let customQuestions;

  let prefillables = pwf.getPrefillableVariables();
  const prefillData = {};

  inputBuilder();
  textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
  variablesDisplay.innerText = JSON.stringify(pwf.getPrefillableVariables(), undefined, 2);

  
  document.getElementById('prefill-test').addEventListener('click', () => {
    console.log('Sourced prefill data:', prefillData);
    pwf.setPrefill(prefillData);
  });
  
  document.getElementById('prefill-variables').addEventListener('click', () => {
    pwf.questions = customQuestions;
    prefillables = pwf.getPrefillableVariables();
    variablesDisplay.innerText = JSON.stringify(prefillables, undefined, 2);
    inputBuilder();
  });

  document.getElementById('custom-questions').addEventListener('input', (e) => {
    customQuestions = JSON.parse(e.target.value);
  });

  function inputBuilder() {
    inputsEl.innerHTML = '';
    Object.keys(prefillables).forEach((key) => {
      const dataType = prefillables[key];
      prefillData[key] = null;
      addInputElement(key, dataType);
    });
  }

  function addInputElement(id, type) {
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
    inputEl.className = 'prefill-input';

    inputEl.addEventListener('input', (e) => {
      const regex = /[0-9]/g;
      if (e.target.dataset.type === 'number' && regex.test(e.target.value)) {
        prefillData[e.target.name] = parseInt(e.target.value);
      } else if (e.target.value.length > 0) {
        prefillData[e.target.name] = e.target.value;
      } else {
        prefillData[e.target.name] = null;
      }

      textDisplay.innerText = JSON.stringify(prefillData, undefined, 2);
    });

    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputEl);
    inputsEl.appendChild(inputContainer);
  }
  
  function camelCaseToTitle(val) {
    return val.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  };
}