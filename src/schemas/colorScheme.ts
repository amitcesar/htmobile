import * as yup from "yup";

export const colorScheme = yup.object({
  colorCube: yup.string().min(3, "min 3 ").max(7, 'max 7'),
  colorSphere: yup.string().min(3, "min 3").max(7, 'max 7'),
  colorOcta: yup.string().max(7, 'max 7'),
});
