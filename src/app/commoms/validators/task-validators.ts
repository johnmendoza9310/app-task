import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function minAgeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const age = control.value;
  return age < 18 ? { minAge: true } : null;
}

//Validador que valida valores repetidos, sin ser sensible a minusculas, si hay más de un espacio, ajusta la cadena dejando solo uno
export function uniquePersonNameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const formArray = control as FormArray;

  const names = formArray.controls
    .map(
      (personGroup: AbstractControl) =>
        personGroup
          .get('personName')
          ?.value?.toLowerCase()
          .replace(/\s+/g, ' ') // Reemplazamos espacios múltiples por uno solo
          .trim() // Eliminar los espacios al inicio y al final
    )
    .filter((name) => name); // Filtrar nombres vacíos o null

  // Verificar duplicados
  const duplicateNames = names.filter(
    (name, index) => names.indexOf(name) !== index
  );

  return duplicateNames.length > 0 ? { duplicateName: true } : null;
}

// Validador personalizado para verificar que haya al menos una habilidad
export function hasSkillValidator(
  control: AbstractControl
): ValidationErrors | null {
  const skillsArray = control.get('skill') as FormArray;

  return skillsArray && skillsArray.length === 0 ? { noSkill: true } : null;
}
