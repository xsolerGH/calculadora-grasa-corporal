document.addEventListener('DOMContentLoaded', function () {
  const genderSelect = document.getElementById('gender');
  const hipLabel = document.getElementById('hipLabel');
  const hipInput = document.getElementById('hip');
  const fatForm = document.getElementById('fatForm');
  const resultDiv = document.getElementById('result');

  // Show/Hide hip input based on gender
  genderSelect.addEventListener('change', function () {
    if (genderSelect.value === 'female') {
      hipLabel.style.display = 'block';
      hipInput.required = true;
    } else {
      hipLabel.style.display = 'none';
      hipInput.required = false;
      hipInput.value = '';
    }
  });

  fatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const gender = genderSelect.value;
    const waist = parseFloat(document.getElementById('waist').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const height = parseFloat(document.getElementById('height').value);
    let fatPercentage = 0;

    if (gender === 'male') {
      // Hombre: % grasa = 86.010 × log10(cintura - cuello) - 70.041 × log10(estatura) + 36.76
      if (waist <= neck) {
        showError('La cintura debe ser mayor que el cuello.');
        return;
      }
      fatPercentage = 86.010 * Math.log10((waist - neck)/2.54)
                      - 70.041 * Math.log10(height/2.54)
                      + 36.76;
    } else {
      // Mujer: % grasa = 163.205 × log10(cintura + cadera - cuello) - 97.684 × log10(estatura) - 78.387
      const hip = parseFloat(hipInput.value);
      if ((waist + hip) <= neck) {
        showError('La suma de cintura y cadera debe ser mayor que el cuello.');
        return;
      }
      fatPercentage = 163.205 * Math.log10((waist + hip - neck)/2.54)
                      - 97.684 * Math.log10(height/2.54)
                      - 78.387;
    }

    // Display result rounded to 2 decimals
    resultDiv.textContent = `Porcentaje de grasa corporal estimado: ${fatPercentage.toFixed(2)}%`;
    resultDiv.style.color = '#1976d2';
    resultDiv.style.background = '#e3f2fd';
  });

  function showError(msg) {
    resultDiv.textContent = msg;
    resultDiv.style.color = '#d32f2f';
    resultDiv.style.background = '#ffebee';
  }
});